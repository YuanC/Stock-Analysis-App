var app = new Vue({
  el: '#app',
  data: {
    stockName: '',
    showResults: false,
    isFetching: false,
    companies: []
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
    }
  },
})