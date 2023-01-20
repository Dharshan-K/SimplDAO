// SPDX-License-Identifier:MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract SimplNFT is ERC20{
    address public immutable owner;

    constructor() ERC20("SimplDAO","SDAO"){
        owner = msg.sender;
    }

    function mint(uint256 supply) public{
        _mint(msg.sender,supply* 10**18);
    }

}