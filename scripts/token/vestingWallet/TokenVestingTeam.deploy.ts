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

const DeployContractName = 'VestingByTimeWallet';
const contractAddress = ContractDeployAddress.TokenVestingTeam;

async function main() {
  if (contractAddress) {
    const contract = await deployUpgradeUpdateWithProposal(
      DeployContractName,
      contractAddress
    );
  } else {
    //Date and time (GMT): 2023年2月1日WednesdayAM12点00分
    const startTimestamp = 1675209600;
    //30 years
    const duration = 30 * 365 * 24 * 60 * 60;

    const contract = await deployUpgradeProxy(DeployContractName, [
      ContractDeployAddress.TokenSafeBoxPaymentSplitterTeam,
      startTimestamp,
      duration,
    ]);
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
