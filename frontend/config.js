// This is the address from your successful deployment terminal
const FACTORY_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// These ABIs tell Ethers.js how to interact with your contract functions
const FACTORY_ABI = [
    "function createInstance() external",
    "function journalistToContract(address) external view returns (address)",
    "event InstanceCreated(address indexed journalist, address contractAddress)"
];

const INSTANCE_ABI = [
    "function buyCoffee(string calldata _name, string calldata _message) external payable",
    "function withdrawTips() external",
    "function getMemos() external view returns (tuple(address from, uint256 timestamp, string name, string message)[])",
    "function journalist() external view returns (address)"
];