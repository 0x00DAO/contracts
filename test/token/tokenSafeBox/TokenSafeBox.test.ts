import { expect } from 'chai';
import { BigNumber, Contract } from 'ethers';
import { ethers, upgrades } from 'hardhat';

describe('TokenSafeBox', () => {
  let welcomeEvenOne: Contract;
  let tokenSafeBox: Contract;
  it('should be deploy', async () => {
    const WelcomeEvenOne = await ethers.getContractFactory('WelcomeEveryOne');
    welcomeEvenOne = await upgrades.deployProxy(WelcomeEvenOne, []);
    await welcomeEvenOne.deployed();

    const TokenSafeBox = await ethers.getContractFactory('TokenSafeBox');
    tokenSafeBox = await upgrades.deployProxy(TokenSafeBox, []);
    await tokenSafeBox.deployed();
  });

  it('should be withdraw ERC20', async () => {
    const [owner, addr1] = await ethers.getSigners();

    //mint to tokenSafeBox
    await welcomeEvenOne.mint(
      tokenSafeBox.address,
      ethers.utils.parseEther('100')
    );

    //grant withdraw role
    tokenSafeBox.grantRole(ethers.utils.id('WITHDRAW'), owner.address);

    expect(await welcomeEvenOne.balanceOf(tokenSafeBox.address)).to.equal(
      ethers.utils.parseEther('100')
    );

    expect(await welcomeEvenOne.balanceOf(addr1.address)).to.equal(
      ethers.utils.parseEther('0')
    );

    //withdraw
    await expect(
      tokenSafeBox.withdrawERC20(
        welcomeEvenOne.address,
        addr1.address,
        ethers.utils.parseEther('100')
      )
    )
      .emit(tokenSafeBox, 'WithdrawERC20')
      .withArgs(
        welcomeEvenOne.address,
        addr1.address,
        ethers.utils.parseEther('100')
      );

    expect(await welcomeEvenOne.balanceOf(tokenSafeBox.address)).to.equal(
      ethers.utils.parseEther('0')
    );

    expect(await welcomeEvenOne.balanceOf(addr1.address)).to.equal(
      ethers.utils.parseEther('100')
    );
  });

  it('should be version', async () => {
    expect(await tokenSafeBox.version()).to.instanceOf(BigNumber);
  });
});
