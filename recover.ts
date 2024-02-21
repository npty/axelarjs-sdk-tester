import {
  AxelarGMPRecoveryAPI,
  Environment,
} from "@axelar-network/axelarjs-sdk";

const api = new AxelarGMPRecoveryAPI({
  environment: Environment.TESTNET,
});

async function recoverTx(txHash: string) {
  const response = await api.manualRelayToDestChain(txHash);
  console.log(response);
}

recoverTx("899445C63A4699522656A2CAC9B6B2D1BEE4486E5513D552B63B91048685085A");
