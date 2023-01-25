const {ERC721} = require('../contract/ERC721');
const solc = require('solc')

exports.compilerInput= async (req, res) => {
    
    const name = req.body.name;
    const symbol = req.body.symbol;

    console.log("name: ",name);
    console.log("Compiler : ",symbol);

    let contractConstructor = handleContractConstructor(name,symbol);
    console.log("source1", ERC721.length);
    source = setCharAt(ERC721, ERC721.length - 5, contractConstructor);

    let complierInput = {
        language: "Solidity",
        sources: {
        helloworld: {
            content: source,
        },
        },
        settings: {
            optimizer: {
                enabled: true,
            },
            outputSelection: {
                "*": {
                "*": ["*"],
                },
            },
        },
    };

    let contractObj = {
        source: source,
        meta: JSON.parse(solc.compile(JSON.stringify(complierInput)))
    }  
    console.log("conractObj : ",contractObj);
    let bytecode = await contractObj.meta.contracts.helloworld.Token.evm
            .bytecode.object;
    let abi = await contractObj.meta.contracts.helloworld.Token.abi;

    res.json({bytecode,abi});
};

const setCharAt = (str, index, chr) => {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
};

const handleContractConstructor = (name,symbol) => {
        let contract = `  
   
        constructor() ERC721("${name}","${symbol}"){}
      
    `;
    return contract;
};