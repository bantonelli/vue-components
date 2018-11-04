/*
  let question know if it was answered correctly DONE
  let parent know if correct or wrong DONE
  PARENT PROPS: DONE
    show answer
    show explanations
    show if right or wrong
    show poll
    submittable
    is Poll
  elements: DONE
    choices
    choice
    .isWrong
    .isCorrect
    .isPoll
    text
    image
    answer
    explanation-text
    explanation-image

  CAPTURING INPUT: DONE
    v-model on radiogroup when the question is answered will emit input event up to questionnaire
    will also emit answerChosen event and payload object {}
      --> this.isCorrect, this.answer (v-model from radiogroup), and this.question.question
*/

let questionTemplate = `
<div class="question">
    <h6 class="question__text">{{question.question}}</h6>
    <template v-if="questionImage">
        <img :src="question.image" class="question__image">
    </template>
    <radio-group class="question__choices" v-model="answer">
      <radio-component
        :id="choice.text.replace(/\s/g, '')"
        class="question__choice"
        :class="{'is-correct':choiceIsCorrect(choice.text),
        'is-wrong': choiceIsWrong(choice.text)}"
        v-for="choice in question.choices"
        :key="choice.text"
        :label="choice.text">
      </radio-component>
    </radio-group>

    <template v-if="parentProps.showAnswer">
        <h6 class="question__answer">{{question.answer}}</h6>
    </template>

    <template v-if="parentProps.showExplanation">
        <template v-if="explanationImage">
            <img :src="explanation.image" class="question__explanation-image">
        </template>
        <h6 class="question__explanation-text">{{question.explanation.explanation}}</h6>
    </template>

    <template v-if="parentProps.isPoll">
      <template v-if="parentProps.showPoll">
        <h6 v-for="choice in question.choices">{{choice.timesChosen}}</h6>
      </template>
    </template>

    <template v-if="parentProps.submittable">
      <button class="button button_color-primary" @click="chooseAnswer"><span class="button__text">Submit</span></button>
    </template>

</div>`

import Form from '../../organisms/Form/Form'
import FormItem from '../../organisms/Form/FormItem'
import RadioGroup from '../../molecules/RadioGroup/RadioGroup'
import Radio from '../../atoms/Radio/Radio'
import Emitter from '../../mixins/emitter'

export default {
    template: questionTemplate,
    name: 'Question',
    componentName: 'Question',
    data: function () {
        return {
            answer: "",
            answered: false
        }
    },
    props: {
        parentProps: {
          type: Object,
          default: null
        },
        question: {
            type: Object,
            default() {
                return {
                }
            }
        }
    },
    methods: {
      chooseAnswer() {
        //send the event with payload to the parent
    //     v-model on radiogroup when the question is answered will emit input event up to questionnaire
    // will also emit answerChosen event and payload object {}
    //   --> this.isCorrect, this.answer (v-model from radiogroup), and this.question.question
        this.answered = true;
        this.$emit('answerChosen', {
          answer: this.answer,
          question: this.question,
          isCorrect: this.isCorrect
        });
      },
      choiceIsCorrect(choiceText) {
        if (this.answered) {
          return this.answer === choiceText;
        }
      },
      choiceIsWrong(choiceText) {
        if (this.answered) {
          return this.answer != choiceText;
        }
      }
    },
    mounted() {
      this.$on('questionnaireSubmit', this.chooseAnswer);
    },
    computed: {
      isCorrect() {
        return this.question.answer === this.answer;
      },
      questionImage() {
        return this.question.image != ""
      },
      explanationImage() {
        return this.question.explanation.image != ""
      }
    },
    components: {
        'radio-group': RadioGroup,
        'form-component': Form,
        'form-item': FormItem,
        'radio-component': Radio
    },
    mixins: [Emitter]
}

{
    /* <style lang="scss">
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
  </style> */
}
