const {
  AxelarAssetTransfer,
  AxelarQueryAPI,
  Environment,
  AxelarGMPRecoveryAPI,
  EvmChain,
  AxelarRecoveryApi,
  GasToken,
} = require("@axelar-network/axelarjs-sdk");
const { ethers } = require("ethers");
const { dependencies } = require("./package.json");

console.log("Node version:", process.version);
console.log(
  "AxelarJS SDK version:",
  dependencies["@axelar-network/axelarjs-sdk"]
);
const from = process.env.srcChain || "avalanche";
const to = process.env.destChain || "moonbeam";
const address =
  process.env.address || "0xB8Cd93C83A974649D76B1c19f311f639e62272BC";
const token = process.env.token || "uusdc";
const env = process.env.env || Environment.MAINNET;
console.log("Using Environment:", env);

const checkDepositAddress = async () => {
  console.log("Checking deposit address");
  const sdk = new AxelarAssetTransfer({ environment: env });
  const args = [from, to, address, token];
  console.log("Using Args:", args);
  const depositAddress = await sdk.getDepositAddress(...args);

  console.log(depositAddress);
  process.exit(0);
};

const checkTransferFee = async () => {
  console.log("Checking transfer fee");
  const sdk = new AxelarQueryAPI({ environment: "testnet" });
  const fee = await sdk.getTransferFee("moonbeam", "avalanche", "uausdc", "1");
  console.log(`Transfer Fee for ${token} from ${from} to ${to}:`, fee);
};

const checkDenom = async () => {
  const sdk = new AxelarQueryAPI({ environment: "testnet" });
  const denom = await sdk.getDenomFromSymbol("WDEV", "moonbeam");
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const checkQueryTransactionStatus = async (txHash) => {
  const sdk = new AxelarGMPRecoveryAPI({ environment: "testnet" });
  await sdk.queryTransactionStatus(txHash).then((res) => {
    console.log(res.error);
  });
};

const addNativeGas = async (txHash) => {
  const sdk = new AxelarGMPRecoveryAPI({ environment: "testnet" });
  const res = await sdk.addNativeGas(EvmChain.AVALANCHE, txHash, {
    evmWalletDetails: {
      privateKey:
        "fb28b0b0c8be1c0603cf1f3f89e7e3c37f71242ea6af1df7ee7101a4df0da9d3",
    },
  });
  console.log(res);
};

const computeCommandID = async (transactionHash, logIndex, chainId) => {
  console.log(transactionHash, logIndex, chainId);
  const {
    arrayify,
    concat,
    id,
    solidityKeccak256,
    keccak256,
    hexConcat,
    hexlify,
  } = ethers.utils;
  console.log(
    hexlify([
      186, 93, 44, 206, 70, 29, 199, 84, 155, 5, 180, 218, 83, 48, 199, 21, 248,
      126, 233, 84, 7, 95, 84, 17, 36, 139, 36, 56, 170, 20, 147, 90,
    ])
  );
  const bytesTxHash = arrayify(transactionHash);
  const bytesLogIndex = arrayify(logIndex);
  const bytesChainId = arrayify(chainId);
  const append1 = concat([bytesTxHash, bytesLogIndex]);
  const append2 = concat([append1, bytesChainId]);
  console.log(keccak256(append2));
  console.log(solidityKeccak256(["bytes"], [hexConcat(append2)]));
  // console.log(id(hexConcat([bytesTxHash, bytesLogIndex, bytesChainId])));
  // console.log(
  //   solidityKeccak256(
  //     ["bytes32", "uint64", "uint64"],
  //     [transactionHash, logIndex, chainId]
  //   )
  // );
  // console.log(
  //   solidityKeccak256(
  //     ["bytes32", "uint64", "uint32"],
  //     [bytesTxHash, bytesLogIndex, bytesChainId]
  //   )
  // );
};

async function estimateGasFee(source, dest, token) {
  const sdk = new AxelarQueryAPI({ environment: "testnet" });
  const gasFee = await sdk.estimateGasFee(source, dest, token);
}
// estimateGasFee('Avalanche', 'ethereum-2', "AVAX");

async function queryTxStatus(txHash) {
  const api = new AxelarRecoveryApi({ environment: Environment.TESTNET });
  const result = await api.queryTransactionStatus(txHash);
  console.log(result.status);
}

// const txHash =
//   "B210DF80331FB40A61229D23DEF849FF04A51839D47F7D696A4B228DB57EED1D";
// queryTxStatus(txHash);

async function getBaseFee() {
  const api = new AxelarQueryAPI({ environment: Environment.MAINNET });
  const result = await api.estimateGasFee(
    EvmChain.ETHEREUM,
    "osmosis",
    GasToken.ETHEREUM,
    50000,
    1.5,
    "0"
  );
  console.log(ethers.formatEther(result));
}

// getBaseFee();

async function testAsyncError() {
  throw new Error("Hello");
}

new Promise(async () => {
  throw new Error('message');
}).catch(e => console.log('dsds', e.message));
