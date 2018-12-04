const fullNode = 'http://127.0.0.1:8090';
const solidityNode = 'http://127.0.0.1:8091';
const eventServer = 'http://127.0.0.1:8092';
const privateKey = 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0';

var tronWeb = new TronWeb(
    fullNode,
    solidityNode,
    eventServer,
    privateKey
)

let contractAddress

try {
  contractAddress = metacoinConfig.address
} catch (err) {
  alert('The app looks not configured. Please run `npm run migrate`')
}


App = {
  tronWebProvider: null,
  contracts: {},
  accounts: [],
  contractAddress: contractAddress,
  privateKey: "da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0",
  feeLimit: 100000000,
  callValue: 0,
  abi: [
    {
      "inputs": [
        {
          "name": "initialBalance",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "s",
          "type": "string"
        }
      ],
      "name": "Log",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "receiver",
          "type": "address"
        },
        {
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "sendCoin",
      "outputs": [
        {
          "name": "sufficient",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "getBalanceInEth",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "getBalance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getOwner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ],
  init: function (accounts) {

    for (let i = 0; i < 2; i++) {
      this.accounts.push(
          tronWeb.address.fromPrivateKey(
              accounts.privateKeys[i]
          ))
    }

    this.initData();
    this.bindEvents();
  },

  initData: function () {
    var c = 0

    function reset() {
      c++;
      if (c == 2) {
        $("#loading").css({display: 'none'});
        $("#commit").attr('disabled', null);
      }
    }

    this.triggerContract('getBalance', [this.accounts[0]], function (data) {
      $("#dev_old_a").html(data.toNumber());
      reset();
    });

    this.triggerContract('getBalance', [this.accounts[1]], function (data) {
      $("#dev_old_b").html(data.toNumber());
      reset();
    });
  },

  transfer: function () {
    var that = this;
    var count = $("#dev_count").val();
    const to = this.accounts[1];
    const amount = parseInt(count);
    $("#loading").css({display: 'block'});
    $("#dev_count").val('')
    $("#commit").attr('disabled', 'disabled')
    this.triggerContract('sendCoin', [to, amount], function () {
      that.initData();

    });
  },
  getContract: function (address, callback) {
    tronWeb.getContract(address).then(function (res) {
      callback && callback(res);
    });
  },
  triggerContract: function (methodName, args, callback) {
    var that = this;
    let myContract = tronWeb.contract(this.abi, that.contractAddress);

    var callSend = 'send'
    this.abi.forEach(function (val) {
      if (val.name === methodName) {
        callSend = /payable/.test(val.stateMutability) ? 'send' : 'call'
      }
    })

    myContract[methodName](...args)[callSend]({
      feeLimit: that.feeLimit,
      callValue: that.callValue || 0,
    }).then(function (res) {
      if (res) {
        callback && callback(res);
      }
    })
  },

  initTronWeb: function () {
    /*
     * Replace me...
     */

    return this.initContract();
  },

  initContract: function () {
    /*
     * Replace me...
     */

    return this.bindEvents();
  },

  bindEvents: function () {
    var that = this;
    $(document).on('click', '#commit', function () {
      that.transfer();
    });
  },

  markAdopted: function (adopters, account) {
    /*
     * Replace me...
     */
  },

  handleAdopt: function (event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
  }

};

$(function () {
  $(window).load(function () {
    if (contractAddress) {
      $.getJSON(fullNode + '/admin/accounts-json', function (data) {
        console.log(data)
        App.init(data);
      })
    } else {
      alert("Please, run \n\n    npm run migrate\n\nto execute the migration to trongrid, and automatically configure this example.\nWhen done, reload this page.")
    }
  });
});
