var app = new Vue({
  el: '#app',
  data: {
    amount: 0,
    fromCurr: '',
    toCurr: '',
    showResults: false,
    currencyRates: []
  },
  computed:{
    convertedValue: function(){
      return this.amount * (this.currencyRates[toCurr]/this.currencyRates[fromCurr]);
    }
  }
  methods: {
    fetchCurrencies: function(){
      setTimeout(() => {
        Vue.http.get('/').then(response => {

          // TODO: Fill out the table
          this.showResults = true;

        }, response => {
          this.showResults = true;
        });
      }, 500);
    }
  },
  mounted: function(){
    this.fetchCurrencies();
  }
})