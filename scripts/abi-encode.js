const ethers = require("ethers");
const fs = require("fs");

const data = JSON.parse(fs.readFileSync("build/contracts/SimpleStorageFactory.json"));
const abi = data.abi;
const bytecode = data.bytecode;

function generate(functionName) {
    const contract = new ethers.ContractFactory(abi, bytecode);
    const fn = contract.interface.getFunction(functionName);
    const functionData = contract.interface.encodeFunctionData(
        fn,
        [],
    );
    console.log(functionName);
    console.log(functionData);
    console.log();
}

generate("count");
generate("create");
