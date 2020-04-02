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
      if (this.toCurr != '' && this.fromCurr != ''){
        return (this.amount * (this.currencyRates[this.toCurr]/this.currencyRates[this.fromCurr])).toFixed(2);
      }
      return 0;
    }
  },
  methods: {
    fetchCurrencies: function(){
      Vue.http.get('https://848e4cc2.us-south.apigw.appdomain.cloud/currencyrates').then(response => {

        this.currencyRates = {};
        response.body.entries.forEach(entry => {
          this.currencyRates[entry.country] = entry.rate;
        });

        this.showResults = true;
      }, response => {
        this.showResults = true;
      });
    }
  },
  mounted: function(){
    this.fetchCurrencies();
  }
})