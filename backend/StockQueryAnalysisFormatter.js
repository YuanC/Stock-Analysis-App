/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */
function main(params) {
    
	var trades = params.docs;
	
	var max = 0;
	var min = -1;
	var sum = 0;
	var cnt = 0;
	
	trades.forEach(trade => {
	    var price = parseInt(trade.Price);
	    if (min === -1) {
	        min = price;
	    } else if (price < min) {
	        min = price;
	    }
	    
	    if (price > max){
	        max = price; 
	    }
	    
	    sum = sum + price;
	    cnt = cnt + 1;
	});
	
	return {
	    "entries": {
	        "sum": sum,
	        "cnt": cnt,
	        "max": max,
	        "min": min
	    }
	}
}
