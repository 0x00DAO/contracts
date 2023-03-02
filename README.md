# Welcome to 0x00DAO contracts

## contract addresses

- WelcomeEveryOne
  - address: [0x576f54c39Cb8172C92F315464267E09BD97F960B](https://polygonscan.com/address/0x576f54c39Cb8172C92F315464267E09BD97F960B)
  - description: WEO token contract
- TokenSafeBoxTeamProject
  - address: [0x8706b341A1678a1a7A2971C995CABB761752c9DB](https://polygonscan.com/address/0x8706b341A1678a1a7A2971C995CABB761752c9DB)
  - description: TokenSafeBoxTeamProject contract
- TokenSafeBoxTeamOther
  - address: [0x3F2Ac86101B675BbA7b12aa61f931E63b13b5d6B](https://polygonscan.com/address/0x3F2Ac86101B675BbA7b12aa61f931E63b13b5d6B)
  - description: TokenSafeBoxTeamOther contract
- TokenSafeBoxTeamDAO
  - address: [0x4fFe08f38a13702DfF1d152C872c1c47841749Ca](https://polygonscan.com/address/0x4fFe08f38a13702DfF1d152C872c1c47841749Ca)
  - description: TokenSafeBoxTeamDAO contract
- TokenSafeBoxPaymentSplitterTeam

  - address: [0x255A90b302203b09f968a4602d905972aae49009](https://polygonscan.com/address/0x255A90b302203b09f968a4602d905972aae49009)
  - description: TokenSafeBoxPaymentSplitterTeam contract

- TokenVestingTeam

  - address: [0x47CfF20eD4C024c96432F0D9fC3e292F21Ca3080](https://polygonscan.com/address/0x47CfF20eD4C024c96432F0D9fC3e292F21Ca3080)
  - description: TokenVestingTeam contract

- SoulWelcomeEveryOne
  - address: [0x1A516d0E324575Fd6BdD2E54FB9cFcB6C8F3e7A4](https://polygonscan.com/address/0x1A516d0E324575Fd6BdD2E54FB9cFcB6C8F3e7A4)
  - description: SoulWelcomeEveryOne contract

## token contract distribution

```shell
WelcomeEveryOne-Token
├── TokenVestingTeam
│   └── TokenSafeBoxPaymentSplitterTeam
│       ├── TokenSafeBoxTeamDAO
│       ├── TokenSafeBoxTeamProject
│       └── TokenSafeBoxTeamOther
├── TokenVestingCommunity
│   └── ...
├── TokenVestingFund
│   └── ...
└── TokenVestingOthers
    └── ...
```

## how to develop and test

### Principle of development

#### TDD(Test-Driven Development)

The development process must strictly follow the principle of test-driven development, write test cases first, and then write the function implementation.

#### Code submission requires all test cases to pass

#### Incremental design

### Actual engineering development

#### Update With npm

## - Automated testing

Running Test Locally (Recommend)

```shell
npx hardhat test
```

```shell
npx hardhat test --grep one
```

Running Test On Polygon Testnet

```shell
npx hardhat test --network mumbai
```

## Deployment

### Deploy contract to testnet or mainnet

```shell
npx hardhat run --network polygon_testnet scripts/HelloWorld-deploy.ts
npx hardhat run --network polygon_testnet filePath
```

### Record the address of the contract after deployment

```shell
HelloWorld deployed to:0x3F0528D040f31ace17a0c733469145928b9C88a4
```

Record `0x3F0528D040f31ace17a0c733469145928b9C88a4` to any place you like, which is convenient for the `game-service-contract` service to call.

### Compile contract ABI

```shell
npm run compile
```

#### Generate contracts to the corresponding directory structure

````shell

```bash
contracts/
├── abi/
│   └── contracts/
│       ├── HelloWorld.sol/
│       │   ├── HelloWorld.json  ---abi description file
│       │   └── HelloWorld.ts    ---abi Typescript file
│       └── OtherXXX.sol/
│           ├── OtherXXX.json
│           └── OtherXXX.ts
└── ...
````

Copy the files in the `abi/` directory to the corresponding project for use

About the `abi/` directory, you can also use the `npm run compile` command to generate the `abi/` directory, and then copy the files in the `abi/` directory to the corresponding project for use.
