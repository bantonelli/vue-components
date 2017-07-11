<template>
  <div id="app">
    <div class="dark-background">
      <input-field
        type="textarea"
        autosize
        placeholder="Please input"
        v-model="Value"
        :modifier-styles="['text-area_color-invert']"
      >
      </input-field>
      <input-field
        placeholder="Pick a date"
        icon="icon-magnifying-glass"
        v-model="input2"
        :on-icon-click="handleIconClick"
        :modifier-styles="['input_color-invert']"
        >
      </input-field>
    </div>    

    <div style="width: 100%; margin: 0 auto;">
      <pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage4"
        :page-sizes="[50, 100, 200, 300, 400]"
        :page-size="pageSize"
        layout="->, prev, sizes, pager, jumper, next"
        :total="400"
        >
      </pagination>    
    </div>    

<!--layout="->, prev, sizes, pager, jumper, next"-->

    <div style="width: 80%; margin: 0 auto;">
      <autocomplete
        v-model="state1"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="true"
        icon="icon-magnifying-glass"
        placeholder="Please Input"
        @select="handleSelect"
      >
      <!--<span slot="prepend">PREPEND</span>
      <span slot="append">APPEND</span>-->
      </autocomplete>  
    </div>        

    <input-number 
      v-model="num1" 
      @change="handleChange" 
      :min="1" 
      :max="10">
    </input-number>

    <!--<radio-group v-model="radio">
        <radio
          label="1"
          id="'Radio1'"
          disabled
        >
          Option A
        </radio>

        <radio      
          label="2"
          id="'Radio2'"
        >
          Option B
        </radio>

        <radio      
          label="3"
          id="'Radio3'"
        >
          Option C
        </radio>
    </radio-group>

    <checkbox
      v-model="checked"
      id="Checkbox1"
    >
    Stuff
    </checkbox>

    <checkbox-group v-model="checkList">
      <checkbox label="Option A" id="'CheckboxA'"></checkbox>
      <checkbox label="Option B" id="'CheckboxB'"></checkbox>
      <checkbox label="Option C" id="'CheckboxC'"></checkbox>
      <checkbox label="disabled" id="'CheckboxD'" disabled></checkbox>
      <checkbox label="selected and disabled" id="'CheckboxE'" disabled></checkbox>
    </checkbox-group>-->

  
    <div style="width: 200px; margin: 0 auto;">
      <select-component 
        v-model="selectValue" 
        placeholder="Select"
        multiple
        filterable
      >
        <select-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="false">
          <!--<span style="float: left">{{ item.label }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>-->
        </select-option>
      </select-component>
    </div>
  </div>

</template>

<script>
import InputField from './components/atoms/InputField/InputField';
import Autocomplete from './components/atoms/Autocomplete/Autocomplete.vue';
import InputNumber from './components/atoms/InputNumber.vue';
import Pagination from './components/molecules/Pagination/Pagination.vue';
import Radio from './components/atoms/Radio/Radio.vue'; 
import RadioGroup from './components/atoms/Radio/RadioGroup.vue';
import Checkbox from './components/atoms/Checkbox/Checkbox.vue';
import CheckboxGroup from './components/atoms/Checkbox/CheckboxGroup.vue';
import Select from './components/atoms/Select/Select.vue';
import Option from './components/atoms/Select/Option.vue';

export default {
  name: 'app',
  data () {
    return {
      Value: "",
      currentPage4: 4,
      pageSize: 100,
      input2: '',
      links: [],
      state1: '',
      num1: 1,
      radio: '1',
      checked: false,
      checkList: ['selected and disabled','Option A'],
      options: [{
        value: 'Option1',
        label: 'Option1'
      }, {
        value: 'Option2',
        label: 'Option2',
        disabled: true
      }, {
        value: 'Option3',
        label: 'Option3'
      }, {
        value: 'Option4',
        label: 'Option4'
      }, {
        value: 'Option5',
        label: 'Option5'
      }],
      selectValue: ''
    }
  },
  components: {
    'input-field': InputField,
    'pagination': Pagination,
    'autocomplete': Autocomplete,
    'input-number': InputNumber,
    'radio': Radio,
    'radio-group': RadioGroup,
    'checkbox': Checkbox,
    'checkbox-group': CheckboxGroup,
    'select-component': Select,
    'select-option': Option
  },
  methods: {
    handleSizeChange: function (value) {
        this.pageSize = value;
    },
    handleCurrentChange: function () {
        return null;
    },
    handleChange(value) {
        // for InputNumber
        return null;
    },
    handleIconClick(ev) {
        return null;
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
