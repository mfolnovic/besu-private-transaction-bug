const ethers = require("ethers");
const fs = require("fs");

function generate(contractName, functionName, args) {
    const { abi, bytecode } = JSON.parse(fs.readFileSync(`build/contracts/${contractName}.json`));

    const contract = new ethers.ContractFactory(abi, bytecode);
    const fn = contract.interface.getFunction(functionName);
    const functionData = contract.interface.encodeFunctionData(
        fn,
        args,
    );
    console.log(functionName);
    console.log(functionData);
    console.log();
}

generate("SimpleStorageFactory", "count", []);
generate("SimpleStorageFactory", "create", []);
generate("SimpleStorage", "set", [123]);
