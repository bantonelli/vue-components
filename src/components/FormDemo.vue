<template>
<div id="form-demo" style="width: 50%; margin: 0 auto;">
    <form-component ref="form" :model="form" labwidth="120px" label-position="left">
        <form-item label="Activity name">
            <input-field v-model="form.name" placeholder="Enter your activity name"></input-field>
        </form-item>
        <form-item label="Activity zone">
            <select-component v-model="form.region" placeholder="please select your zone">
            <select-option label="Zone one" value="shanghai"></select-option>
            <select-option label="Zone two" value="beijing"></select-option>
            </select-component>
        </form-item>
        <!--<form-item label="Activity time">
            <col :span="11">
            <date-picker type="date" placeholder="Pick a date" v-model="form.date1" style="width: 100%;"></date-picker>
            </col>
            <col class="line" :span="2">-</col>
            <col :span="11">
            <time-picker type="fixed-time" placeholder="Pick a time" v-model="form.date2" style="width: 100%;"></time-picker>
            </col>
        </form-item>-->
        <!--<form-item label="Instant delivery">
            <switch on-text="" off-text="" v-model="form.delivery"></switch>
        </form-item>-->
        <form-item label="Activity type">
            <checkbox-group v-model="form.type">
                <checkbox id="'online-activities'" label="Online-activities" name="type"></checkbox>
                <checkbox id="'promotion-activities'" label="Promotion-activities" name="type"></checkbox>
                <checkbox id="'offline-activities'" label="Offline-activities" name="type"></checkbox>
                <checkbox id="'brand-exposure'" label="Simple-brand-exposure" name="type"></checkbox>
            </checkbox-group>
        </form-item>
        <form-item label="Resources">
            <radio-group v-model="form.resource">
                <radio id="sponsor" label="Sponsor"></radio>
                <radio id="venue" label="Venue"></radio>
            </radio-group>
        </form-item>
        <form-item label="Activity form">
            <input-field type="textarea" v-model="form.desc" placeholder="Describe your activity"></input-field>
        </form-item>
        <form-item>
            <button type="primary" @click="onSubmit">Create</button>
            <button>Cancel</button>
        </form-item>
    </form-component>
</div>
</template>


<script>
import InputField from './atoms/InputField/InputField';
import Radio from './atoms/Radio/Radio.vue'; 
import RadioGroup from './atoms/Radio/RadioGroup.vue';
import Checkbox from './atoms/Checkbox/Checkbox.vue';
import CheckboxGroup from './atoms/Checkbox/CheckboxGroup.vue';
import Select from './atoms/Select/Select.vue';
import Option from './atoms/Select/Option.vue';
import OptionGroup from './atoms/Select/OptionGroup.vue';
import Form from './molecules/Form/Form.vue';
import FormItem from './molecules/Form/FormItem.vue';

  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    components: {
        'input-field': InputField,
        'radio': Radio,
        'radio-group': RadioGroup,
        'checkbox': Checkbox,
        'checkbox-group': CheckboxGroup,
        'select-component': Select,
        'option-group': OptionGroup,
        'select-option': Option,
        'form-component': Form,
        'form-item': FormItem
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>