const xrpl = require("xrpl");

export const XRPLLogin = async () => {
  try {
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
    await client.connect();
    console.log("network connect success!!");

    // 유저 생성
    const wallet = (await client.fundWallet(null, { faucetHost: undefined }))
      .wallet;
    console.log("create your wallet address!!");

    // 계정의 xrp를 조회
    const balance = await client.getXrpBalance(wallet.address);
    console.log("get your xrp balance!!");

    // 연결 끊기
    await client.disconnect();
    console.log("network disconnect success!!");

    return {
      user: {
        wallet: {
          classicAddress: wallet.classicAddress,
          privateKey: wallet.privateKey,
          publicKey: wallet.publicKey,
          seed: wallet.seed,
        },
        balance: balance,
      },
    };
  } catch (error) {
    console.log("Error : ", error);
  }
};

export async function sendTokens(issuer, receivers) {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();
  console.log("network connect!");

  const issuerWallet = xrpl.Wallet.fromSeed(issuer);

  // 최신 원장 시퀀스 번호 가져오기
  const ledgerResponse = await client.request({ command: "ledger_current" });
  const latestLedgerSequence = ledgerResponse.result.ledger_current_index;
  console.log("Latest Ledger Sequence:", latestLedgerSequence);

  // 티켓 발급 트랜잭션
  const ticketCreateTx = {
    TransactionType: "TicketCreate",
    Account: issuerWallet.classicAddress,
    TicketCount: receivers.length * 2, // 각 수신자당 FT와 NFT 두 개의 트랜잭션에 필요한 티켓
  };
  const ticketResponse = await client.submitAndWait(ticketCreateTx, {
    wallet: issuerWallet,
  });

  // 발급된 첫 번째 티켓 시퀀스 번호 가져오기
  let ticketSequence = ticketResponse.result.Sequence;

  // 문자열을 16진수로 변환하는 함수
  function stringToHex(str) {
    return Buffer.from(str, "utf8").toString("hex");
  }

  for (const receiver of receivers) {
    console.log("receiver : ", receiver);

    // FT 전송 트랜잭션
    const ftTx = {
      TransactionType: "Payment",
      Account: issuerWallet.classicAddress,
      Destination: receiver,
      Amount: "1000000", // 1 XRP in drops
      LastLedgerSequence: latestLedgerSequence + 20, // 최신 원장 번호보다 20 높게 설정
      TicketSequence: ticketSequence++, // 티켓 시퀀스 하나 사용
    };

    const ftResponse = await client.submit(ftTx, {
      wallet: issuerWallet,
    });
    console.log(`FT 전송 결과 (${receiver}):`, ftResponse.result);

    // NFT 전송 트랜잭션 (NFT의 경우)
    const nftTx = {
      TransactionType: "NFTokenMint",
      Account: issuerWallet.classicAddress,
      URI: stringToHex("https://example.com/nft_metadata"), // URI를 16진수 형식으로 변환
      TransferFee: 0,
      NFTokenTaxon: 0, // NFT Taxon 필드 추가 (0 또는 다른 값 사용 가능)
      LastLedgerSequence: latestLedgerSequence + 20, // 동일한 원장 시퀀스 사용
      TicketSequence: ticketSequence++, // 또 다른 티켓 시퀀스 사용
    };

    const nftResponse = await client.submitAndWait(nftTx, {
      wallet: issuerWallet,
    });
    console.log(`NFT 전송 결과 (${receiver}):`, nftResponse.result);
  }

  await client.disconnect();
}
