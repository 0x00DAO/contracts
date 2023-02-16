import { expect } from 'chai';
import { Contract } from 'ethers';
import { ethers, upgrades } from 'hardhat';

describe('TokenSafeBoxPaymentSplitter', () => {
  let contract: Contract;
  let token: Contract;

  beforeEach(async () => {
    const Token = await ethers.getContractFactory('WelcomeEveryOne');
    token = await upgrades.deployProxy(Token);
    await token.deployed();

    const TokenSafeBoxPaymentSplitter = await ethers.getContractFactory(
      'TokenSafeBoxPaymentSplitter'
    );
    const [owner, addr1, addr2] = await ethers.getSigners();
    contract = await upgrades.deployProxy(TokenSafeBoxPaymentSplitter, [
      [addr1.address, addr2.address],
      [70, 30],
    ]);
    await contract.deployed();
  });

  it('AccountPaymentSplitter:pay Test ERC20', async () => {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const amount = ethers.utils.parseEther('100');

    await token.mint(contract.address, amount);

    expect(await token.balanceOf(contract.address)).to.equal(
      ethers.utils.parseEther('100')
    );

    await contract.connect(addr1).releaseERC20(token.address, addr1.address);
    expect(await token.balanceOf(addr1.address)).to.equal(
      ethers.utils.parseEther('70')
    );

    await contract.connect(addr2).releaseERC20(token.address, addr2.address);
    expect(await token.balanceOf(addr2.address)).to.equal(
      ethers.utils.parseEther('30')
    );

    expect(await token.balanceOf(contract.address)).to.equal('0');
  });

  it('AccountPaymentSplitter:pay Test ETH', async () => {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const amount = ethers.utils.parseEther('100');

    await owner.sendTransaction({
      to: contract.address,
      value: amount,
    });

    expect(await ethers.provider.getBalance(contract.address)).to.equal(
      ethers.utils.parseEther('100')
    );

    const balance1 = await ethers.provider.getBalance(addr1.address);
    await contract.connect(owner).releaseETH(addr1.address);
    expect(await ethers.provider.getBalance(addr1.address)).to.equal(
      balance1.add(ethers.utils.parseEther('70'))
    );

    const balance2 = await ethers.provider.getBalance(addr2.address);
    await contract.connect(owner).releaseETH(addr2.address);
    expect(await ethers.provider.getBalance(addr2.address)).to.equal(
      balance2.add(ethers.utils.parseEther('30'))
    );

    expect(await ethers.provider.getBalance(contract.address)).to.equal('0');
  });
});
