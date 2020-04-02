var app = new Vue({
  el: '#app',
  data: {
    companyName1: '',
    companyName2: '',
    showResults: false,
    isFetching: false,
  },
  methods:{
    queryComparison: function (){
      this.isFetching = true;

      setTimeout(() => {
        Vue.http.get('/').then(response => {
          var ctx = document.getElementById('lineChart');
          var chart = new Chart(ctx, {
              type: 'line',
              data: {
                  datasets: [{
                      label: 'Company 1 Dataset',
                      data: [10, 20, 30, 40],
                      // this dataset is drawn below
                      order: 1,
                      backgroundColor: 'rgba(255, 159, 64, 0.2)',
                      borderColor: 'rgba(255, 159, 64, 1)'
                  }, {
                      label: 'Company 2 Dataset',
                      data: [15, 10, 20, 12],
                      type: 'line',
                      // this dataset is drawn on top
                      order: 2,
                      backgroundColor: 'rgba(75, 192, 192, 0.2)',
                      borderColor: 'rgba(75, 192, 192, 1)'
                  }],
                  labels: ['January', 'February', 'March', 'April']
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
      }, 500);
    }
  }
})