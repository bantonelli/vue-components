let collectionTemplate = `
<div class="container">
    <div class="mix category-a" data-order="1"></div>
    <div class="mix category-b" data-order="2"></div>
    <div class="mix category-b category-c" data-order="3"></div>
    <div class="mix category-a category-d" data-order="4"></div>
</div>
`;



export default {
  name: 'Collection',

  template: collectionTemplate,

  componentName: 'Collection',

  props: {
    model: Object,
    rules: Object,
    labelPosition: String,
    labelWidth: String,
    labelSuffix: {
      type: String,
      default: ''
    },
    inline: Boolean,
    showMessage: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    rules() {
      this.validate();
    }
  },
  data() {
    // You may use any key as your unique ID (e.g. 'id', '_id', 'Id', etc)
    // You will specify using the data.uidKey configuration option
        // In this case we are using 'id'
    return {
        people: [
            {
                id: 142,
                name: 'Joe',
                role: 'Developer',
                age: 22
            },
            {
                id: 242,
                name: 'Zack',
                role: 'Project Manager',
                age: 45
            },
            {
                id: 243,
                name: 'Kumar',
                role: 'Designer',
                age: 29
            },
            {
                id: 402,
                name: 'Steph',
                role: 'Developer',
                age: 33
            },
            {
                id: 511,
                name: 'Sohyun',
                role: 'Developer',
                age: 23
            }
        ]
    };
  },
  created() {
    /* 
    OPTION 1 - RENDER MIXITUP INTO EMPTY CONTAINER  
    - GIVE MIXITUP CONTROL OVER FULL LIFECYCLE - Rendering etc. 
        // Instantiate mixitup 
        function render(item) {
            // This function receives a single object from the dataset...
            // It is invoked every time an item is added to the DOM...
            // And it must return a string representation of a single HTML element 
            // to be inserted into the DOM. 
            return `<div class="item" data-ref="item">Name: ${item.name}, Role: ${item.role}, Age: ${item.age}</div>`;
        };
        // In the example above, our render function uses a crude ES6 template 
        // literal to produce HTML output, but you could easily integrate 
        // a templating engine such as Handlebars, or your framework's 
        // built-in rendering method here – as long as it returns a string.

        const container = document.querySelector('[data-ref="container"]');
        // The container element passed to the mixitup() factory function 
        // should not contain any targets at this point.
        // <div class="container" data-ref="container"></div>

        const mixer = mixitup(container, {
            data: {
                // Specify unique ID key on the dataSet (users)
                uidKey: 'id'
            },

            // must also specify a render.target function
            render: {
                target: render
            },
            selectors: {
                target: '[data-ref="item"]'
            }
        }); 

        




    */

    /* 
    OPTION 2: PRE-RENDERED TARGETS
    - This approach can be used in single page apps where your application 
    renders the component and its items in the browser before MixItUp is instantiated.

    */

  },
  methods: {
    resetFields() {
    },
    validate(callback) {
    },
    validateField(prop, cb) {
    }
  }
};