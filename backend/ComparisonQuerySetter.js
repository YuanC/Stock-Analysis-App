/**
  *
  * main() 将在调用此操作时运行
  *
  * @param Cloud Functions 操作接受单个参数，该参数必须为 JSON 对象。
  *
  * @return 此操作的输出，必须为 JSON 对象。
  *
  */
function main(params) {
    
    var searchQuery = params.searchQuery;
    
    if (!searchQuery){
        searchQuery = ""
    }
    
    return {
        "dbname": "sda-trades",
        "username": "e7241180-05e4-4ab8-8f36-8a1e4c6bb1fe-bluemix",
        "password": "f62d2cf4622f818829ef44112311d749ad2399d1fdfc845c74286c203872b933",
        "query": {
            "selector": {
                "Company": {
                    "$eq": searchQuery
                }
            },
            "fields": [
                "Company",
                "Time",
                "Date",
                "Price"
            ],
            "sort": [
                {
                    "Date": "asc"
                },
                {
                    "Time": "asc"
                }
            ],
            "limit": 500
        }
    };
}
