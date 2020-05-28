<template>
  <div class="cashbook">
    <div class="left-wrapper">
      <h2>账单列表</h2>
      <el-table
        :data="selectedBills"
        stripe
        style="width: 100%">
        <el-table-column
          prop="dateStr"
          label="时间">
        </el-table-column>
        <el-table-column
          prop="typeName"
          label="类型"
          width="180">
        </el-table-column>
        <el-table-column
          prop="categoryName"
          label="分类">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="金额">
        </el-table-column>
      </el-table>
    </div>

    <div class="right-wrapper">
      <div class="add-bill">
        <h2>添加账单</h2>
        <div class="add-bill__item">
          分类：
          <el-select v-model="billCategoryId" placeholder="请选择">
            <el-option
              v-for="item in categories"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            >
            </el-option>
          </el-select>
        </div>
        <div class="add-bill__item">
          金额：<el-input v-model="billAmount" class="input"></el-input>
        </div>
        <div class="add-bill__item">
          <el-button type="primary" @click="addBillItem">提交</el-button>
        </div>
      </div>
      <div class="select-bill">
        <h2>筛选账单</h2>
        <div class="select-bill__item">
          月份：
          <el-select v-model="selectedMonth" placeholder="请选择">
            <el-option
              v-for="month in months"
              :key="month"
              :value="month"
              :label="month"
            >
            </el-option>
          </el-select>
        </div>
        <div class="select-bill__item">总收入：{{totalIncome.toFixed(2)}}</div>
        <div class="select-bill__item">总支出：{{totalPayment.toFixed(2)}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request';

export default {
  data() {
    return {
      // pageId: 1,
      // pageSize: 10,
      months: ['all', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      selectedMonth: 'all',
      categoriesMap: new Map(),
      typeMap: new Map([['0', '支出'], ['1', '收入']]),
      bills: [],    // all bills
      selectedBills: [], // bills for selected months
      categories: [],
      // 用户添加
      billCategoryId: '',
      billAmount: '',
    };
  },

  methods: {
    /**
     * 请求bills，并排序
     */
    async getBills() {
      // no paging
      const { bills } = await request('/bills', {
        pageId: 1,
        pageSize: 10000
      });
      return bills
        .sort((prev, next) => Date.parse(new Date(prev.time)) - Date.parse(new Date(next.time)))
        .map((bill) => {
          return this.transferBillToDisplay(bill);
        });
    },

    /**
     * 请求Categories，创建id->name的映射
     */
    async getCategories() {
      const { categories } = await request('/categories');
      this.categories = categories;
      categories.forEach(({ id, name }) => {
        this.categoriesMap.set(id, name);
      })
    },

    /**
     * 添加BillItem
     */
    async addBillItem() {
      const { bill } = await request('/bill', {
        category: this.billCategoryId,
        amount: this.billAmount,
        type: this.categories.filter(item => item.id === this.billCategoryId)[0].type
      }, 'POST');
      this.bills.push(this.transferBillToDisplay(bill));
    },

    /**
     * 对bill对象添加属性满足展示需要
     */
    transferBillToDisplay(bill) {
      const { type, category, time, amount } = bill;
      return {
        type,
        typeName: this.typeMap.get(type),
        dateStr: `${new Date(time).toLocaleDateString()} ${new Date(time).toLocaleTimeString()}`,
        date: new Date(time),
        amount: parseFloat(amount).toFixed(2),
        categoryName: this.categoriesMap.get(category)
      };
    }
  },

  computed: {
    totalPayment: function () {
      return this.selectedBills.reduce((acct, curr) => {
        return curr.type === '0' || curr.type === '1' && parseFloat(curr.amount) < 0 ? acct + Math.abs(parseFloat(curr.amount)) : acct;
      }, 0);
    },
    totalIncome: function () {
      return this.selectedBills.reduce((acct, curr) => {
        return curr.type === '1' && parseFloat(curr.amount) > 0 ? acct + parseFloat(curr.amount) : acct;
      }, 0);
    },
  },

  watch: {
    selectedMonth: function(val) {
      if (val === 'all') {
        this.selectedBills = this.bills;
      } else {
        this.selectedBills = this.bills.filter(({date}) => date.getMonth() + 1 === val);
      }
    },
  },

  async created() {
    await this.getCategories();
    this.bills = await this.getBills();
    this.selectedBills = this.bills;
  },
  
};
</script>

<style scoped>
.cashbook {
}

.left-wrapper {
  border: 1px black solid;
  width: 58%;
  float: left;
}
.right-wrapper {
  float: right;
  width: 40%;
}

.add-bill {
  border: 1px black solid;
  width: 100%;
  padding-bottom: 30px;
}

.select-bill {
  border: 1px black solid;
  width: 100%;
  margin-top: 30px;
  padding-bottom: 30px;
}

.add-bill__item,
.select-bill__item {
  margin-top: 30px;
}

.input {
  width: 220px;
}

</style>
