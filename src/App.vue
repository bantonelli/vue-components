<template>
  <div id="app">
    <div id="site-navigation" style="margin-bottom: 60px;">
      <mobile-nav>
        <navbar></navbar>
      </mobile-nav>
    </div>

    <!-- <div class="dark-background">
      <input-component
        :modifier-styles="['']"
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

    </div>     -->

    <!-- <div style="width: 100%; height: 200px; margin: 0 auto;">
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
    </div>     -->

    <!-- <div style="width: 80%; margin: 0 auto;">
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
    </div>         -->

    <!-- <input-number 
      v-model="num1" 
      @change="handleChange" 
      :min="1" 
      :max="10">
    </input-number> -->

    <!-- <radio-group v-model="radio">
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
    </radio-group> -->

    <!-- <checkbox
      v-model="checked"
      id="Checkbox1"
    >
    Stuff
    </checkbox> -->

    <!-- <checkbox-group v-model="checkList">
      <checkbox label="Option A" id="'CheckboxA'" :modifier-styles="['checkbox_size-large']"></checkbox>
      <checkbox label="Option B" id="'CheckboxB'"></checkbox>
      <checkbox label="Option C" id="'CheckboxC'"></checkbox>
      <checkbox label="disabled" id="'CheckboxD'" disabled></checkbox>
      <checkbox label="selected and disabled" id="'CheckboxE'" disabled></checkbox>
    </checkbox-group> -->

  
    <!-- <div style="width: 200px; margin: 0 auto;">
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
        v-model="selectValueGroup"
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

    </div> -->
    
    <!-- <form-demo></form-demo> -->

    <!--<div style="height: 60px; width: 100%; background-color: #9d9d9d;"></div>-->

    <!--<div style="width: 300px;">
      <dropdown
        style="background-color: blue;"
        :visible-arrow="true"
        :arrow-class="'dropdown__menu-arrow'"
        :label="'Dropdown Label'"
        :variation-class="'dropdown--navbar'"
        :show-header="true"
        :show-footer="true"
        :popper-options="{
            placement: 'auto', 
            offsets: {
              arrow: {
                top: 0,
                left: 0
              }
            }
          }"
      > 
        <template slot="header">
            <a href="#">Home</a>
        </template>       
        <dropdown-menu-item>
          <a href="#">Settings</a>
        </dropdown-menu-item>
        <dropdown-menu-item>
          <a href="#">Profile</a>
        </dropdown-menu-item>
        <template slot="footer">
            <a href="#">Log Out</a>
        </template>       
      </dropdown>
    </div>-->

    <!--<notification></notification>-->
    <div>
      <h2 class="typography-h2">Filters</h2>
      <button @click="updateCollectionData" class="button"><span class="button__text">Data</span></button>
      <button @click="toggle" class="button button_color-accent"><span class="button__text">Toggle Data</span></button>
      <button @click="reverse" class="button button_color-primary"><span class="button__text">Reverse</span></button>
      <button @click="regularOrder" class="button button_color-primary"><span class="button__text">Regular Order</span></button>
    </div>
    <div style="height: 1000px;">
      <collection :dataset="videos" :component="component"></collection>
    </div>    
  </div>
</template>

<script>
import Radio from './components/atoms/Radio/Radio'; // Done
import Checkbox from './components/atoms/Checkbox/Checkbox'; // Done
import Input from './components/atoms/Input'; // Done
import Tag from './components/atoms/Tag/Tag'; 
import Notification from './components/atoms/Notification/Notification';
import Dropdown from './components/atoms/Dropdown/Dropdown'; // Done
import DropdownMenuItem from './components/atoms/Dropdown/DropdownMenuItem'; // Done
import Video from './components/atoms/Video/Video';
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
import Pagination from './components/organisms/Pagination/Pagination';
import Collection from './components/organisms/Collection/Collection';
import FormDemo from './components/FormDemo.vue';

import Emitter from './components/utils/mixins/emitter';


var videos2 = [
    {
        id: 1,
        width: 560,
        height: 315,
        title: "Anatomical Terms: Directional Terms (Anatomy)",
        source: "https://www.youtube.com/embed/KqgTERrYbQ4",
        yt_id: "KqgTERrYbQ4",
        frameborder: 0,
        allow: "autoplay; encrypted-media"
    },
    {
        id: 2,
        width: 560,
        height: 315,
        title: "The Nervous System: Diencephalon - Thalamus & Hypothalamus",
        source: "https://www.youtube.com/embed/5bCCb7lj6QA",
        yt_id: "5bCCb7lj6QA",
        frameborder: 0,
        allow: "autoplay; encrypted-media"
    },
    {
        id: 3,
        width: 560,
        height: 315,
        title: "Units of Measure: Scientific Measurements & SI System",
        source: "https://www.youtube.com/embed/oAtDAoqdExw",
        yt_id: "oAtDAoqdExw",
        frameborder: 0,
        allow: "autoplay; encrypted-media"
    },
    {
        id: 4,
        width: 560,
        height: 315,
        title: "The Nervous System: Peripheral Nervous System (PNS)",
        source: "https://www.youtube.com/embed/jaWrMYChc5A",
        yt_id: "jaWrMYChc5A",
        frameborder: 0,
        allow: "autoplay; encrypted-media"
    }
];


export default {
  name: 'app',
  mixins: [Emitter],
  data () {
    return {
      component: Video,
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
      selectValueGroup: "",
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
      ],
      videos: [
        {
            id: 1,
            width: 560,
            height: 315,
            title: "The Nervous System: Diencephalon - Thalamus & Hypothalamus",
            source: "https://www.youtube.com/embed/5bCCb7lj6QA",
            yt_id: "5bCCb7lj6QA",
            frameborder: 0,
            allow: "autoplay; encrypted-media"
        },
        {
            id: 2,
            width: 560,
            height: 315,
            title: "Units of Measure: Scientific Measurements & SI System",
            source: "https://www.youtube.com/embed/oAtDAoqdExw",
            yt_id: "oAtDAoqdExw",
            frameborder: 0,
            allow: "autoplay; encrypted-media"
        },
        {
            id: 3,
            width: 560,
            height: 315,
            title: "The Nervous System: Peripheral Nervous System (PNS)",
            source: "https://www.youtube.com/embed/jaWrMYChc5A",
            yt_id: "jaWrMYChc5A",
            frameborder: 0,
            allow: "autoplay; encrypted-media"
        },
        {
            id: 4,
            width: 560,
            height: 315,
            title: "Anatomical Terms: Directional Terms (Anatomy)",
            source: "https://www.youtube.com/embed/KqgTERrYbQ4",
            yt_id: "KqgTERrYbQ4",
            frameborder: 0,
            allow: "autoplay; encrypted-media"
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
    'dropdown': Dropdown,
    'dropdown-menu-item': DropdownMenuItem,
    'notification': Notification,
    'collection': Collection,
    'video-component': Video
  },
  methods: {
    updateCollectionData () {
      this.broadcast(Collection.componentName, 'updateData', [videos2]);
    },
    toggle() {
      this.broadcast(Collection.componentName, 'toggleData', []);
    },
    reverse() {
      var reverseFunction = function (dataArray) {
          return dataArray.reverse();
      }
      this.broadcast(Collection.componentName, 'sortData', [reverseFunction]);
    },
    regularOrder() {
      var reverseFunction = function (dataArray) {
          return dataArray;
      }
      this.broadcast(Collection.componentName, 'sortData', [reverseFunction]);
    },
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

<style>
.video {
  display: block;
}
.m_load_here {
  position: relative;
}
.ytp-large-play-button-bg {
  fill: #1f1f1f;
  fill-opacity: 0.81;
  transition: fill 0.1s cubic-bezier(0.4, 0, 1, 1) 0s,
    fill-opacity 0.1s cubic-bezier(0.4, 0, 1, 1) 0s;
}
.m_overlay:hover .ytp-large-play-button-bg {
  fill: #cc181e;
  fill-opacity: 1;
  transition: fill 0.1s cubic-bezier(0, 0, 0.2, 1) 0s,
    fill-opacity 0.1s cubic-bezier(0, 0, 0.2, 1) 0s;
}
.m_yt_button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border-radius: 10px;
  height: 30px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 42px;
  z-index: 5;
  display: block;
}
.m_overlay {
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}
.m_yt_title {
  color: #fff;
  outline: 0 none;
  text-decoration: none;
  transition: color 0.1s cubic-bezier(0, 0, 0.2, 1) 0s;
  /* float: left; */
  max-width: 100%;
  overflow: hidden;
  overflow-wrap: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 18px;
  padding: 14px 16px 0;
}
.ytImgContainer img {
  max-width: 100%;
  height: auto;
}

.ytImgContainer {
  margin: 0 auto;
  max-width: 604px;
  width: 100%;
}

.ytImgContainer:after {
  clear: both;
}

.ytImgContainer:before,
.ytImgContainer:after {
  content: "";
  display: table;
}

div.ytImgThumbBox {
  position: relative !important;
  width: 100% !important;
  height: 100% !important;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

div.ytImgThumbPlay {
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  width: 48px !important;
  height: 48px !important;
  margin: -24px 0 0 -24px !important;
}

img.ytImgThumbImg {
  width: 100% !important;
  height: 100% !important;
  margin: -9.5% 0px -19%;
  opacity: 0;
}
</style>
