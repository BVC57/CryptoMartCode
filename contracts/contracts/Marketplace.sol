// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @notice Simple marketplace stub: seller registers an item id with price, buyer pays and contract emits event.
/// This is intentionally minimal. For production audit is REQUIRED.
contract Marketplace {
    struct Listing { address seller; uint256 priceWei; bool sold; }
    mapping(uint256 => Listing) public listings;

    event Listed(uint256 indexed id, address indexed seller, uint256 priceWei);
    event Purchased(uint256 indexed id, address indexed buyer, uint256 priceWei);

    function listItem(uint256 id) external payable {
        require(listings[id].seller == address(0), "exists");
        listings[id] = Listing(msg.sender, msg.value, false);
        emit Listed(id, msg.sender, msg.value);
    }

    function buy(uint256 id) external payable {
        Listing storage l = listings[id];
        require(l.seller != address(0) && !l.sold, "invalid");
        require(msg.value == l.priceWei, "wrong price");
        l.sold = true;
        payable(l.seller).transfer(msg.value);
        emit Purchased(id, msg.sender, msg.value);
    }
}
