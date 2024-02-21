import {
  AxelarQueryAPI,
  Environment,
  GasToken,
} from "@axelar-network/axelarjs-sdk";
import { ethers } from "ethers";

async function estimateGasFee(
  source: string,
  dest: string,
  multiplier: number,
  details: any
) {
  const sdk = new AxelarQueryAPI({ environment: Environment.TESTNET });
  const gasFee = await sdk.estimateGasFee(
    source,
    dest,
    GasToken.ETH,
    835000,
    multiplier,
    undefined,
    details
  );

  // check is gasFee is number
  if (typeof gasFee === "string") {
    console.log(ethers.formatEther(gasFee), new Date());
  } else {
    console.log(JSON.stringify(gasFee), new Date());
  }
}

async function loop(fn: () => void, times: number) {
  for (let i = 0; i < times; i++) {
    await fn();
    await new Promise((resolve) => setTimeout(resolve, 15000));
  }
}

let multiplier = 10;
const srcChain = "arbitrum";
const destChain = "optimism";
console.log("Testing gas fee estimation for", srcChain, "to", destChain, "\n");
loop(async () => {
  console.log("Use multiplier:", multiplier / 10);
  await estimateGasFee(srcChain, destChain, 1.2, {
    showDetailedFees: false,
    transferAmount: "5",
    destinationContractAddress: "0xce16F69375520ab01377ce7B88f5BA8C48F8D666",
    sourceContractAddress: "0xce16F69375520ab01377ce7B88f5BA8C48F8D666",
    tokenSymbol: "axlUSDC",
  });
}, 500);
