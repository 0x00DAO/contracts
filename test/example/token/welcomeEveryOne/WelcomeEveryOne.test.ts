import { expect } from 'chai';
import { ethers, upgrades } from 'hardhat';

describe('WelcomeEveryOne', () => {
  it('should be deploy', async () => {
    const WelcomeEvenOne = await ethers.getContractFactory('WelcomeEveryOne');
    const welcomeEvenOne = await upgrades.deployProxy(WelcomeEvenOne, []);
    await welcomeEvenOne.deployed();

    expect(await welcomeEvenOne.name()).to.equal('WelcomeEveryOne');
  });
});
