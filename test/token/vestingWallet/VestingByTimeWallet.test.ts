import { expect } from 'chai';
import { Contract } from 'ethers';
import { ethers, upgrades } from 'hardhat';

describe('VestingByTimeWallet', () => {
  let contract: Contract;
  let contractWEO: Contract;
  let startTimestamp: number;
  let duringTimestamp: number;
  beforeEach(async () => {
    const [owner, addr1] = await ethers.getSigners();

    startTimestamp = Math.floor(new Date().getTime() / 1000);
    // duringTimestamp set during 30 years
    duringTimestamp = 30 * 365 * 24 * 60 * 60;

    const VestingByTimeWallet = await ethers.getContractFactory(
      'VestingByTimeWallet'
    );
    contract = await upgrades.deployProxy(VestingByTimeWallet, [
      addr1.address,
      startTimestamp,
      duringTimestamp,
    ]);
    await contract.deployed();

    const WelcomeEvenOne = await ethers.getContractFactory('WelcomeEveryOne');
    contractWEO = await upgrades.deployProxy(WelcomeEvenOne, []);
    await contractWEO.deployed();
  });

  describe('compute release', () => {
    let mintAmount: number;
    beforeEach(async () => {
      mintAmount = 3000000000;
      await contractWEO.mint(
        contract.address,
        ethers.utils.parseEther(mintAmount.toString())
      );
    });
    it('should compute vesting tokens', async () => {
      expect(
        await contract.vestingTokens(
          mintAmount,
          startTimestamp,
          startTimestamp,
          duringTimestamp
        )
      ).to.equal(0);
    });

    it('should compute vesting tokens', async () => {
      expect(
        await contract.vestingTokens(
          mintAmount,
          startTimestamp + duringTimestamp,
          startTimestamp,
          duringTimestamp
        )
      ).to.equal(mintAmount);
    });

    it('should compute vesting tokens', async () => {
      expect(
        await contract['vestedAmount(address,uint64)'](
          contractWEO.address,
          startTimestamp + duringTimestamp
        )
      ).to.equal(ethers.utils.parseEther(mintAmount.toString()));
    });
  });
});
