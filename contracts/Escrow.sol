// SPDX-License-Identifier: UNLICENSED
pragma solidity =0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// connect to Dispenser, Factory

contract Escrow {
    address payable public admin;

    constructor(address _router) payable {
        admin = _router;
    }

function multisendToken(address token, address[] _contributors, uint256[] _balances) public hasFee payable {
    require(msg.sender == admin, "You aren't the owner");
    uint total;
    uint lengthContributors = _contributors.length
    // change to template
    ERC20 erc20token = ERC20(token);
    for (uint i; i!=lengthContributors; ) {
        erc20token.transferFrom(msg.sender, _contributors[i], _balances[i]);
        total += _balances[i];
        unchecked{++i;}
    }
    MultiSended(total, token);
    }

}
