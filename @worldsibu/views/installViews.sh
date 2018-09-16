VIEWS=$(dirname "$0")

curl -X PUT "http://127.0.0.1:6984/ch1_drug/_design/drugs" \
  --upload-file $VIEWS/drug_all.js
curl -X PUT "http://127.0.0.1:6984/ch1_drug/_design/participants" \
  --upload-file $VIEWS/participant_all.js

curl -X PUT "http://127.0.0.1:5984/ch1_drug/_design/drugs" \
  --upload-file $VIEWS/drug_all.js
curl -X PUT "http://127.0.0.1:5984/ch1_drug/_design/participants" \
  --upload-file $VIEWS/participant_all.js
