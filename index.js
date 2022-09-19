const {
  AxelarAssetTransfer,
  Environment,
  EvmChain,
  CosmosChain,
} = require("@axelar-network/axelarjs-sdk");

const test = async () => {
  const sdk = new AxelarAssetTransfer({ environment: Environment.MAINNET });

  const recipientAddress = "0xB8Cd93C83A974649D76B1c19f311f639e62272BC";
  const depositAddress = await sdk.getDepositAddress(
    "terra",
    "moonbeam",
    recipientAddress,
    "uusdc"
  );

  console.log(depositAddress);
  process.exit(0);
};

test();
