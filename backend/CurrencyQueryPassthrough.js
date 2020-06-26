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
        "dbname": "sda-currency",
        "username": "",
        "password": "",
        "query": {
            "selector": {
                "_id": {
                    "$gt": "0"
                }
            },
            "fields": [
                "CurrencyRate",
                "Country"
            ],
            "sort": [
                {
                    "_id": "asc"
                }
            ]
        }
    };
}