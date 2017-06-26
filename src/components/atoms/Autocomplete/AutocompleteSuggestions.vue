<template>
  <!--<transition name="el-zoom-in-top" @after-leave="doDestroy">-->
    <div
      v-show="showPopper"
      class="autocomplete-suggestions"
      :class="{ 'is-loading': parent.loading }"
      :style="{ width: dropdownWidth }"
    >
      <!--<el-scrollbar
        tag="ul"
        wrap-class="el-autocomplete-suggestion__wrap"
        view-class="el-autocomplete-suggestion__list"
      >-->
        <li v-if="parent.loading"><i class="el-icon-loading"></i></li>
        <ul class="autocomplete-suggestions__wrapper" v-else>
          <template v-for="(item, index) in suggestions">
              <li
                v-if="!parent.customItem"
                class="autocomplete-suggestions__item"
                @click="select(item)"
              >
                {{item[props.label]}}
              </li>
              <component
                v-else
                :class="{'highlighted': parent.highlightedIndex === index}"
                @click="select(item)"
                :is="parent.customItem"
                :item="item"
                :index="index">
              </component>          
          </template>
        </ul>
      <!--</el-scrollbar>-->
    </div>
  <!--</transition>-->
</template>
<script>
  import Popper from '../../utils/vue-popper';
  import Emitter from '../../utils/mixins/emitter';
  // import ElScrollbar from '../scrollbar';

  // Example CustomItem
  // const customTemplate = `
  //   <div>
  //     <span>{{ item.value }}</span>
  //     <span>{{ item.link }}</span>
  //   </div>
  // `;

  // const customComponent = {
  //   props: ['item', 'index'],
  //   template: customTemplate
  // }

  export default {
    // components: { ElScrollbar },
    // components: {
    //   'item-link': customComponent
    // },
    mixins: [Popper, Emitter],

    name: 'AutocompleteSuggestions',
    componentName: 'AutocompleteSuggestions',

    data() {
      return {
        parent: this.$parent,
        dropdownWidth: ''
      };
    },

    props: {
      props: Object,
      suggestions: Array,
      options: {
        default() {
          return {
            forceAbsolute: true,
            gpuAcceleration: false
          };
        }
      }
    },

    methods: {
      select(item) {
        this.dispatch('Autocomplete', 'item-click', item);
      }
    },

    updated() {
      this.$nextTick(_ => {
        this.updatePopper();
      });
    },

    mounted() {
      this.popperElm = this.$el;
      // this.referenceElm = this.$parent.$refs.input.$refs.input;
      this.referenceElm = this.$parent.$refs.input.$refs.input.$el;
    },

    created() {
      this.$on('visible', (val, inputWidth) => {
        console.log("AUTOCOMPLETE SUGGEST: CALLED 'visible' HANDLER, VALUE: ", val, inputWidth);        
        this.dropdownWidth = inputWidth + 'px';
        this.showPopper = val;
      });
    }
  };
</script>
