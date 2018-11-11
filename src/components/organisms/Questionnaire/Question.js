/*
  TODO:implement check box as choices if there is more than 1 right answer
*/

let questionTemplate = `
<div class="question">
    <h6 class="question__text">{{question.question}}</h6>
    <template v-if="questionImage">
        <img :src="question.image" class="question__image">
    </template>

    <template v-if="question.answerType === 'radio'">
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
  </template>

  <template v-else-if="question.answerType === 'checkbox'">
    <checkbox-group class="question__choice" v-model="answers">
      <checkbox-component
        :id="choice.text.replace(/\s/g, '')"
        class="question__choice"
        :class="{'is-correct':choiceIsCorrect(choice.text),
        'is-wrong': choiceIsWrong(choice.text)}"
        v-for="choice in question.choices"
        :key="choice.text"
        :label="choice.text">
      </checkbox-component>
    </checkbox-group>
  </template>

  <template v-else-if="question.answerType === 'textbox'">
    <text-component
      :placeholder="question.question"
      :type="question.answerType"
      :maxlength="question.answerMaxLength"
      class="question__choice" v-model="answer">
    </text-component>
  </template>

  <template v-else>
    <text-component
      :placeholder="question.question"
      :type="question.answerType"
      :maxlength="question.answerMaxLength"
      :autosize="true"
      class="question__choice" v-model="answer">
    </text-component>
  </template>

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
import CheckboxGroup from '../../molecules/CheckboxGroup/CheckboxGroup'
import Checkbox from '../../atoms/Checkbox/Checkbox'
import Text from '../../molecules/InputField/InputField'
import Emitter from '../../mixins/emitter'

export default {
    template: questionTemplate,
    name: 'Question',
    componentName: 'Question',
    data: function () {
        return {
            answer: "",
            answers: [],
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
      /**
       * @description choose answer
       * - if answer is whatever
       * @param {number} answer
       */
      chooseAnswer(answer) {
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
        'radio-component': Radio,
        'checkbox-group': CheckboxGroup,
        'checkbox-component': Checkbox,
        'text-component': Text
    },
    mixins: [Emitter]
}

/* let question know if it was answered correctly DONE
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
