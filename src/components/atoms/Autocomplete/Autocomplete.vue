<template>
  <div class="autocomplete">
    <input-field
      ref="input"
      :value="value"
      :disabled="disabled"
      :placeholder="placeholder"
      :name="name"
      :size="size"
      :icon="icon"
      :on-icon-click="onIconClick"
      @compositionstart.native="handleComposition"
      @compositionupdate.native="handleComposition"
      @compositionend.native="handleComposition"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown.up.native.prevent="highlight(highlightedIndex - 1)"
      @keydown.down.native.prevent="highlight(highlightedIndex + 1)"
      @keydown.enter.native.prevent="handleKeyEnter"
    >
      <template slot="prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </template>
      <template slot="append" v-if="$slots.append">
        <slot name="append"></slot>
      </template>
    </input-field>
    <autocomplete-suggestions
      :props="props"
      :class="[popperClass ? popperClass : '']"
      ref="suggestions"
      :suggestions="suggestions"
    >
    </autocomplete-suggestions>
  </div>
</template>
<script>
  import InputField from '../InputField/InputField';
  import AutocompleteSuggestions from './AutocompleteSuggestions.vue';
  import Emitter from '../../utils/mixins/emitter';

  export default {
    name: 'Autocomplete',

    mixins: [Emitter],

    componentName: 'Autocomplete',

    components: {
      InputField,
      AutocompleteSuggestions
    },

    props: {
      props: {
        type: Object,
        default() {
          return {
            label: 'value',
            value: 'value'
          };
        }
      },
      popperClass: String,
      placeholder: String,
      disabled: Boolean,
      name: String,
      size: String,
      value: String,
      autofocus: Boolean,
      fetchSuggestions: Function,
      triggerOnFocus: {
        type: Boolean,
        default: true
      },
      customItem: String,
      icon: String,
      onIconClick: Function
    },
    data() {
      return {
        isFocus: false,
        isOnComposition: false,
        suggestions: [],
        loading: false,
        highlightedIndex: -1
      };
    },
    computed: {
      suggestionVisible() {
        const suggestions = this.suggestions;
        let isValidData = Array.isArray(suggestions) && suggestions.length > 0;
        // let val = (isValidData || this.loading) && this.isFocus;
        let val = (isValidData || this.loading);
        return val;
      }
    },
    watch: {
      suggestionVisible(val) {
        // GOOD 
        // console.log("CALLED VISIBLE METHOD");
        this.broadcast('AutocompleteSuggestions', 'visible', [val, this.$refs.input.$refs.input.$el.offsetWidth]);    
      }
    },
    methods: {
      getData(queryString) {
        this.loading = true;
        this.fetchSuggestions(queryString, (suggestions) => {
          this.loading = false;
          if (Array.isArray(suggestions)) {
            this.suggestions = suggestions;
          } else {
            console.error('autocomplete suggestions must be an array');
          }
        });
      },
      handleComposition(event) {
        if (event.type === 'compositionend') {
          this.isOnComposition = false;
          this.handleChange(this.value);
        } else {
          this.isOnComposition = true;
        }
      },
      handleChange(value) {
        this.$emit('input', value);
        if (this.isOnComposition || (!this.triggerOnFocus && !value)) {
          this.suggestions = [];
          return;
        }
        this.getData(value);
      },
      handleFocus() {
        console.log("AUTOCOMPLETE: CALLED HANDLE FOCUS");
        this.isFocus = true;
        if (this.triggerOnFocus) {
          this.getData(this.value);
        }
      },
      handleBlur() {
        setTimeout(_ => {
          this.isFocus = false;
        }, 100);
      },
      handleKeyEnter() {
        if (this.suggestionVisible && this.highlightedIndex >= 0 && this.highlightedIndex < this.suggestions.length) {
          this.select(this.suggestions[this.highlightedIndex]);
        }
      },
      select(item) {
        this.$emit('input', item[this.props.value]);
        this.$emit('select', item);
        this.$nextTick(_ => {
          this.suggestions = [];
        });
      }
    },
    mounted() {
      this.$on('item-click', item => {
        this.select(item);
      });
    },
    beforeDestroy() {
      this.$refs.suggestions.$destroy();
    }
  };
</script>

<style lang="scss">

.autocomplete {
  position: relative;
  display: inline-block;
  width: 100%;
}
.autocomplete-suggestions {
  margin: 0;
  box-shadow: 0 0 6px 0 rgba(0,0,0,0.04), 0 2px 4px 0 rgba(0,0,0,0.12);

  &__wrapper {
    max-height: 280px;
    overflow: auto;
    font-family: inherit;
  }

  &__item {
    list-style: none;
    line-height: 36px;
    padding: 0 10px;
    margin: 0;
    cursor: pointer;
    color: var(--color-extra-light-black);
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
      background-color: gray;
    }
    &.highlighted {
      background-color: blue;
      color: white;
    }
    &:active {
      background-color: darken(blue, 0.2);
    }
    &.divider {
      margin-top: 6px;
      border-top: 1px solid grey;
    }
    &.divider:last-child {
      margin-bottom: -6px;
    }
  }

  & .el-icon-loading {
    vertical-align: middle;
  }
}

</style>