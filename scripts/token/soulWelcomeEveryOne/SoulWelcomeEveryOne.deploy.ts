// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
// const hre = require("hardhat");
import { ContractDeployAddress } from '../../consts/deploy.address.const';
import {
  deployUpgradeProxy,
  deployUpgradeUpdateWithProposal,
} from '../../utils/deploy.util';

const DeployContractName = 'SoulWelcomeEveryOne';
const contractAddress = ContractDeployAddress.SoulWelcomeEveryOne;

async function main() {
  if (contractAddress) {
    const contract = await deployUpgradeUpdateWithProposal(
      DeployContractName,
      contractAddress
    );
  } else {
    const contract = await deployUpgradeProxy(DeployContractName, []);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
