"use client";
import React, { useContext } from "react";
import { Context } from "../provider";
import { sendTokens } from "../xrpl";

const Send = () => {
  const { users } = useContext(Context);

  const SendClick = async () => {
    let issuer = users[0].seed;
    let receivers = [users[1].address, users[2].address, users[3].address];

    const Send = await sendTokens(issuer, receivers);
    console.log("Send : ", Send);
  };

  return (
    <section className=" flex gap-[50px] items-center justify-center">
      <h1>issuer: user1, receivers: user2 ~ user4</h1>
      <button onClick={SendClick}>Send</button>
    </section>
  );
};

export default Send;
