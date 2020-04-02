var app = new Vue({
  el: '#app',
  data: {
    companyName1: '',
    companyName2: '',
    showResults: false,
    isFetching: false,
    prices: [],
    company1: [],
    company2: []
  },
  methods:{
    queryComparison: function (){
      this.isFetching = true;

      Vue.http.post('https://848e4cc2.us-south.apigw.appdomain.cloud/stockquery/query', {"searchQuery": this.companyName1}).then(response => {
        this.company1 = response.body.entries;
        console.log(this.company1);

        Vue.http.post('https://848e4cc2.us-south.apigw.appdomain.cloud/stockquery/query', {"searchQuery": this.companyName2}).then(response => {
          this.company2 = response.body.entries;

          var data1 = [];
          var data2 = [];
          var data3 = [];
          for(i = this.company1.length - 1; i >= 0 ; i--)
          {
            data1[i] = this.company1[i].Price/1000;
            data2[i] = this.company2[i].Price/1000;
            data3[i] = (this.company1[i]["Time"]/3600000).toFixed(1);
          }

          var ctx = document.getElementById('lineChart');
          var chart = new Chart(ctx, {
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
    }
  }
})