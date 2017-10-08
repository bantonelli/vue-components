<template>
  <div id="app">
    <!--<div class="dark-background">
      <input-component
        :modifier-styles="['input_color-invert']"
      >
      </input-component>
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

    <div style="width: 80%; margin: 0 auto;">
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

    <input-number 
      v-model="num1" 
      @change="handleChange" 
      :min="1" 
      :max="10">
    </input-number>

    <radio-group v-model="radio">
        <radio
          label="1"
          id="'Radio1'"
          :modifier-styles="['radio_size-large']"
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
      <checkbox label="Option A" id="'CheckboxA'" :modifier-styles="['checkbox_size-large']"></checkbox>
      <checkbox label="Option B" id="'CheckboxB'"></checkbox>
      <checkbox label="Option C" id="'CheckboxC'"></checkbox>
      <checkbox label="disabled" id="'CheckboxD'" disabled></checkbox>
      <checkbox label="selected and disabled" id="'CheckboxE'" disabled></checkbox>
    </checkbox-group>

  
    <div style="width: 200px; margin: 0 auto;">
      <select-component 
        v-model="selectValue" 
        placeholder="Select"
        multiple 
        filterable
        allow-create
        :loading="loading"
      >
        <select-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="false">
          <span style="float: left">{{ item.label }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
        </select-option>
      </select-component>
      <select-component
        v-model="selectValue"
        placeholder="Select Groups"
      >
        <option-group
          v-for="group in groupOptions"
          :key="group.label"
          :label="group.label"
        >
          <select-option
            v-for="item in group.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </select-option>
        </option-group>
      </select-component>

    </div>
    
    <form-demo></form-demo>-->

    
    <!--<mobile-nav>
      <navbar></navbar>
    </mobile-nav>-->
    <!--<div style="height: 60px; width: 100%; background-color: #9d9d9d;"></div>-->

    <dropdown
    >
    </dropdown>

  </div>
</template>

<script>
import Radio from './components/atoms/Radio/Radio'; // Done
import Checkbox from './components/atoms/Checkbox/Checkbox'; // Done
import Input from './components/atoms/Input';
import Tag from './components/atoms/Tag/Tag';
import RadioGroup from './components/molecules/RadioGroup/RadioGroup'; // Done
import CheckboxGroup from './components/molecules/CheckboxGroup/CheckboxGroup'; // Done
import InputField from './components/molecules/InputField/InputField'; // Done
import Autocomplete from './components/molecules/Autocomplete/Autocomplete'; // Done
import InputNumber from './components/molecules/InputNumber/InputNumber'; // Done
import Select from './components/molecules/EnhancedSelect/EnhancedSelect'; // Done
import Option from './components/molecules/EnhancedSelect/Option'; // Done
import OptionGroup from './components/molecules/EnhancedSelect/OptionGroup'; // Done
import MobileNav from './components/molecules/MobileNav/MobileNav';
import Navbar from './components/molecules/Navbar/Navbar';
import Dropdown from './components/molecules/Dropdown/Dropdown';
import Pagination from './components/organisms/Pagination/Pagination';
import FormDemo from './components/FormDemo.vue';

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
      options: [
        {
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
        }
      ],
      selectValue: [],
      remoteOptions: [],
      remoteSelectList: [],
      loading: false,
      states: ["Alabama", "Alaska", "Arizona",
      "Arkansas", "California", "Colorado",
      "Connecticut", "Delaware", "Florida",
      "Georgia", "Hawaii", "Idaho", "Illinois",
      "Indiana", "Iowa", "Kansas", "Kentucky",
      "Louisiana", "Maine", "Maryland",
      "Massachusetts", "Michigan", "Minnesota",
      "Mississippi", "Missouri", "Montana",
      "Nebraska", "Nevada", "New Hampshire",
      "New Jersey", "New Mexico", "New York",
      "North Carolina", "North Dakota", "Ohio",
      "Oklahoma", "Oregon", "Pennsylvania",
      "Rhode Island", "South Carolina",
      "South Dakota", "Tennessee", "Texas",
      "Utah", "Vermont", "Virginia",
      "Washington", "West Virginia", "Wisconsin",
      "Wyoming"],
      groupOptions: [
        {
          label: 'Popular cities',
          options: [{
            value: 'Shanghai',
            label: 'Shanghai'
          }, {
            value: 'Beijing',
            label: 'Beijing'
          }]
        }, {
          label: 'City name',
          options: [{
            value: 'Chengdu',
            label: 'Chengdu'
          }, {
            value: 'Shenzhen',
            label: 'Shenzhen'
          }, {
            value: 'Guangzhou',
            label: 'Guangzhou'
          }, {
            value: 'Dalian',
            label: 'Dalian'
          }]
        }
      ]
    }
  },
  components: {
    'input-component': Input,
    'input-field': InputField,
    'pagination': Pagination,
    'autocomplete': Autocomplete,
    'input-number': InputNumber,
    'radio': Radio,
    'radio-group': RadioGroup,
    'checkbox': Checkbox,
    'checkbox-group': CheckboxGroup,
    'select-component': Select,
    'option-group': OptionGroup,
    'select-option': Option,
    'form-demo': FormDemo,
    'mobile-nav': MobileNav,
    'navbar': Navbar,
    'dropdown': Dropdown
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
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.remoteOptions = this.remoteSelectList.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.remoteOptions = [];
      }
    }
  },
  mounted() {
    this.links = this.loadAll();
    this.remoteSelectList = this.states.map(item => {
      return { value: item, label: item };
    });
  }
}
</script>



