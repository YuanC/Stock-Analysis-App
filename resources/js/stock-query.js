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

        this.trades = response.body.entries;
        console.log(this.trades);
        this.isFetching = false;
        this.showResults = true;

      }, response => {
        this.isFetching = false;
        this.showResults = true;
      });
    }
  },
  filters: {
    msToTime: function(s){
      function pad(n, z) {
        z = z || 2;
        return ('00' + n).slice(-z);
      }
      var ms = s % 1000;
      s = (s - ms) / 1000;
      var secs = s % 60;
      s = (s - secs) / 60;
      var mins = s % 60;
      var hrs = (s - mins) / 60;

      return pad(hrs) + ':' + pad(mins) + ':' + pad(secs);
    },
    dateFormat: function(s){
      return s.substring(0,4) + "/" + s.substring(4,6) + "/" + s.substring(6)
    },
    symbolToExchange: function(exch){
      var exchanges = {
        "A": "NYSE MKT",
        "B": "NASDAQ OMX BX",
        "C": "National",
        "D": "FINRA",
        "I": "International Securities",
        "J": "Direct Edge A",
        "K": "Direct Edge X",
        "M": "Chicago",
        "N": "New York",
        "T": "NASDAQ OMX",
        "P": "NYSE Arca SM",
        "S": "Consolidated Tape System",
        "T": "NASDAQ",
        "Q": "NASDAQ",
        "W": "CBOE",
        "X": "NASDAQ OMX PSX",
        "Y": "BATS Y",
        "Z": "BATS"
      }

      if (exch && exchanges.hasOwnProperty(exch)){
        return exchanges[exch];
      }
      return '';
    },
    boolToYesNo: function(b){
      if (b === "0" || b === 0 ){
        return "No";
      }
      return "Yes";
    }
  }
})