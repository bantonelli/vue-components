let questionnaireTemplate = `<div class="questionnaire">
  <question
    v-for="question in shownQuestions"
    :question="question"
    >
  </question>
  <pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page.sync="currentPage"
    :page-size="pageSize"
    layout="->, prev, jumper, pager, next, total"
    :total="questions.length"
    :jumper-controls="false"
  >
  </pagination>
</div>`;

import Question from "./Question";
import Pagination from "../Pagination/Pagination";
import Pager from "../Pagination/Pager";
import _ from 'lodash';

export default {
  template: questionnaireTemplate,
  data: function() {
    return {
      currentPage: 1,
      pageSize: 1
    };
  },
  computed: {
    shownQuestions() {
      var amountPerPage = this.pageSize;
      var startIndex = amountPerPage * (this.currentPage-1);
      var endIndex = amountPerPage * (this.currentPage);
      return _.slice(this.questions, startIndex, endIndex);
    }
  },
  components: {
    question: Question,
    pagination: Pagination,
    pager: Pager
  },
  props: {
    questions: {
      type: Array,
      default: function () {
        return [
          {
            question: "QUESTION?",
            image: "",
            choices: [
              { option: "a", text: "choice a" },
              { option: "b", text: "choice b" },
              { option: "c", text: "choice c" },
              { option: "d", text: "choice d" }
            ],
            answer: ""
          },
          {
            question: "QUESTION 2?",
            image: "",
            choices: [
              { option: "a", text: "choice a" },
              { option: "b", text: "choice b" },
              { option: "c", text: "choice c" },
              { option: "d", text: "choice d" }
            ],
            answer: ""
          },
          {
            question: "QUESTION 3?",
            image: "",
            choices: [
              { option: "a", text: "choice a" },
              { option: "b", text: "choice b" },
              { option: "c", text: "choice c" },
              { option: "d", text: "choice d" }
            ],
            answer: ""
          }
        ]
      }
    }
  },
  methods: {
    handleSizeChange: function(value) {
      this.pageSize = value;
    },
    handleCurrentChange: function(value) {
      this.currentPage = value
    }
  }
};
