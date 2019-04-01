hurl invoke drug participant_register "aa001" "Global Distribution" -u user1 -o org1
wait
hurl invoke drug participant_register "aa002" "The great Transportist" -u user2 -o org1
wait
hurl invoke drug participant_register "aa003" "Hitting Logistics" -u user3 -o org1
wait
hurl invoke drug participant_register "aa004" "Drugstore Everywhere" -u user1 -o org2
wait
hurl invoke drug participant_register "aa005" "The Good Doctor" -u user2 -o org2
wait
hurl invoke drug participant_register "aa006" "Metro Hospital" -u user3 -o org2
wait

echo "Seed provisioned"
