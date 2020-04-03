var app = new Vue({
  el: '#navbar',
  data: {
    isFetching: true,
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
    fetchRegistry: function (){
      Vue.http.get('https://848e4cc2.us-south.apigw.appdomain.cloud/registry').then(response => {

        this.registry = response.body.registry;
        console.log(this.registry);

        this.isFetching = false;

      }, response => {
        this.isFetching = false;
      });
    }
  },
  mounted: function(){
    this.fetchRegistry();
  }
})