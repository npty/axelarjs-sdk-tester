import { AxelarQueryAPI, Environment } from "@axelar-network/axelarjs-sdk";
import { utils } from "ethers";

const sdk = new AxelarQueryAPI({ environment: Environment.TESTNET });

const srcChain = "arbitrum-sepolia";
const destChain = "optimism-sepolia";
const srcDecimals = 6;
const gasLimit = 1_000_000;

(async () => {
  const srcToDest = await sdk.estimateGasFee(srcChain, destChain, gasLimit);
  const destToSrc = await sdk.estimateGasFee(destChain, srcChain, gasLimit);

  console.log(
    `${srcChain} to ${destChain} fee:`,
    utils.formatUnits(srcToDest as string, srcDecimals),
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
