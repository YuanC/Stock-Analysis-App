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

      setTimeout(() => {
        Vue.http.get('/').then(response => {

          // TODO: Fill out the table
          var ctx = document.getElementById('exchangeVisualizationChart');
          var chart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
              datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
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
      }, 500);
    }
  }
})