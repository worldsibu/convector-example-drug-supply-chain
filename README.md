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
```
npm i
```

Run the project

```
lerna run start --stream
```
