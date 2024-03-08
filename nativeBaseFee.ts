import { AxelarQueryAPI, Environment } from "@axelar-network/axelarjs-sdk";
import fs from "fs";

const api = new AxelarQueryAPI({ environment: Environment.MAINNET });

const params = {
  sourceChainId: "avalanche",
  destinationChainId: "binance",
  sourceTokenAddress: "0x0000000000000000000000000000000000000000", // this is a dummy value but we need to send
  sourceContractAddress: "0xce16F69375520ab01377ce7B88f5BA8C48F8D666",
  destinationContractAddress: "0xce16F69375520ab01377ce7B88f5BA8C48F8D666",
  symbol: "axlUSDC", // this is a dummy value but we need to send
  amount: "100", // this is a dummy value but we need to send
};

(async () => {
  const data = await api.getNativeGasBaseFee(
    params.sourceChainId,
    params.destinationChainId,
    undefined, // sourceTokenSymbol - optional param not needed
    params.symbol,
    params.destinationContractAddress,
    params.sourceContractAddress,
    undefined, // amount in decimals, optional
    params.amount // amount in gwei
  );

  // fs write to file json
  fs.writeFileSync("nativeBaseFee.json", JSON.stringify(data, null, 2));
})();
