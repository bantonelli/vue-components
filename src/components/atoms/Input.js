const inputTemplate = `
<div class="input" :class="classes">
    <input 
        class="input__input" 
        v-bind="parentProps"
        @keyup="changed"         
    >
    <div class="input__border"></div>
    <slot name="icon"></slot>
</div>
`;

export default {
    template: inputTemplate,
    name: 'input',
    props: {
        placeholder: {
            type: String, 
            default: "Basic Text Input"
        },
        classes: {
            type: Object,
            default: function () {
                return {
                    "input_color-invert": false
                };
            }
        },
        parentProps: {
            type: Object
        }
    },
    methods: {
        changed: function (event) {
            var value = event.target.value;
            this.$emit('input', value);    
        }
    }
};