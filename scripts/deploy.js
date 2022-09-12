const hre = require('hardhat');

async function main() {
  const QuangNFT = await hre.ethers.getContractFactory('QuangNFT');
  const quangNFT = await QuangNFT.deploy('QuangNFT', 'QNFT');
  await quangNFT.deployed();

  console.log(`Contract deployed to address: ${quangNFT.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
