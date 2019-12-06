var fs = require('fs')
var path = require('path')
var MetaCoin = require('../build/contracts/MetaCoin')
var TronWeb = require('tronweb')

const address = MetaCoin.networks['1'].address

console.log('The app has been configured.')
console.log('Run "npm run dev" to start it.')

const tronboxJs = require('../tronbox').networks.mainnet
const metacoinConfig = {
  contractAddress: address,
  fullHost: tronboxJs.fullHost,
  ownerAddress: TronWeb.address.fromPrivateKey(process.env.PRIVATE_KEY_MAINNET)
}

fs.writeFileSync(path.resolve(__dirname, '../src/js/metacoin-config.js'),`var metacoinConfig = ${JSON.stringify(metacoinConfig, null, 2)}`)


