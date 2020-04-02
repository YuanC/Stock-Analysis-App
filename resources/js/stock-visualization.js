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

      Vue.http.post('https://848e4cc2.us-south.apigw.appdomain.cloud/stockquery/query', {"searchQuery": this.stockName}).then(response => {
          // TODO: Fill out the table

          console.log(response.body.entries);

          this.trades = response.body.entries;

          var data1 = [];
          var data2 = []
          for(i = 0; i < this.trades.length; i++)
          {
            data1[i] = this.trades[i].Price;
            data2[i] = i;
          }


          var ctx = document.getElementById('stockVisualizationChart');
          var chart = new Chart(ctx, {
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
    }
  }
})