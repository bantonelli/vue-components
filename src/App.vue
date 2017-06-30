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
    <autocomplete
      v-model="state1"
      :fetch-suggestions="querySearch"
      :trigger-on-focus="true"
      icon="icon-magnifying-glass"
      placeholder="Please Input"
      @select="handleSelect"
    >
    <span slot="prepend">PREPEND</span>
    <span slot="append">APPEND</span>
    </autocomplete>          
  </div>
</template>

<script>
import InputField from './components/atoms/InputField/InputField';
import Pagination from './components/molecules/Pagination/Pagination'; 
import Autocomplete from './components/atoms/Autocomplete/Autocomplete.vue';

export default {
  name: 'app',
  data () {
    return {
      Value: "",
      currentPage4: 4,
      pageSize: 100,
      input2: '',
      links: [],
      state1: ''
    }
  },
  components: {
    'input-field': InputField,
    'pagination': Pagination,
    'autocomplete': Autocomplete
  },
  methods: {
    handleSizeChange: function (value) {
        this.pageSize = value;
    },
    handleCurrentChange: function () {

    },
    handleIconClick(ev) {
       console.log(ev);
    },
    querySearch(queryString, cb) {
      var links = this.links;
      var results = queryString ? links.filter(this.createFilter(queryString)) : links;
      // call callback function to return suggestions
      cb(results);
    },
    createFilter(queryString) {
      return (link) => {
        return (link.value.indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return [
        { "value": "vue", "link": "https://github.com/vuejs/vue" },
        { "value": "element", "link": "https://github.com/ElemeFE/element" },
        { "value": "cooking", "link": "https://github.com/ElemeFE/cooking" },
        { "value": "mint-ui", "link": "https://github.com/ElemeFE/mint-ui" },
        { "value": "vuex", "link": "https://github.com/vuejs/vuex" },
        { "value": "vue-router", "link": "https://github.com/vuejs/vue-router" },
        { "value": "babel", "link": "https://github.com/babel/babel" },
        { "value": "vue", "link": "https://github.com/vuejs/vue" },
        { "value": "element", "link": "https://github.com/ElemeFE/element" },
        { "value": "cooking", "link": "https://github.com/ElemeFE/cooking" },
        { "value": "mint-ui", "link": "https://github.com/ElemeFE/mint-ui" },
        { "value": "vuex", "link": "https://github.com/vuejs/vuex" },
        { "value": "vue-router", "link": "https://github.com/vuejs/vue-router" },
        { "value": "babel", "link": "https://github.com/babel/babel" },
        { "value": "vue", "link": "https://github.com/vuejs/vue" },
        { "value": "element", "link": "https://github.com/ElemeFE/element" },
        { "value": "cooking", "link": "https://github.com/ElemeFE/cooking" },
        { "value": "mint-ui", "link": "https://github.com/ElemeFE/mint-ui" },
        { "value": "vuex", "link": "https://github.com/vuejs/vuex" },
        { "value": "vue-router", "link": "https://github.com/vuejs/vue-router" },
        { "value": "babel", "link": "https://github.com/babel/babel" }
        ];
    },
    handleSelect(item) {
      console.log(item);
    }

  },
  mounted() {
    this.links = this.loadAll();
  }
}
</script>
<style src="./assets/css/style.css"></style>
