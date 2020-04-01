var app = new Vue({
  el: '#app',
  data: {
    stockName: '',
    showResults: false,
    companies: []
  },
  methods: {
    fetchCompanies: function(){
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
  },
  mounted: function(){
    this.fetchCompanies();
  }
})