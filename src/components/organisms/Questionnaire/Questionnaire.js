/*
  TODO
*/

let questionnaireTemplate = `<div class="questionnaire">
  <template v-for="question in shownQuestions">
    <keep-alive>
      <question
        :question="question"
        :parentProps="parentProps"
        :class="modifierStyles"
        :key=question._id
        >
      </question>
    </keep-alive>
  </template>
  <pagination
    style="margin-top:10px;"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page.sync="currentPage"
    :page-size="pageSize"
    layout="->, prev, jumper, pager, next, total"
    :total="questions.length"
    :jumper-controls="false"
  >
  </pagination>
  <template v-if="!submittable && lastQuestion">
    <button class="button button_color-primary" @click="submit"><span class="button__text">Submit</span></button>
  </template>
</div>`;

import Question from "./Question";
import Pagination from "../Pagination/Pagination";
import Pager from "../Pagination/Pager";
import Emitter from "../../mixins/emitter"
import _ from 'lodash';

export default {
  template: questionnaireTemplate,
  name: 'Questionnaire',
  componentName: 'Questionnaire',
  mixins: [Emitter],
  data: function () {
    return {
      currentPage: 1,
      pageSize: 1,
      answers: []
    };
  },
  mounted() {
    this.$on('answerChosen', this.handleChosenAnswer);
  },
  computed: {
    shownQuestions() {
      var amountPerPage = this.pageSize;
      var startIndex = amountPerPage * (this.currentPage - 1);
      var endIndex = amountPerPage * (this.currentPage);
      return _.slice(this.questions, startIndex, endIndex);
    },
    lastQuestion() {
      return this.currentPage === (this.questions.length / this.pageSize)
    },
    parentProps() {
      return _.omit(this.$props, ['modifierStyles']);
    }
  },
  components: {
    question: Question,
    pagination: Pagination,
    pager: Pager
  },
  props: {
    showAnswer: false,
    showExplanation: false,
    showRightOrWrong: false,
    isPoll: false,
    showPoll: false,
    submittable: false,
    modifierStyles: {
      type: Array,
      default: null
    },
    questions: {
      type: Array,
      default: function () {
        return [
          {
            _id: "1",
            question: "QUESTION?",
            image: "QUESTION IMAGE",
            choices: [
              { text: "choice a" },
              { text: "choice b" },
              { text: "choice c" },
              { text: "choice d" }
            ],
            answer: ["choice a", "choice b"],
            answerType: "checkbox",
            explanation: {
              answer: "choice a",
              image: "ANSWER IMAGE",
              explanation: "EXPLANATION"
            }
          },
          {
            _id: "2",
            question: "QUESTION 2?",
            image: "QUESTION IMAGE",
            choices: [
              { text: "choice a" },
              { text: "choice b" },
              { text: "choice c" },
              { text: "choice d" }
            ],
            answer: "choice a",
            answerType: "radio",
            explanation: {
              answer: "choice a",
              image: "ANSWER IMAGE",
              explanation: "EXPLANATION"
            }
          },
          {
            _id: "3",
            question: "QUESTION 3?",
            image: "QUESTION IMAGE",
            answer: "choice a",
            answerType: "text",
            answerMaxLength: 10,
            explanation: {
              answer: "choice a",
              image: "ANSWER IMAGE",
              explanation: "EXPLANATION"
            }
          },
          {
            _id: "4",
            question: "QUESTION 4?",
            image: "QUESTION IMAGE",
            answer: "choice a",
            answerType: "textarea",
            answerMaxLength: 20,
            explanation: {
              answer: "choice a",
              image: "ANSWER IMAGE",
              explanation: "EXPLANATION"
            }
          }
        ]
      }
    }
  },
  methods: {
    handleSizeChange: function (value) {
      this.pageSize = value;
    },
    handleCurrentChange: function (value) {
      this.currentPage = value
    },
    submit() {
      this.broadcast("Question", "questionnaireSubmit", []);
      //TODO: send this.answers to backend
    },
    handleChosenAnswer(response) {
      this.answers.push(response)
    }
  }
};
