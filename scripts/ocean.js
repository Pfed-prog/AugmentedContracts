// Note: Make sure .env file and config.js are created and setup correctly
const { oceanConfig } = require("./config.js");
const { ZERO_ADDRESS, NftFactory } = require("@oceanprotocol/lib");
const { ethers } = require("hardhat");

// Define a function createFRE()
const createFRE = async () => {
  const FRE_NFT_NAME = "Datatoken 2";
  const FRE_NFT_SYMBOL = "DT2";

  let config = await oceanConfig();

  // Create a NFTFactory
  // errors here
  const provider = new ethers.AlchemyProvider("matic", "key");
  const [deployer, jane, bob, tom] = await ethers.getSigners();
  const depl = deployer.connect(provider);
  console.log(depl.provider);
  console.log(config.nftFactoryAddress);
  deployer.connect(provider);
  const factory = new NftFactory(config.nftFactoryAddress, depl);

  console.log(1234);

  const nftParams = {
    name: FRE_NFT_NAME,
    symbol: FRE_NFT_SYMBOL,
    templateIndex: 1,
    tokenURI: "",
    transferable: true,
    owner: await config.publisherAccount.getAddress(),
  };

  const datatokenParams = {
    templateIndex: 1,
    cap: "100000",
    feeAmount: "0",
    paymentCollector: ZERO_ADDRESS,
    feeToken: ZERO_ADDRESS,
    minter: await config.publisherAccount.getAddress(),
    mpFeeAddress: ZERO_ADDRESS,
  };

  const freParams = {
    fixedRateAddress: config.fixedRateExchangeAddress,
    baseTokenAddress: config.oceanTokenAddress,
    owner: await config.publisherAccount.getAddress(),
    marketFeeCollector: await config.publisherAccount.getAddress(),
    baseTokenDecimals: 18,
    datatokenDecimals: 18,
    fixedRate: "1",
    marketFee: "0.001",
    allowedConsumer: ZERO_ADDRESS,
    withMint: true,
  };

  const bundleNFT = await factory.createNftWithDatatokenWithFixedRate(
    nftParams,
    datatokenParams,
    freParams
  );

  //const trxReceipt = await bundleNFT.wait();

  return {
    trxReceipt,
  };
};

// Call the createFRE() function
createFRE()
  .then(({ trxReceipt }) => {
    console.log(`TX Receipt ${trxReceipt}`);
    process.exit(1);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
