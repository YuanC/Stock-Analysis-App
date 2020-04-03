var app = new Vue({
  el: '#app',
  data: {
    stockName: '',
    showResults: false,
    isFetching: false,
    min: 0,
    max: 0,
    sum: 0,
    cnt: 0,
    registry: {
      "stock-query": false,
      "company": false,
      "flag-suspects": false,
      "stock-analysis": false,
      "stock-visualization": false,
      "comparison": false,
      "currency": false
    }
  },
  methods:{
    queryStock: function (){
      this.isFetching = true;

      setTimeout(() => {
        Vue.http.post('https://848e4cc2.us-south.apigw.appdomain.cloud/stockanalysis/query', {"searchQuery": this.stockName}).then(response => {

          // TODO: Do the shit to analyse min/max, average
          // Heaviest days, etc...

          this.min = response.body.entries.min;
          this.max = response.body.entries.max;
          this.sum = response.body.entries.sum;
          this.cnt = response.body.entries.cnt;

          this.isFetching = false;
          this.showResults = true;

        }, response => {
          this.isFetching = false;
          this.showResults = true;
        });
      }, 500);
    },
    fetchRegistry: function (){
      Vue.http.get('https://848e4cc2.us-south.apigw.appdomain.cloud/registry').then(response => {

        this.registry = response.body.registry;
        console.log(this.registry);

      }, response => {
      });
    }
  },
  mounted: function(){
    this.fetchRegistry();
  }
})