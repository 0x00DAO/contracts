# Welcome to 0x00DAO contracts

## contract addresses

### bsc mainnet

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
