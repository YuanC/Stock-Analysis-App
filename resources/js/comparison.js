var app = new Vue({
  el: '#app',
  data: {
    companyName1: '',
    companyName2: '',
    showResults: false,
    isFetching: false,
    prices: [],
    company1: [],
    company2: [],
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
    queryComparison: function (){
      this.isFetching = true;
      
      if (this.chart != '') {
        this.chart.destroy();
      }

      Vue.http.post('https://848e4cc2.us-south.apigw.appdomain.cloud/stockquery/query', {"searchQuery": this.companyName1}).then(response => {
        this.company1 = response.body.entries.reverse();
        console.log(this.company1);

        Vue.http.post('https://848e4cc2.us-south.apigw.appdomain.cloud/stockquery/query', {"searchQuery": this.companyName2}).then(response => {
          this.company2 = response.body.entries.reverse();

          var data1 = [];
          var data2 = [];
          var data3 = [];
          for(let i = 0; i < this.company1.length ; i++)
          {
            data1[i] = this.company1[i].Price/1000;
            data2[i] = this.company2[i].Price/1000;
            data3[i] = (this.company1[i]["Time"]/60000).toFixed(2);
          }

          var ctx = document.getElementById('lineChart');
          this.chart = new Chart(ctx, {
            type: 'line',
            data: {
              datasets: [{
                label: this.company1[0].Company,
                data: data1,
                // this dataset is drawn below
                order: 1,
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)'
              }, {
                label: this.company2[0].Company,
                data: data2,
                type: 'line',
                // this dataset is drawn on top
                order: 2,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)'
              }],
              labels: data3,
            },
            options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                  }
                }]
              }
            },
            responsive: true
          });
          this.isFetching = false;
          this.showResults = true;

        }, response => {
          this.isFetching = false;
          this.showResults = true;
        });
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