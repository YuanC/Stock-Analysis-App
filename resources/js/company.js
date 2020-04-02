var app = new Vue({
  el: '#app',
  data: {
    stockName: '',
    showResults: false,
    companies: []
  },
  methods: {
    fetchCompanies: function(){
      Vue.http.get('https://848e4cc2.us-south.apigw.appdomain.cloud/companylist').then(response => {

        this.companies = response.body.entries;
        // TODO: Fill out the table
        this.showResults = true;

      // Error Handling
      }, response => {
        this.showResults = true;
      });
    }
  },
  mounted: function(){
    this.fetchCompanies();
  }
})