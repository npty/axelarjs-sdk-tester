import {
  AxelarQueryAPI,
  Environment,
  GasToken,
} from "@axelar-network/axelarjs-sdk";
import { utils } from "ethers";

const sdk = new AxelarQueryAPI({ environment: Environment.MAINNET });

const srcChain = "osmosis";
const destChain = "arbitrum";
const srcDecimals = 6;
const destDecimals = 18;
const minGasPrice = undefined;
const gasLimit = 1_000_000;

(async () => {
  const srcToDest = await sdk.estimateGasFee(
    srcChain,
    destChain,
    "OSMO",
    gasLimit,
    1.2,
    minGasPrice
  );
  const destToSrc = await sdk.estimateGasFee(
    destChain,
    srcChain,
    "ETH",
    gasLimit,
    1.2,
    minGasPrice
  );

  console.log(
    `${srcChain} to ${destChain} fee:`,
    utils.formatEther(srcToDest as string),
    "ETH"
  );
  console.log(
    `${destChain} to ${srcChain} fee:`,
    utils.formatEther(destToSrc as string),
    "ETH"
  );
})();

// 2-way calls:
// A -> B: 0.01ETH
// B -> A: 0.01ETH
// contract_func(){ value: 0.02ETH }
