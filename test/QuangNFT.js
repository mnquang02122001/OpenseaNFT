const {
  time,
  loadFixture,
} = require('@nomicfoundation/hardhat-network-helpers');
const { anyValue } = require('@nomicfoundation/hardhat-chai-matchers/withArgs');
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('QuangNFT', function () {
  async function deployQuangNFTFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const QuangNFT = await ethers.getContractFactory('QuangNFT');
    const quangNFT = await QuangNFT.deploy('QuangNFT', 'QNFT');

    return { owner, otherAccount, quangNFT };
  }

  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      const { quangNFT, owner } = await loadFixture(deployQuangNFTFixture);

      expect(await quangNFT.owner()).to.equal(owner.address);
    });

    it('Should mint exactly', async function () {
      const { quangNFT, owner } = await loadFixture(deployQuangNFTFixture);
      await quangNFT.mintTo(
        owner.address,
        'https://ipfs.io/ipfs/QmZDNhcJokPM31zv2e4QKGuq2q2DnUoMB7VT3A9q8XNDY2'
      );
      expect((await quangNFT.balanceOf(owner.address)).toString()).to.equal(
        '1'
      );
    });
    it('Should transfer exactly', async function () {
      const { quangNFT, owner, otherAccount } = await loadFixture(
        deployQuangNFTFixture
      );
      await quangNFT.mintTo(
        owner.address,
        'https://ipfs.io/ipfs/QmZDNhcJokPM31zv2e4QKGuq2q2DnUoMB7VT3A9q8XNDY2'
      );
      await quangNFT.transferFrom(owner.address, otherAccount.address, 1);
      expect(
        (await quangNFT.balanceOf(otherAccount.address)).toString()
      ).to.equal('1');
      expect((await quangNFT.balanceOf(owner.address)).toString()).to.equal(
        '0'
      );
    });
  });
});
