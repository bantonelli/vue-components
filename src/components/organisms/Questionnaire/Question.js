let questionTemplate = `
  <div class="question">
    <div id="question-form" style="width:100%;">
      <form-component ref="form">
        <form-item prop="choices">
          <h6 class="typograpy-h6">{{question.question}}</h6>
          <img :src="question.image">
          <radio-group>
            <radio-component v-for="choice in question.choices" :key="choice.option" :label="choice.text"></radio-component>
          </radio-group>
        </form-item>
      </form-component>
    </div>
  </div>`;


import Form from "../../organisms/Form/Form";
import FormItem from "../../organisms/Form/FormItem";
import RadioGroup from "../../molecules/RadioGroup/RadioGroup";
import Radio from '../../atoms/Radio/Radio';

export default {
  template: questionTemplate,
  data: function() {
    return {};
  },
  props: {
    question: {
        type: Object,
        default() {
            return {

            }
        }
    }
  },
  methods: {},
  computed: {},
  components: {
    "radio-group": RadioGroup,
    "form-component": Form,
    "form-item": FormItem,
    "radio-component": Radio
  }
};

{/* <style lang="scss">
#question-form {
  position: relative;
  padding: 0 50px;
  .button {
    position: absolute;
  }
  .checkbox-group {
    .checkbox {
      display: inline-block;
      width: 45%;
    }
  }
  .radio-group {
    .radio {
      margin: 10px 0 0 0;
      display: inline-block;
      width: 45%;
    }
  }
  .select {
    max-width: 100%;
  }
  .form-item {
    position: relative;

    .form-item__label {
      z-index: 2;
      background: white;
      padding: 12px 6px 12px 6px;
      // color: #BC61A8; // nth($pe-primary-color-list, 3)
      color: #505050;
      font-family: "cabinbold";
    }
  }

  .form {
    padding: 25px 0px;
    .form-item {
      margin: 25px 0px;
    }
    &_label-left {
      .form-item {
        padding: 20px 10px;
        margin: 10px 0;
      }
      .form-item__label {
        left: 0;
        text-align: left;
      }
    }
    &_label-right {
      .form-item {
        padding: 20px 10px;
        margin: 10px 0;
      }
      .form-item__label {
        left: 0;
        text-align: right;
      }
    }
    &_label-top {
      .form-item {
        padding: 20px 10px;
        margin: 30px 0;
        border-top: 1px solid transparentize(#b6b6b6, 0.5); // nth($pe-greyscale-color-list, 4);
        border-radius: 0px;
      }
      .form-item__label {
        top: -25px;
      }
    }
  }
}
</style> */}
