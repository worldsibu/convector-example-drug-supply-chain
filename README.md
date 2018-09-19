# Drug Supply Chain Integrity

The current mono-repo is a simple project to showcase the ease and power of [Convector](https://worldsibu.io/convector) by creating a basic Drug Supply Chain fullstack application example.

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

Install dependencies:
```bash
npm i
```

Build the chaincode (running `npm i` already did this for you):
```bash
lerna run client:generate --scope @worldsibu/convector-example-dsc-chaincodes
lerna run build --scope @worldsibu/convector-example-dsc-cc-drug
```

Wake up the environment and install the components.

```bash
# Start the development blockchain
npm run env:restart
# Install the chaincode
npm run cc:start 1.0
```

Or run `npm run restart` to do it all for you!

Install the required compiled view 
```bash
npm run vw:install
```

Run the project

```bash
# Start the server
lerna run start:dev --scope @worldsibu/convector-example-dsc-server --stream
# Start the ui project
lerna run start --scope @worldsibu/convector-example-dsc-ui --stream
```

Go to `localhost:4200` and use the application!

Since the "user" running the server is a blockchain identity coming from a certificate, to make it easy to switch between users you can use the scripts:

```
# Start the server as the first user of the org 1
lerna run start:org1:user1 --scope @worldsibu/convector-example-dsc-server --stream
# Start the server as the second user of the org 1
lerna run start:org1:user2 --scope @worldsibu/convector-example-dsc-server --stream
# Start the server as the third user of the org 1
lerna run start:org1:user3 --scope @worldsibu/convector-example-dsc-server --stream
# Start the server as the first user of the org 2
lerna run start:org2:user1 --scope @worldsibu/convector-example-dsc-server --stream
# Start the server as the second user of the org 2
lerna run start:org2:user2 --scope @worldsibu/convector-example-dsc-server --stream
# Start the server as the third user of the org 2
lerna run start:org2:user3 --scope @worldsibu/convector-example-dsc-server --stream
```


#### In case the server gives errors regarding 

It's due to Babel's latest update. Temporarily there are no much solutions, but running this will fix the server for now (took from [here](https://forums.meteor.com/t/error-cannot-find-module-babel-runtime-helpers-builtin-interoprequiredefault/44944/4)):

```
mkdir $(pwd)/node_modules/@babel/runtime/helpers/builtin

cp $(pwd)/node_modules/@babel/runtime/helpers/* $(pwd)/node_modules/@babel/runtime/helpers/builtin/
```
