const hre = require('hardhat');
require('dotenv').config();
async function main() {
  const [owner] = await hre.ethers.getSigners();
  const QuangNFT = await hre.ethers.getContractFactory('QuangNFT');
  const quangNFT = await QuangNFT.attach(process.env.QUANGNFT_CONTRACT_ADDRESS);
  await quangNFT.mintTo(
    owner.address,
    'https://ipfs.io/ipfs/QmZDNhcJokPM31zv2e4QKGuq2q2DnUoMB7VT3A9q8XNDY2'
  );
  console.log('Mint successful');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
