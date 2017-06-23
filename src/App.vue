<template>
  <div id="app">
    <input-field
        type="textarea"
        autosize
        placeholder="Please input"
        v-model="Value"
      >
    </input-field>

    <input-field
      placeholder="Pick a date"
      icon="icon-magnifying-glass"
      v-model="input2"
      :on-icon-click="handleIconClick"
      >
    </input-field>

    <pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage4"
      :page-sizes="[50, 100, 200, 300, 400]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      >
    </pagination>
  </div>
</template>

<script>
import InputField from './components/atoms/InputField/InputField';
import Pagination from './components/molecules/Pagination/Pagination'; 

export default {
  name: 'app',
  data () {
    return {
      Value: "",
      pageCount: 10,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      pageSize: 100,
      input2: ''
    }
  },
  components: {
    'input-field': InputField,
    'pagination': Pagination
  },
  methods: {
    handleSizeChange: function (value) {
        this.pageSize = value;
    },
    handleCurrentChange: function () {

    },
    handleIconClick(ev) {
       console.log(ev);
    }
  }
}
</script>
<style src="./assets/css/style.css"></style>
