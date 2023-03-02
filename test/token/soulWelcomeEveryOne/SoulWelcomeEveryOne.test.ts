import { expect } from 'chai';
import { Contract, ContractTransaction } from 'ethers';
import { ethers, upgrades } from 'hardhat';

describe('SoulWelcomeEveryOne', () => {
  let soulWelcomeEveryOne: Contract;
  beforeEach(async () => {
    const SoulWelcomeEveryOne = await ethers.getContractFactory(
      'SoulWelcomeEveryOne'
    );
    soulWelcomeEveryOne = await upgrades.deployProxy(SoulWelcomeEveryOne, []);
    await soulWelcomeEveryOne.deployed();
    await soulWelcomeEveryOne.setBaseURI('https://soulwelcomeeveryone.com/');
  });

  it('should be deploy', async () => {
    const SoulWelcomeEveryOne = await ethers.getContractFactory(
      'SoulWelcomeEveryOne'
    );
    soulWelcomeEveryOne = await upgrades.deployProxy(SoulWelcomeEveryOne, []);
    await soulWelcomeEveryOne.deployed();

    expect(await soulWelcomeEveryOne.name()).to.equal('SoulWelcomeEveryOne');
  });

  describe('mint', () => {
    it('should be mint', async () => {
      const [owner, addr1, addr2, addr3] = await ethers.getSigners();

      await expect(soulWelcomeEveryOne['safeMint'](addr1.address))
        .emit(soulWelcomeEveryOne, 'Transfer')
        .withArgs(ethers.constants.AddressZero, addr1.address, 0)
        .emit(soulWelcomeEveryOne, 'Locked')
        .withArgs(0);

      expect(await soulWelcomeEveryOne.balanceOf(addr1.address)).to.equal(1);

      const tokenId = 0;

      expect(await soulWelcomeEveryOne.ownerOf(tokenId)).to.equal(
        addr1.address
      );

      const tokenUrl = await soulWelcomeEveryOne.tokenURI(tokenId);
      expect(tokenUrl).to.equal('https://soulwelcomeeveryone.com/0');
    });

    it('should be mint count limit', async () => {
      const [owner, addr1, addr2, addr3] = await ethers.getSigners();

      await soulWelcomeEveryOne['safeMint'](addr1.address).then(
        (tx: ContractTransaction) => tx.wait()
      );

      expect(await soulWelcomeEveryOne.balanceOf(addr1.address)).to.equal(1);

      await expect(soulWelcomeEveryOne['safeMint'](addr1.address)).rejectedWith(
        'SoulWelcomeEveryOne: address '
      );
    });
  });

  describe('transfer', () => {
    it('should be transfer', async () => {
      const [owner, addr1, addr2, addr3] = await ethers.getSigners();

      await soulWelcomeEveryOne['safeMint'](addr1.address).then(
        (tx: ContractTransaction) => tx.wait()
      );

      expect(await soulWelcomeEveryOne.balanceOf(addr1.address)).to.equal(1);

      await expect(
        soulWelcomeEveryOne
          .connect(addr1)
          .transferFrom(addr1.address, addr2.address, 0)
      ).rejectedWith('Token Lock: locked');
    });
  });

  describe('supportsInterface', () => {
    it('should be supportsInterface', async () => {
      const [owner, addr1, addr2, addr3] = await ethers.getSigners();

      const supportsInterface = await soulWelcomeEveryOne.supportsInterface(
        '0xb45a3c0e'
      );
      expect(supportsInterface).to.equal(true);
    });
  });
});
