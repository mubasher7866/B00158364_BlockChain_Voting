import Web3 from "web3";
import factoryABI from "./FactoryABI";

export const getFactory = async () => {
  try {
    const web3 = new Web3(window.ethereum);
    const factory = new web3.eth.Contract(
      factoryABI,
      "0xC2A845fC68999de103b1ebAeef9bF6d98edAc7AC"
    );
    return factory;
  } catch (err) {
    console.error(err);
  }
};

export const getElections = async (id) => {
  try {
    const factory = await getFactory();
    const data = await factory.methods.getElection(id).call();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const createElection = async (title, desc, time, wallet) => {
  try {
    const factory = await getFactory();
    const data = await factory.methods
      .createElection(title, desc, time)
      .send({ from: wallet });
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getAllElections = async () => {
  try {
    const factory = await getFactory();
    const data = await factory.methods.getAllElections().call();
    return data;
  } catch (err) {
    console.error(err);
  }
}

export const getActiveElections = async () => {
  try {
    const factory = await getFactory();
    const data = await factory.methods.getActiveElections().call();
    return data;
  } catch (err) {
    console.error(err);
  }
}