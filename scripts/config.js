require("dotenv").config();
const {
  Aquarius,
  ConfigHelper,
  configHelperNetworks,
} = require("@oceanprotocol/lib");
const { providers } = require("ethers");
const ethers = require("ethers");
const { network } = require("hardhat");

async function oceanConfig() {
  // Get configuration for the given network
  /*   const provider = new ethers.JsonRpcProvider(
    process.env.OCEAN_NETWORK_URL || configHelperNetworks[1].nodeUri
  ); */

  const provider = new ethers.AlchemyProvider("matic", "key");

  console.log(provider);

  const publisherAccount = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  //console.log(publisherAccount);
  const consumerAccount = new ethers.Wallet(process.env.PRIVATE_KEY2, provider);
  const stakerAccount = new ethers.Wallet(process.env.PRIVATE_KEY2, provider);

  let oceanConfig = new ConfigHelper().getConfig(
    parseInt(String((await publisherAccount.provider.getNetwork()).chainId))
  );
  const aquarius = new Aquarius(oceanConfig?.metadataCacheUri);

  // If using local development environment, read the addresses from local file.
  // The local deployment address file can be generated using barge.
  if (process.env.OCEAN_NETWORK === "development") {
    const addresses = JSON.parse(
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      fs.readFileSync(
        process.env.ADDRESS_FILE ||
          `${homedir}/.ocean/ocean-contracts/artifacts/address.json`,
        "utf8"
      )
    ).development;

    oceanConfig = {
      ...oceanConfig,
      oceanTokenAddress: addresses.Ocean,
      poolTemplateAddress: addresses.poolTemplate,
      fixedRateExchangeAddress: addresses.FixedPrice,
      dispenserAddress: addresses.Dispenser,
      nftFactoryAddress: addresses.ERC721Factory,
      sideStakingAddress: addresses.Staking,
      opfCommunityFeeCollector: addresses.OPFCommunityFeeCollector,
    };
  }

  oceanConfig = {
    ...oceanConfig,
    publisherAccount: publisherAccount,
    consumerAccount: consumerAccount,
    stakerAccount: stakerAccount,
    aquarius: aquarius,
  };

  return oceanConfig;
}

module.exports = {
  oceanConfig,
};
