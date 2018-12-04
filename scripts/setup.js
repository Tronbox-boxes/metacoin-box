var fs = require('fs')
var path = require('path')

const address = process.argv[2]
    .split('MetaCoin:')[1]
    .split('(hex) ')[1]
    .split('\n')[0]

console.log('The app has been configured.')
console.log('Run "npm run dev" to start it.')

fs.writeFileSync(path.resolve(__dirname, '../src/js/metacoin-config.js'),`var metacoinConfig = {"address":"${address}"}`)
