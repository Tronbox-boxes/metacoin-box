const HttpProvider = TronWeb.providers.HttpProvider;

const fullNode = new HttpProvider('https://api.trongrid.io:8090');
const solidityNode = new HttpProvider('https://api.trongrid.io:8091');
const eventServer = 'https://api.trongrid.io/';
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
}


App = {
  tronWebProvider: null,
  contracts: {},
  accounts: [
    "TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY",
    "TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9"
  ],
  contractAddress: contractAddress,
  privateKey: "da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0",
  fee_limit: 100000000,
  call_value: 0,
  abi: [
    {
      "inputs": [],
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
    }
  ],
  init: function () {
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
      fee_limit: that.fee_limit,
      call_value: that.call_value || 0,
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
      App.init();
    } else {
      alert("Please, run \n\n    npm run migrate\n\nto execute the migration to trongrid, and automatically configure this example.\nWhen done, reload this page.")
    }
  });
});
