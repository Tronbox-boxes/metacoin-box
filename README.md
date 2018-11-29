# MetaCoin TronBox

MetaCoin example TronBox project. Originally forked from [truffle-box/metacoin](https://github.com/truffle-box/metacoin-box).



### Configure Network Information

Network configuration is generally divided into development environment (development) and online formal production (production), but other test network environments can be added.
In this example we use TronGrid, a test server which is reset daily, as the development environent, and the Trondev docker container, for a private network:

```
module.exports = {
  networks: {
    testnet: {
      from: 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY',
      privateKey: 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0',
      consume_user_resource_percent: 30,
      fee_limit: 100000000,
      fullNode: "https://api.shasta.trongrid.io",
      solidityNode: "https://api.shasta.trongrid.io",
      eventServer: "https://api.shasta.trongrid.io",
      network_id: "*" // Match any network id
    },
    development: {
      from: 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY',
      privateKey: 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0',
      consume_user_resource_percent: 30,
      fee_limit: 100000000,
      fullNode: "http://127.0.0.1:8090",
      solidityNode: "http://127.0.0.1:8091",
      eventServer: "http://127.0.0.1:8092",
      network_id: "*"
    }
  }
};
```

Below describes the meaning of each parameter in the network configuration:<br>

**from**: Primary account address for contract deployment (base58)<br>
**privateKey**: Private key corresponding to the contract deployment master account<br>
**consume_user_resource_percent**: Parameters for deployment; can use default settings<br>
**fee_limit**: Parameters for deployment; can use default settings<br>
**fullNode**: The URL of a Tron full node. In the example, the url refers to a test environment which is reset daily.<br>
**solidityNode**: The URL of solidity node synced with the full node above.<br>
**eventServer**: The URL of the contract deployment destination event monitoring service (Need to be on same IP as the API server, otherwise the event callback cannot be monitored. For example, the API service address is http://127.0.0.1:8090, then the event listener service address is http://127.0.0.1:****)<br>
**network_id**: Can use default settings<br>

If you use TronBox >= 2.1.9, you can set `fullHost` instead of fullNode, solidityNode and eventServer, if they point to the same server.

### TronBox commands
```
tronbox compile
tronbox migrate
tronbox test
```

### Run the example Dapp
First off, install the dependencies
```
npm install
```

To work properly, the Dapp needs to know the address where the MetaCoin contract has been deployed. You can set it manually in the code, but the easy way is to run:

```
npm run migrate
```
It will execute the migration, retrieve the contract address and save it in the file `src/js/metacoin-config.js`


### Run the Dapp
```
npm run dev
```
It automatically will open the Dapp in the default browser.


### Using a private network docker container

`tronbox migrate` by default will use the `development` network. If you like to use your private network, first you need to run the Trondev container:
```
docker run -d -p 8091:8091 -p 8092:8092 -p 8090:8090 --rm --name tron trontools/quickstart
```
verify that it is running, and nodes and event server are listening:
```
wget -qO- http://127.0.0.1:8090/wallet/getnowblock
wget -qO- http://127.0.0.1:8091/walletsolidity/getnowblock
wget -qO- http://127.0.0.1:8092/healthcheck
```

If you are using TronBox >= 2.1.9 and trontools/quickstart >= 1.1.16, you can set a `fullHost` in tronbox.js and run quickstart as
```
docker run -d -p 9090:9090 --rm --name tron trontools/quickstart
```
verify that it is running, and nodes and event server are listening:
```
wget -qO- http://127.0.0.1:9090/wallet/getnowblock
wget -qO- http://127.0.0.1:9090/walletsolidity/getnowblock
wget -qO- http://127.0.0.1:9090/healthcheck
```


If the three requests above are successful, you can migrate to the private network with:
```
tronbox migrate --reset --network tronQuickstart
```
or testing with
```
tronbox test --network tronQuickstart
```

### Enjoy your working Tron Dapp!



