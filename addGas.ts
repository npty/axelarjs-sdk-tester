import {
  AxelarGMPRecoveryAPI,
  Environment,
  EvmChain,
  GasToken,
} from "@axelar-network/axelarjs-sdk";
import { ethers } from "ethers";

const txHash =
  "0xe2c1b1b4d7c5b24abee139752e7194c0220d7ad08b3b424e087fb7701a5dc639";

const privateKey =
  "fa25c762fcf312149117cc3962b06654cf4acab794196778efb5bde691916989";

(async () => {
  const api = new AxelarGMPRecoveryAPI({
    environment: Environment.TESTNET,
  });

  const tx = await api.addNativeGas(EvmChain.POLYGON, txHash, {
    evmWalletDetails: {
      privateKey,
    },
  });

  console.log(tx);
})();
