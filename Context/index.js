import React, { useState, useContext, createContext, useEffect } from "react";
import { ethers } from "ethers";

// INTERNAL IMPORT
import {
  CheckIfWalletConnected,
  connectWallet,
  connectingWithContract,
} from "../Utils/apiFeature";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {

  const DAPP_NAME = "GPT_Membership";
  // STATE VARIABLES
  const [address, setAddress] = useState("");
  const [contractMembership, setContractMembership] = useState([]);
  const [Free, setFree] = useState();
  const [userMembership, setUserMembership] = useState({});

  // FETCH DATA TIME OF PAGE LOAD
  const fetchData = async () => {
    try {
      // LOAD FREE TRIAL
      const freeTrail = localStorage.getItem("freeTrail");
      const FREE_TRAIL = JSON.parse(freeTrail);
      setFree(FREE_TRAIL);

      // GET CONTRACT
      const contract = await connectingWithContract();
      const connectAccount = await connectWallet();
      setAddress(connectAccount);

      console.log(connectAccount);

      const oneMonth = await contract.getMembership(1);
      const sixMonth = await contract.getMembership(2);
      const oneYear = await contract.getMembership(3);

      // LIST OF MEMBERSHIPS
      const memberships = [
        {
          memberShip_name: oneMonth?.name,
          memberShip_date: oneMonth?.date,
          memberShip_id: oneMonth?.id.toNumber(),
          memberShip_cost: ethers.utils.formatUnits(
            oneMonth?.cost.toString(),
            "ether"
          ),
        },
        {
          memberShip_name: sixMonth?.name,
          memberShip_date: sixMonth?.date,
          memberShip_id: sixMonth?.id.toNumber(),
          memberShip_cost: ethers.utils.formatUnits(
            sixMonth?.cost.toString(),
            "ether"
          ),
        },
        {
          memberShip_name: oneYear?.name,
          memberShip_date: oneYear?.date,
          memberShip_id: oneYear?.id.toNumber(),
          memberShip_cost: ethers.utils.formatUnits(
            oneYear?.cost.toString(),
            "ether"
          ),
        },
      ];

      setContractMembership(memberships);

      // USER MEMBERSHIP
      const fetchedUserMembership = await contract.getUserMembership(connectAccount);
      
      const formattedUserMembership = {
        addressUser: fetchedUserMembership.addressUser.toLowerCase(),
        expireDate: fetchedUserMembership.expireDate,
        cost: ethers.utils.formatUnits(fetchedUserMembership.cost.toString(), "ether"),
        membershipId: fetchedUserMembership.membershipId.toNumber(),
        id: fetchedUserMembership.id.toNumber(),
      };

      setUserMembership(formattedUserMembership);

      const proMember = JSON.stringify(formattedUserMembership);
      localStorage.setItem("UserDetail", proMember);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const listMembership = async () => {
    // LISTING MEMBERSHIP
    const amount = 5;
    const MEMBERSHIP_NAME = "One Year";
    const MEMBERSHIP_COST = ethers.utils.parseUnits(amount.toString(), "ether");
    const MEMBERSHIP_DATE = "July 31 2023";

    // CONTRACT
    const contract = await connectingWithContract();
    const list = await contract.list(
      MEMBERSHIP_NAME,
      MEMBERSHIP_COST,
      MEMBERSHIP_DATE
    );

    await list.wait();
    console.log(list);
  };

  const buyMembership = async (memberShip_id) => {
    const contract = await connectingWithContract();
    const connectAccount = await connectWallet();
    setAddress(connectAccount);
    try {
      let today, date, expiredDate, money, mintTransaction;
      switch (memberShip_id) {
        case 1:
          today = Date.now() + 2657228546;
          date = new Date(today);
          expiredDate = date.toLocaleDateString("en-US");
          money = ethers.utils.parseEther("1");

          mintTransaction = await contract.mint(
            memberShip_id,
            connectAccount,
            expiredDate.toString(),
            {
              value: money.toString(),
            }
          );
          break;
        case 2:
          today = Date.now() + 2657228546 * 6;
          date = new Date(today);
          expiredDate = date.toLocaleDateString("en-US");
          money = ethers.utils.parseEther("3");

          mintTransaction = await contract.mint(
            memberShip_id,
            connectAccount,
            expiredDate.toString(),
            {
              value: money.toString(),
            }
          );
          break;
        default:
          today = Date.now() + 31601495874;
          date = new Date(today);
          expiredDate = date.toLocaleDateString("en-US");
          money = ethers.utils.parseEther("5");

          mintTransaction = await contract.mint(
            memberShip_id,
            connectAccount,
            expiredDate.toString(),
            {
              value: money.toString(),
            }
          );
      }
      await mintTransaction.wait();
      const freeTrail = JSON.stringify("Pro Member");
      localStorage.setItem("freeTrail", freeTrail);
      console.info("contract call success", mintTransaction);
      window.location.reload();
    } catch (error) {
      console.error("contract call failure", error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        DAPP_NAME,
        listMembership,
        buyMembership,
        connectWallet,
        Free,
        address,
        contractMembership,
        userMembership,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
