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
        "username": "e7241180-05e4-4ab8-8f36-8a1e4c6bb1fe-bluemix",
        "password": "f62d2cf4622f818829ef44112311d749ad2399d1fdfc845c74286c203872b933",
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