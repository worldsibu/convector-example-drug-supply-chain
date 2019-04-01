# Drug Supply Chain Integrity

The current mono-repo is a simple project to showcase the ease and power of [Convector](https://worldsibu.tech/convector) by creating a basic Drug Supply Chain fullstack application example.

Some of the challenges on the field are:

* Public health risks due to counterfeit or diluted drugs.
* Complex value chains.
* Speed.
* Global distribution and manufacturing.

A somewhat typical value chain in this industry looks like:
![http://www.rmtminc.com/wp-content/uploads/2015/07/pharm_supply_chain-3.jpg](http://www.rmtminc.com/wp-content/uploads/2015/07/pharm_supply_chain-3.jpg)

Took from: http://www.rmtminc.com/page/product-solutions/supply-chain-integrity.html

A few high level reasons on why Blockchain may help here, are the following (for a real application, further analysis is required):

* Who keeps the data?
* How to certify each participant's information.
* How to assure integrity and durability of the data.
* How to make it cost-effective.
* Public health data should be public?

The end result:

* You get a drug at the hospital or any drug store and are able to trace it back through the whole value chain. Sort of like tokenizing the drugs through a value chain.

## Tech Stack

### Development

* Lerna
* Docker

### Blockchain

* NodeJS
  * Convector

### Back end

* NodeJS
  * ExpressJS
  * Convector

### Front end

* Angular 7
  * Vanilla CSS
  * Convector
  * Mobx

## Run the project

### Install dependencies

```bash
npm i
node ./update-paths.js
```

### Run the example

Wake up the environment and install the components.

```bash
# Start the development blockchain and install chaincodes
# *An expected error will be shown* since the script will try to make a first call
# to start the chaincode containers.
npm run start

# Seed some participants in the Blockchain
npm run seed
```

Run the project (Servers will auto-enroll with the participant chaincode).

```bash
# Start the server
npx lerna run start:dev --scope @worldsibu/convector-example-dsc-server --stream
# Start the ui project
npx lerna run start --scope @worldsibu/convector-example-dsc-ui --stream
```

Go to `localhost:4200` and use the application!

Access the CouchDB here: http://localhost:5084/_utils/#database/ch1_drug/_all_docs

## Multiple users (transfer and other functions)

To have multiple users registered in the network you need to start the server with each user (certificate/wallet) that will be available with these example scripts 👇

### What happens

A new server will start but it will use a **different identity** to communicate with the blockchain network. Beware that the server always talks with 10010 port **therefore** the same front end will be used but it will call a different instance of the server source code.

### Run as other user

The options available are:

```json
[
  {
    "certId": "user1",
    "certOrg": "org1",
    "id": "aa001"
  },
  {
    "certId": "user2",
    "certOrg": "org1",
    "id": "aa002"
  },
  {
    "certId": "user3",
    "certOrg": "org1",
    "id": "aa003"
  },
  {
    "certId": "user1",
    "certOrg": "org2",
    "id": "aa004"
  },
  {
    "certId": "user2",
    "certOrg": "org2",
    "id": "aa005"
  },
  {
    "certId": "user3",
    "certOrg": "org2",
    "id": "aa006"
  },
]
```

Run the server:

```bash
# Stop the current server and run
# Start the server as the second user "aa002"
IDENTITY=aa002 npx lerna run start:dev --scope @worldsibu/convector-example-dsc-server --stream

# Stop the current server and run
# Start the server as the second user "aa003"
IDENTITY=aa003 npx lerna run start:dev --scope @worldsibu/convector-example-dsc-server --stream
```

## Logic of this example

* When you create a **drug**, the owner will be set to the current identity of the server.
* If you transfer a drug you won't be able to transfer it again with the same identity (as it will change ownership).
* When a transfer happens, the target's transport needs to be associated to the target identity of the transfer (or it will throw an error).

### Smart contract Container logs - Debugging

1. Do `docker ps` in your terminal.
2. Find the container named `docker logs -f dev-peer0.org2.hurley.lab-drug-1.0` (or if you upgraded the version at the end may vary).
