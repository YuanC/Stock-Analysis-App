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
	return { 
	    registry: {
	        "stock-query": true,
	        "company": true,
	        "flag-suspects": true,
	        "stock-analysis": true,
	        "stock-visualization": true,
	        "exchange-visualization": true,
	        "comparison": true,
	        "currency": true
	    }
	};
}
