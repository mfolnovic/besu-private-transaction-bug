# Besu Private Transaction Bug

I've created a simple contract https://github.com/mfolnovic/besu-private-transaction-bug/blob/main/contracts/SimpleStorageFactory.sol that has two methods:

1. `create` - creates an instance of https://github.com/mfolnovic/besu-private-transaction-bug/blob/main/contracts/SimpleStorage.sol
2. `count` - just emits event with constant 123 (to check that private transactions works)

## Prerequisites
- truffle
- postman

## Setup network

- `npx quorum-dev-quickstart@latest --clientType besu --privacy true --outputPath quorum-test-network`
- `cd quorum-test-network`
- `git apply ../besu-private-transaction-bug/quorum-test-network.patch`
- `./run.sh`

There's a small patch that makes ethsigner use member1besu instead of rpcnode, so that we can use `eea_sendTransaction` through node that has privacy enabled.

## Setup postman

- import [collection](https://github.com/mfolnovic/besu-private-transaction-bug/blob/dc034464da4da072239ba27a8c7e907a5d390ddb/postman/Besu%20Private%20Transaction%20Bug.postman_collection.json) to Postman

## Deploy contract

- inside `besu-private-transaction-bug`, run `truffle migrate --reset -f 1`
- if necessary, update contract address (from truffle output) in postman collection, variable contract_addr (if it's 0x51A21A51aa59B0b4BF99Ea7a79c7293d601FF689, it's already set up)
- check other postman variables (`from_addr` is address that was setup in ethsigner, `member1_public_key` and `member2_public_key` are tessera public keys for first two members)

## Scenarios (all in postman)

### Before anything

- run request: Create Privacy Group

### Count (both public and private work)

1. public:
  - request: count/Create Public Transaction
  - request: Get Public Transaction Receipt
    - expect to see log with data 0x000000000000000000000000000000000000000000000000000000000000007b

2. private:
  - request: count/Create Private Transaction
  - request: Get Private Transaction Receipt
    - expect to see log with data 0x000000000000000000000000000000000000000000000000000000000000007b

### Create (public works, private doesn't)
3. public:
  - request: create/Create Public Transaction
  - request: Get Public Transaction Receipt
    - expect to see 2 logs (one is from SimpleStorageFactory, another from SimpleStorage)

4. private:
  - request: create/Create Private Transaction
  - request: Get Private Transaction Receipt
    - expect to see 2 logs (one is from SimpleStorageFactory, another from SimpleStorage)
    - but got: "status": "0x0", and error in log: Failed to process private transaction 0xe379a9658662d1fc0e8837f57b3ded8b0151d10d1d07512ac1d9385935173d8a: PRIVATE_TRANSACTION_FAILED
