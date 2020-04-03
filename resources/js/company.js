var app = new Vue({
  el: '#app',
  data: {
    stockName: '',
    showResults: false,
    isFetching: false,
    companies: [],
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
  methods: {
    fetchCompanies: function(){
      this.isFetching = true;

      Vue.http.post('https://848e4cc2.us-south.apigw.appdomain.cloud/companylist/query', {"searchQuery": this.stockName}).then(response => {

        this.companies = response.body.entries;
        // TODO: Fill out the table
        this.showResults = true;
        this.isFetching = false;

      // Error Handling
      }, response => {
        this.showResults = true;
        this.isFetching = false;
      });
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