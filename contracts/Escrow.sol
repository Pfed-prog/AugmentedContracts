// SPDX-License-Identifier: UNLICENSED
pragma solidity =0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// connect to Dispenser, Factory

contract Escrow is ReentrancyGuard {
    address public admin;
    uint internal locked;

    event MultiSended(uint _total, address _token);

    constructor(address _router) {
        admin = _router;
    }

function multisendToken(address token, address[] calldata _contributors, uint256[] calldata _balances) public payable {
    require(msg.sender == admin, "You aren't the owner");
    uint total;
    uint lengthContributors = _contributors.length;
    // change to template
    ERC20 erc20token = ERC20(token);
    for (uint i; i!=lengthContributors; ) {
        erc20token.transferFrom(msg.sender, _contributors[i], _balances[i]);
        total += _balances[i];
        unchecked{++i;}
    }
    emit MultiSended(total, token);
    }

}
