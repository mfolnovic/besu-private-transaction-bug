pragma solidity >=0.7.6;

import "./SimpleStorage.sol";

contract SimpleStorageFactory {
    event Created(address _addr);
    event Count(uint _count);

    constructor() {
    }

    function create() public {
        SimpleStorage _contract = new SimpleStorage(0);
        emit Created(address(_contract));
    }

    function count() public {
        emit Count(123);
    }
}