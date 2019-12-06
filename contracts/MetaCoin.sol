pragma solidity ^0.5.4;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts.

contract MetaCoin {
  mapping(address => uint) balances;

  event Transfer(address _from, address _to, uint256 _value);

  address owner;

  constructor(uint initialBalance) public {
    owner = msg.sender;
    balances[owner] = initialBalance;
  }

  function sendCoin(address receiver, uint amount) public returns (bool sufficient) {
    if (balances[owner] < amount) return false;
    balances[owner] -= amount;
    balances[receiver] += amount;
    emit Transfer(owner, receiver, amount);
    return true;
  }

  function getBalanceInEth(address addr) public view returns (uint){

    return ConvertLib.convert(getBalance(addr), 2);
  }

  function getBalance(address addr) public view returns (uint) {
    return balances[addr];
  }

  function getOwner() public view returns (address) {
    return owner;
  }
}
