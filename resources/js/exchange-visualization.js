var app = new Vue({
  el: '#app',
  data: {
    showResults: false,
    isFetching: false,
    trades: [],
    selectedExch: '',
    exchanges: {
      "NYSE MKT": "A",
      "NASDAQ OMX BX": "B",
      "National": "C",
      "FINRA": "D",
      "International Securities": "I",
      "Direct Edge A": "J",
      "Direct Edge X": "K",
      "Chicago": "M",
      "New York": "N",
      "NASDAQ OMX": "T",
      "NYSE Arca SM": "P",
      "Consolidated Tape System": "S",
      "NASDAQ": "T",
      "NASDAQ": "Q",
      "CBOE": "W",
      "NASDAQ OMX PSX": "X",
      "BATS Y": "Y",
      "BATS":  "Z"
    },
    chart: ''
  },
  methods:{
    queryExchange: function (){
      this.isFetching = true;

      if (this.chart != '') {
        this.chart.destroy();
      }

      Vue.http.post('https://848e4cc2.us-south.apigw.appdomain.cloud/exchangequery/query', {"searchQuery": this.exchanges[this.selectedExch]}).then(response => {
        
        this.trades = response.body.entries.reverse();

        var data1 = [];
        var data2 = [];

        for(let i =  0; i < this.trades.length ; i++)
        {
          data1[i] = this.trades[i].Price;
          data2[i] = (this.trades[i]["Time"]/60000).toFixed(2);
        }

        var ctx = document.getElementById('exchangeVisualizationChart');
        this.chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: data2,
            datasets: [{
              label: this.selectedExch,
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