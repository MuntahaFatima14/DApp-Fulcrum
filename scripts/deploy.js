const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting deployment of CaffeineFactory...");

  const Factory = await hre.ethers.getContractFactory("CaffeineFactory");
  const factory = await Factory.deploy();

  // This line handles both Ethers v5 (.deployed()) and v6 (.waitForDeployment())
  if (factory.waitForDeployment) {
    await factory.waitForDeployment();
  } else {
    await factory.deployed();
  }

  // This handles getting the address for both versions
  const factoryAddress = factory.target ? factory.target : factory.address;

  console.log("-----------------------------------------------");
  console.log(`✅ SUCCESS: CaffeineFactory deployed to: ${factoryAddress}`);
  console.log("-----------------------------------------------");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});