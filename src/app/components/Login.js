"use client";
import React, { useContext } from "react";
import { XRPLLogin } from "../xrpl";
import { Context } from "../provider";

const Login = () => {
  const { users, setUsers } = useContext(Context);

  const userLogin = async (index) => {
    const wallet = await XRPLLogin();
    console.log("your wallet :", wallet);

    const user = {
      address: wallet.user.wallet.classicAddress,
      balance: wallet.user.balance,
      seed: wallet.user.wallet.seed,
    };

    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];
      updatedUsers[index] = user;
      return updatedUsers;
    });
  };

  return (
    <section className=" flex gap-[50px] items-center justify-center">
      {users &&
        users.map((item, idx) => {
          return (
            <div key={`user${idx + 1}`} className=" flex flex-col gap-[20px]">
              <div className="flex items-center justify-center gap-[20px]">
                <h2>{`user${idx + 1}`}</h2>
                {item.address ? null : (
                  <button onClick={() => userLogin(idx)}>Sign-Up</button>
                )}
              </div>
              {item.address ? (
                <div className=" flex flex-col gap-[10px]">
                  <span>address : {item.address.slice(0, 10)}</span>
                  <span>xrp : {item.balance}</span>
                  <span>seed : {item.seed.slice(0, 10)}</span>
                </div>
              ) : null}
            </div>
          );
        })}
    </section>
  );
};

export default Login;
