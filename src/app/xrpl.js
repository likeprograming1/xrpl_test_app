const xrpl = require("xrpl");

async function issueTickets(seed) {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const issuerWallet = xrpl.Wallet.fromSeed(seed);

  const ticketTx = {
    TransactionType: "TicketCreate",
    Account: issuerWallet.classicAddress,
    TicketCount: 5, // 5개의 티켓 발행
  };

  const ticketResponse = await client.submitAndWait(ticketTx, {
    wallet: issuerWallet,
  });
  console.log("티켓 발행 결과:", ticketResponse.result);
  await client.disconnect();
}
