VIEWS=$(dirname "$0")

curl -X PUT "http://127.0.0.1:7958/public_drugstracker/_design/drugs" \
  --upload-file $VIEWS/drug_all.js

curl -X PUT "http://127.0.0.1:8558/public_drugstracker/_design/drugs" \
  --upload-file $VIEWS/drug_all.js
