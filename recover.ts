import {
  AxelarGMPRecoveryAPI,
  Environment,
} from "@axelar-network/axelarjs-sdk";
import { ethers } from "ethers";

const api = new AxelarGMPRecoveryAPI({
  environment: Environment.TESTNET,
});

async function recoverTx(txHash: string) {
  const response = await api.manualRelayToDestChain(txHash);
  console.log(response);
}

recoverTx("0x65374e73567b90fa4eb0cdfd4dc2f6a01ecb2b17d4d2e423d094586d0edd8155");
