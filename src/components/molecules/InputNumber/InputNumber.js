import InputField from '../InputField/InputField';
import { once, on } from '../../utils/dom';
import debounce from 'throttle-debounce/debounce';

let inputNumberTemplate = `
<div class="input-number"
    :class="[
        modifierStyles,
        {'focus': focused},
        { 'is-disabled': disabled },
        { 'is-without-controls': !controls}
    ]"
    >
    <span
        v-if="controls"
        class="input-number__decrease"
        :class="{'is-disabled': minDisabled}"
        v-repeat-click="decrease"
    >
        <i class="icon-minus"></i>
    </span>
    <span
        v-if="controls"
        class="input-number__increase"
        :class="{'is-disabled': maxDisabled}"
        v-repeat-click="increase"
    >
        <i class="icon-plus"></i>
    </span>
    <input-field
        :value="currentValue"
        @keydown.up.native.prevent="increase"
        @keydown.down.native.prevent="decrease"
        @blur="handleBlur"
        @focus="handleFocus"
        @input="debounceHandleInput"
        :disabled="disabled"
        :size="size"
        :max="max"
        :min="min"
        ref="inputField"
    >
        <template slot="prepend" v-if="$slots.prepend">
            <slot name="prepend"></slot>
        </template>
        <template slot="append" v-if="$slots.append">
            <slot name="append"></slot>
        </template> 
    </input-field>
</div>
`;

export default {
    name: 'InputNumber',
    template: inputNumberTemplate,
    directives: {
        repeatClick: {
            bind(el, binding, vnode) {
                let interval = null;
                let startTime;
                const handler = () => vnode.context[binding.expression].apply();
                const clear = () => {
                    if (new Date() - startTime < 100) {
                        handler();
                    }
                    clearInterval(interval);
                    interval = null;
                };

                on(el, 'mousedown', () => {
                    startTime = new Date();
                    once(document, 'mouseup', clear);
                    clearInterval(interval);
                    interval = setInterval(handler, 100);
                });
            }
        }
    },
    components: {
        'input-field': InputField
    },
    props: {
        step: {
            type: Number,
            default: 1
        },
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        value: {
            default: 0
        },
        disabled: Boolean,
        size: String,
        controls: {
            type: Boolean,
            default: true
        },
        debounce: {
            type: Number,
            default: 300
        },
        modifierStyles: {
            type: Array, 
            default: null 
        }
    },
    data() {
        return {
            currentValue: 0,
            focused: false
        };
    },
    watch: {
        value: {
            immediate: true,
            handler(value) {
                let newVal = Number(value);
                if (isNaN(newVal)) return;
                if (newVal >= this.max) newVal = this.max;
                if (newVal <= this.min) newVal = this.min;
                this.currentValue = newVal;
                this.$emit('input', newVal);
            }
        }
    },
    computed: {
        minDisabled() {
            return this._decrease(this.value, this.step) < this.min;
        },
        maxDisabled() {
            return this._increase(this.value, this.step) > this.max;
        },
        precision() {
            const { value, step, getPrecision } = this;
            return Math.max(getPrecision(value), getPrecision(step));
        }
    },
    methods: {
        toPrecision(num, precision) {
            if (precision === undefined) precision = this.precision;
            return parseFloat(parseFloat(Number(num).toFixed(precision)));
        },
        getPrecision(value) {
            const valueString = value.toString();
            const dotPosition = valueString.indexOf('.');
            let precision = 0;
            if (dotPosition !== -1) {
                precision = valueString.length - dotPosition - 1;
            }
            return precision;
        },
        _increase(val, step) {
            if (typeof val !== 'number') return this.currentValue;

            const precisionFactor = Math.pow(10, this.precision);

            return this.toPrecision((precisionFactor * val + precisionFactor * step) / precisionFactor);
        },
        _decrease(val, step) {
            if (typeof val !== 'number') return this.currentValue;

            const precisionFactor = Math.pow(10, this.precision);

            return this.toPrecision((precisionFactor * val - precisionFactor * step) / precisionFactor);
        },
        increase() {
            if (this.disabled || this.maxDisabled) return;
            const value = this.value || 0;
            const newVal = this._increase(value, this.step);
            if (newVal > this.max) return;
            this.setCurrentValue(newVal);
        },
        decrease() {
            if (this.disabled || this.minDisabled) return;
            const value = this.value || 0;
            const newVal = this._decrease(value, this.step);
            if (newVal < this.min) return;
            this.setCurrentValue(newVal);
        },
        handleBlur() {
            this.$refs.inputField.setCurrentValue(this.currentValue);
            this.focused = false;
        },
        setCurrentValue(newVal) {
            const oldVal = this.currentValue;
            if (newVal >= this.max) newVal = this.max;
            if (newVal <= this.min) newVal = this.min;
            if (oldVal === newVal) {
                this.$refs.inputField.setCurrentValue(this.currentValue);
                return;
            }
            this.$emit('change', newVal, oldVal);
            this.$emit('input', newVal);
            this.currentValue = newVal;
        },
        handleInput(value) {
            if (value === '') {
                return;
            }
            const newVal = Number(value);
            if (!isNaN(newVal)) {
                this.setCurrentValue(newVal);
            } else {
                this.$refs.inputField.setCurrentValue(this.currentValue);
            }
        },
        handleFocus() {
            this.focused = true;
        }
    },
    created() {
        this.debounceHandleInput = debounce(this.debounce, value => {
            this.handleInput(value);
        });
    }
};


