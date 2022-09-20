const {
  AxelarAssetTransfer,
  Environment,
} = require("@axelar-network/axelarjs-sdk");
const { dependencies } = require("./package.json");

console.log("Node version:", process.version);
console.log(
  "AxelarJS SDK version:",
  dependencies["@axelar-network/axelarjs-sdk"]
);

const test = async () => {
  const from = process.env.srcChain || "avalanche";
  const to = process.env.destChain || "moonbeam";
  const address =
    process.env.address || "0xB8Cd93C83A974649D76B1c19f311f639e62272BC";
  const token = process.env.token || "uusdc";
  const env = process.env.env || Environment.MAINNET;

  const sdk = new AxelarAssetTransfer({ environment: env });
  const args = [from, to, address, token];
  console.log("Using Environment:", env);
  console.log("Using Args:", args);
  const depositAddress = await sdk.getDepositAddress(...args);

  console.log(depositAddress);
  process.exit(0);
};

const timeout = process.env.timeout || 15000;
setTimeout(() => {
  console.log("Timeout", timeout / 1000, "seconds");
  process.exit(0);
}, timeout);

test();
