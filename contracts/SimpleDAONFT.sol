/ SPDX-License-Identifier: MIT
pragma solidity ^8.6.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract SimplDAONFT is ERC721Storage{
    constructor() ERC721Storage("SimplDAO","SDAO"){

    }

    using Counters for Counters.Counter;
    Counters.Counter private _itemId;

    function createNFT(address member, string memory tokenURI) public return(uint){
        uint _newItem = _itemId.current();
        _mint(member, tokenURI);
        _setTokenURI(_newItem, tokenURI);
        _itemId.increment();
        return _newItem;
    }
}
