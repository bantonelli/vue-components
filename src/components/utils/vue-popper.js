import Vue from 'vue';
import {
  PopupManager
} from './popup/index';

// const PopperJS = Vue.prototype.$isServer ? function() {} : require('./popper');
import PopperJS from 'popper.js';
// import generatePopperOnLoad from './generatePopper';

const stop = e => e.stopPropagation();

/**
 * @param {HTMLElement} [reference=$refs.reference] - The reference element used to position the popper.
 * @param {HTMLElement} [popper=$refs.popper] - The HTML element used as popper, or a configuration used to generate the popper.
 * @param {String} [placement=button] - Placement of the popper accepted values: top(-start, -end), right(-start, -end), bottom(-start, -end), left(-start, -end)
 * @param {Number} [offset=0] - Amount of pixels the popper will be shifted (can be negative).
 * @param {Boolean} [visible=false] Visibility of the popup element.
 * @param {Boolean} [visible-arrow=false] Visibility of the arrow, no style.
 */
export default {
  props: {
    placement: {
      type: String,
      default: 'bottom'
    },
    boundariesPadding: {
      type: Number,
      default: 5
    },
    reference: {},
    popper: {},
    offset: {
      default: 0
    },
    value: Boolean,
    visibleArrow: Boolean,
    transition: String,
    appendToBody: {
      type: Boolean,
      default: false
    },
    popperOptions: {
      type: Object,
      default() {
        return {
          gpuAcceleration: false
        };
      }
    }
  },

  data() {
    return {
      showPopper: false,
      currentPlacement: ''
    };
  },

  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.showPopper = val;
        this.$emit('input', val);
      }
    },

    showPopper(val) {
      val ? this.updatePopper() : this.destroyPopper();
      this.$emit('input', val);
    }
  },

  methods: {
    createPopper() {
      // console.log("INSIDE Vue-popper.createPopper()");
      if (this.$isServer) return;

      // set up placement of popper 
      // currentPlacement is data attr 
      // placement is a prop attr 
      this.currentPlacement = this.currentPlacement || this.placement;
      if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(this.currentPlacement)) {
        return;
      }

      // set up options
      const options = this.popperOptions;

      // get the popper html element 
      // popperElm is defined on parent during mounted() hook 
      const popper = this.popperElm = this.popperElm || this.popper || this.$refs.popper;

      // get the ref html element 
      // referenceElm is defined on parent during mounted() hook 
      let reference = this.referenceElm = this.referenceElm || this.reference || this.$refs.reference;

      if (!reference &&
        this.$slots.reference &&
        this.$slots.reference[0]) {
        reference = this.referenceElm = this.$slots.reference[0].elm;
      }

      if (!popper || !reference) return;
      if (this.visibleArrow) this.appendArrow(popper);

      // appendToBody is prop attr 
      // it is set to true by default 
      if (this.appendToBody) document.body.appendChild(this.popperElm);
      if (this.popperJS && this.popperJS.destroy) {
        this.popperJS.destroy();
      }

      // update placement on options object 
      options.placement = this.currentPlacement;
      options.offset = this.offset;
      // options.modifiers = { generatePopper: {
      //                         onLoad: generatePopperOnLoad,
      //                         order: 0,
      //                         enabled: true,
      //                       },
      //                     };
      options.onCreate = _ => {
        this.$emit('created', this);
        this.resetTransformOrigin();
        this.$nextTick(this.updatePopper);
      };
      if (typeof options.onUpdate !== 'function') {
        options.onUpdate = (_) => {};
      }

      // console.log("REFERENCE: ", reference);
      // console.log("POPPER: ", popper);
      // console.log("OPTIONS: ", options);
      this.popperJS = new PopperJS(reference, popper, options);
      // console.log("CREATED new Popper instance: Vue-popper.createPopper()");

      // this.popperJS._popper.style.zIndex = PopupManager.nextZIndex();
      // this.popperElm.addEventListener('click', stop);
      // console.log("FINISHED Vue-popper.createPopper()");
    },

    updatePopper() {
      this.popperJS ? this.popperJS.update() : this.createPopper();
    },

    doDestroy() {
      /* istanbul ignore if */
      if (this.showPopper || !this.popperJS) return;
      this.popperJS.destroy();
      this.popperJS = null;
    },

    destroyPopper() {
      if (this.popperJS) {
        this.resetTransformOrigin();
      }
    },

    resetTransformOrigin() {
      let placementMap = {
        top: 'bottom',
        bottom: 'top',
        left: 'right',
        right: 'left'
      };
      // console.log(this.popperJS);
      let placement = this.popperJS.popper.getAttribute('x-placement').split('-')[0];
      let origin = placementMap[placement];
      this.popperJS.popper.style.transformOrigin = ['top', 'bottom'].indexOf(placement) > -1 ? `center ${ origin }` : `${ origin } center`;
    },

    appendArrow(element) {
      let hash;
      if (this.appended) {
        return;
      }

      this.appended = true;

      for (let item in element.attributes) {
        if (/^_v-/.test(element.attributes[item].name)) {
          hash = element.attributes[item].name;
          break;
        }
      }

      const arrow = document.createElement('div');

      if (hash) {
        arrow.setAttribute(hash, '');
      }
      arrow.setAttribute('x-arrow', '');
      arrow.className = 'popper__arrow';
      element.appendChild(arrow);
    }
  },

  beforeDestroy() {
    this.doDestroy();
    if (this.popperElm && this.popperElm.parentNode === document.body) {
      this.popperElm.removeEventListener('click', stop);
      document.body.removeChild(this.popperElm);
    }
  },

  // call destroy in keep-alive mode
  deactivated() {
    this.$options.beforeDestroy[0].call(this);
  }
};
