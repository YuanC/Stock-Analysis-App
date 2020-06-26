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
    
    var searchQuery = params.searchQuery;
    
    if (!searchQuery){
        searchQuery = "";
    }
    
    var limit = params.limit;
    
    if (!limit){
        limit = 500;
    }
    
    return {
        "dbname": "sda-trades",
        "username": "",
        "password": "",
        "query": {
            "selector": {
                "Company": searchQuery
            },
            "fields": [
                "Company",
                "Time",
                "Date",
                "Price",
                "Size",
                "Exchange",
                "Sale Condition",
                "Suspicious"
            ],
            "sort": [
                {
                    "Date": "desc"
                },
                {
                    "Time": "desc"
                }
            ],
            "limit": limit
        }
    };
}