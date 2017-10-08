import _ from 'lodash';
import Emitter from '../../utils/mixins/emitter';
import Clickoutside from '../../utils/clickoutside';
import DropdownMenu from './DropdownMenu';

let dropdownTemplate = `
<div 
  :class="classes"
  ref="reference"
  v-clickoutside="handleClose"
  >
    <div 
      class="dropdown__label"       
    >
        Really Long Username
    </div>  
    <dropdown-menu 
      @show="handleOpen"
      @hide="handleClose"      
      v-show="visible"
      :trigger="trigger"
    >
        <ul 
          class="dropdown__menu-list"        
        >
            <li class="dropdown__menu-item"><a href="#">Settings</a></li>
            <li class="dropdown__menu-item"><a href="#">Profile</a></li>                    
        </ul>
    </dropdown-menu>        
</div>
`;

/*
PLAN: 
Dropdown - Parent component
    - Contains "reference" ---> DONE
    - Uses the Dropdown menu ---> DONE 
    - Determines variationClass and modifierStyles ---> DONE
    - Determines iconClass ---> DONE  
    - Determines trigger click, hover, or use reference as trigger --- DONE
    - Determines dropdown label text  
    - Dynamically loads component into menu <slot>
    
Dropdown Menu - Child 
    - Menu <slot> 
        - Use <component> to determine which component type is going 
          to be loaded as an item   
        - Use v-for on <component> to iterate
    - Make each dropdown menu-item be similar to form-item 
      where each item can be a different class of component. 

 */

export default {
  mixins: [Emitter],

  name: 'Dropdown',

  template: dropdownTemplate,

  componentName: 'Dropdown',

  directives: { Clickoutside },  

  components: {
    'dropdown-menu': DropdownMenu
  },

  props: {
      trigger: {
          type: String,
          default: 'click',
          validator: value => ['click', 'hover'].indexOf(value) > -1
      },
      triggerReferenceOnly: {
        type: Boolean,
        default: true
      },
      modifierStyles: {
        type: Array, 
        default: function () {
          return [];
        }
      },
      variationClass: {
        type: String,
        default: "dropdown"        
      },
      iconClass: {
        type: String,
        default: "pe-icon-dropdown-arrow"
      }
  },

  data() {
    return {
      visible: false
    };
  },

  computed: {
    classes: function () {
      let result = [this.variationClass, this.iconClass];
      return _.concat(result, this.modifierStyles);
    }
  },

  watch: {
    visible(val) {
      // If visible is set to false         
      if (!val) {
        // Destroy Popper  
        // this.broadcast('DropdownMenu', 'destroyPopper');
      } 
      // If is visible 
      else {
        // Broadcast updatePopper event 
        // this.broadcast('DropdownMenu', 'updatePopper');
      }      
      // this.$emit('visible-change', val);
    }
  },

  methods: {
    handleClose() {
      // console.log("CALLED Clickoutside"); >> WORKED
      console.log(this.$refs.reference);
      this.visible = false;
    },
    handleOpen() {
      this.visible = true;
    }
  },

  mounted() {
  },

  beforeDestroy() {
    if (this.$el) {
      this.broadcast('DropdownMenu', 'destroyPopper');
    }
  }
};
