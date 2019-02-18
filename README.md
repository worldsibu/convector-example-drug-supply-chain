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

## Run the project

### Install dependencies

First rename `./@worldsibu/server/.env-default` to `./@worldsibu/server/.env` and change `KEYSTORE` and `NETWORKPROFILE` vars with your $HOME path accordingly. If you don't know where it is run `echo $HOME`

```bash
npm i
node ./update-paths.js
```

### Build the chaincodes

Build the chaincode (running `npm i` already did this for you) but if you make changes in your chaincodes, be sure to run this again:

```bash
npx lerna run build --scope @worldsibu/convector-example-dsc-cc-drug
npx lerna run build --scope @worldsibu/convector-example-dsc-cc-participant
```

### Run the example

Wake up the environment and install the components.

```bash
# Start the development blockchain and install chaincodes
# A expected error will be shown since the script will try to make a first call
# to start the chaincode containers.
npm run restart
```

Run the project (Servers will auto-enroll with the participant chaincode).

```bash
# Start the server
npx lerna run start:dev --scope @worldsibu/convector-example-dsc-server --stream
# Start the ui project
npx lerna run start --scope @worldsibu/convector-example-dsc-ui --stream
```

Go to `localhost:4200` and use the application!

Since the "user" running the server is a blockchain identity coming from a certificate, to make it easy to switch between users you can use the scripts:

## Multiple users (transfer and other functions)

To have multiple users registered in the network you need to start the server per each user that will be available with these example scripts 👇

### What happens

A new server will start but it will use a **different identity** to communicate with the blockchain network. Beware that the server always talks with 10010 port therefore, the same front end will be used but it will call a different instance of the server source code. 

### Run them

```bash
# Start the server as the first user of the org 1
npx lerna run start:org1:user2 --scope @worldsibu/convector-example-dsc-server --stream
# Start the server as the second user of the org 1
npx lerna run start:org1:user3 --scope @worldsibu/convector-example-dsc-server --stream
```

## Behaviour

* When you create a **drug**, the owner will be set to the current identity of the server.
* If you transfer a drug you won't be able to transfer it again with the same identity.
