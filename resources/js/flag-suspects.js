var app = new Vue({
  el: '#app',
  data: {
    stockName: '',
    showResults: false,
    isFetching: false,
    trades: []
  },
  methods:{
    queryStock: function (){
      this.isFetching = true;
      this.trades = [];

      setTimeout(() => {
        Vue.http.get('/').then(response => {

          // TODO: Fill out the table
          this.isFetching = false;
          this.showResults = true;

        }, response => {
          this.isFetching = false;
          this.showResults = true;
        });
      }, 500);
    }
  }
})