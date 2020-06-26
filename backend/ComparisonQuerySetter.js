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
        "username": "",
        "password": "",
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
