"use client";
import React, { useState } from 'react'
import { XRPLLogin } from '../xrpl';

const Login = () => {
  const [users, setUsers] = useState([
    {
      address: "",
      balance: 0,
      seed: "",
    },
    {
      address: "",
      balance: 0,
      seed: "",
    },
    {
      address: "",
      balance: 0,
      seed: "",
    },
    {
      address: "",
      balance: 0,
      seed: "",
    },
  ]);

  const userLogin = async (index) => {
    // 새로운 유저 생성
    const wallet = await XRPLLogin();
    console.log("your wallet :", wallet);

    // 새로운 유저 데이터 업데이트
    const user = {
      address: wallet.user.wallet.classicAddress,
      balance: wallet.user.balance,
      seed: wallet.user.wallet.seed,
    };

    const updatedUsers = [...users];
    updatedUsers[index] = user;

    setUsers(updatedUsers);
  }

  return (
    <section className=' flex gap-[50px] items-center justify-center'>
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
                  <span>{item.address}</span>
                  <span>{item.balance}</span>
                  <span>{item.seed}</span>
                </div>
              ) : null}
            </div>
          );
        })}
    </section>
  );
}

export default Login