import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import metamask from "../assets/metamask.png";
import { Button } from "react-bootstrap";
import { addWallet } from "../features/walletSlice";

export const WalletConnect = () => {
  // use effect to get current wallet on load
  useEffect(() => {
    getCurrentWallet();
    addWalletListener();
  });

  // Get current wallet
  const [signAdd, setSignAdd] = useState("");
  let signature;

  // Connect Wallet Function on Click
  async function connectWallet() {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        // Metamask is installed
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        // Sign & Verify
        const web3 = new Web3(window.ethereum);
        await web3.eth.personal
          .sign("Login using Wallet", accounts[0])
          .then((result) => {
            signature = result;
            console.log("This is the signature: ", result);
          })
          .catch((err) => {
            console.error(err);
          });
        let signingAddress = web3.eth.accounts.recover(
          "Login using Wallet",
          signature
        );
        setSignAdd(signingAddress);
        dispatch(addWallet(accounts[0]));
      } catch (err) {
        console.error(err);
      }
    } else {
      // Metamask is not installed
      console.log("Please install metamask");
    }
  }

  // Get account info on load automatically
  const getCurrentWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          dispatch(addWallet(accounts[0]));
        } else {
          console.log("Please connect your wallet");
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("Please install metamask");
    }
  };

  // Account Change Listener
  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        dispatch(addWallet(accounts[0]));
        console.log("Account changed to", accounts[0]);
      });
    } else {
      // Metamask is not installed
      dispatch(addWallet(""));
      console.log("Please install metamask.");
    }
  };

  // Wallet Listener Redux Toolkit
  const wallet = useSelector((state) => state.wallet.value);

  // Verifying wallet
  // console.log("Wallet is: ", signAdd);
  // if (wallet.length > 0) {
  // Verifying wallet and notifing user with a toast
  //   if (signAdd.toLowerCase === wallet.toLowerCase) {
  //     toast.success("Wallet Verified!");
  //   } else {
  //     toast.error("Wallet Verification Failed!");
  //   }
  // }
  const dispatch = useDispatch();
  return (
    <div className="d-flex align-items-center flex-column mt-5 mb-5">
      <img src={metamask} alt="" style={{ height: "150px", width: "150px" }} />
      <Button
        onClick={connectWallet}
        disabled={wallet.length > 0 ? true : false}
      >
        {wallet.length > 0
          ? `${wallet.substring(0, 6)}...${wallet.substring(38)}`
          : "Connect Wallet"}
      </Button>
      {wallet > 0 ? (
        ""
      ) : (
        <span className="text-danger">Connect wallet to proceed ahead!</span>
      )}
    </div>
  );
};
