async function startTimer() {
  var self = this;
  var promise = new Promise((resolve, reject) => {
    setTimeout(()=> {
      self.$emit('timerComplete');
      resolve();
    }, this.time);
  });
  await promise;
}

export default {
  data: {
    timerComplete: false
  },
  methods: {
    startTimer,
    stopTimer() {
      this.timerComplete = true;
    },
    setUpTimer() {
      if (!this.$props.time) {
          this.time = 1000;
      }
      if (!this.$props.timerCallback) {
        this.timerCallback = function () {
          console.log("Timer has completed");
        }
      }
      this.$on('timerComplete', this.stopTimer);
    }
  },
  mounted() {
    this.setUpTimer()
  }
};
