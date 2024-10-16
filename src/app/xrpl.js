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
    console.log("Error : ",error);
  }
}

export const CreateNFT = async () => {
  try {
     console
     const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
     await client.connect();



  } catch (error) {
    console.log("NFT Error : ", error);
  }
}


export async function issueTickets(seed) {
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


export async function sendTokens(receivers) {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const issuerWallet = xrpl.Wallet.fromSeed("YOUR_ISSUER_WALLET_SEED");
  const ticketSequence = "YOUR_TICKET_SEQUENCE"; // 사용 할 티켓 시퀀스 번호

  for (const receiver of receivers) {
    // FT 전송 트랜잭션
    const ftTx = {
      TransactionType: "Payment",
      Account: issuerWallet.classicAddress,
      Destination: receiver,
      Amount: {
        currency: "USD",
        value: "100", // 각 수신자에게 100 USD 전송
      },
      TicketSequence: ticketSequence, // 티켓을 사용하여 전송
    };

    const ftResponse = await client.submitAndWait(ftTx, {
      wallet: issuerWallet,
    });
    console.log(`FT 전송 결과 (${receiver}):`, ftResponse.result);

    // NFT 전송 트랜잭션 (NFT의 경우)
    const nftTx = {
      TransactionType: "NFTokenMint",
      Account: issuerWallet.classicAddress,
      URI: "https://example.com/nft_metadata", // NFT 메타데이터 URI
      TransferFee: 0,
      TicketSequence: ticketSequence, // 티켓을 사용하여 전송
    };

    const nftResponse = await client.submitAndWait(nftTx, {
      wallet: issuerWallet,
    });
    console.log(`NFT 전송 결과 (${receiver}):`, nftResponse.result);
  }

  await client.disconnect();
}