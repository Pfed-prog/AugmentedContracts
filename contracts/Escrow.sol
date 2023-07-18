// SPDX-License-Identifier: UNLICENSED
pragma solidity =0.8.9;

// connect to Dispenser

// Connect to Factory

contract Escrow {
    address payable public admin;

    constructor(address _router) payable {
        admin = _router;
    }

    function distribute(address to, uint amount) public {
        require(msg.sender == admin, "You aren't the owner");

        // add batch transfer

        //emit Distribution(to, amount, block.timestamp);
    }

function multisendToken(address token, address[] _contributors, uint256[] _balances) public hasFee payable {
    require(msg.sender == admin, "You aren't the owner");

    uint lengthContributors = _contributors.length
    require(lengthContributors <= arrayLimit());
    uint256 total;
    ERC20 erc20token = ERC20(token);
    for (uint i; i <  lengthContributors; i++) {
        erc20token.transferFrom(msg.sender, _contributors[i], _balances[i]);
        total += _balances[i];
    }
    // setTxCount(msg.sender, txCount(msg.sender).add(1));
    Multisended(total, token);
}

}
