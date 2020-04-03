var app = new Vue({
  el: '#app',
  data: {
    stockName: '',
    showResults: false,
    isFetching: false,
    trades: [],
    chart: '',
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
      this.trades = [];
      
      if (this.chart != '') {
        this.chart.destroy();
      }

      Vue.http.post('https://848e4cc2.us-south.apigw.appdomain.cloud/stockquery/query', {"searchQuery": this.stockName}).then(response => {
          // TODO: Fill out the table

          console.log(response.body.entries);

          this.trades = response.body.entries.reverse();

          var data1 = [];
          var data2 = [];

          for(let i =  0; i < this.trades.length ; i++)
          {
            data1[i] = this.trades[i].Price/1000;
            data2[i] = (this.trades[i]["Time"]/60000).toFixed(2);
          }

          var ctx = document.getElementById('stockVisualizationChart');
          this.chart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: data2,
              datasets: [{
                label: this.trades[0].Company,
                data: data1,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
              }]
            },
            responsive: true
        });
        this.isFetching = false;
        this.showResults = true;

      }, response => {
        this.isFetching = false;
        this.showResults = true;
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