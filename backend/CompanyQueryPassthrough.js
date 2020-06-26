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
        searchQuery = ""
    }
    
    return {
        "dbname": "sda",
        "username": "",
        "password": "",
        "query": {
           "selector": {
              "PERMTICK": {
                 "$regex": searchQuery
              }
           },
           "fields": [
              "PERMTICK",
              "COMNAM"
           ],
           "sort": [
              {
                 "PERMTICK": "asc"
              }
           ],
           "limit": 1000
        }
    };
}