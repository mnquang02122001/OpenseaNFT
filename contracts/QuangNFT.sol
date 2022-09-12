// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract QuangNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private currentTokenId;

    constructor(string memory name, string memory symbol)
        ERC721(name, symbol)
    {}

    function mintTo(address recipient, string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        currentTokenId.increment();
        uint256 newItemId = currentTokenId.current();
        _safeMint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }
}
