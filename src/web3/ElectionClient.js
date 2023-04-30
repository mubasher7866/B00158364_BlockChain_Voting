import { toast } from "react-toastify";
import Web3 from "web3";
import { electionABI } from "./ElectionABI";

// Get elections from the contract
export const getElection = async (address) => {
  try {
    const web3 = new Web3(window.ethereum);
    const election = new web3.eth.Contract(electionABI, address);
    return election;
  } catch (err) {
    console.error(err);
  }
};

// Get Election Details from the contract using the election address
export const getElectionDetails = async (address) => {
  try {
    const election = await getElection(address);
    console.log(election.methods);
    const data = await election.methods.getElectionDetails().call();
    return data;
  } catch (err) {
    console.error(err);
  }
};

// Get owner from the contract using the election address
export const getOwner = async (address) => {
  try {
    const election = await getElection(address);
    const data = await election.methods.owner().call();
    return data;
  } catch (err) {
    console.error(err);
  }
};

// Add voter to the contract using the election address
export const addVoter = async (
  address,
  name,
  ppsn,
  dob,
  _address,
  photo,
  email
) => {
  try {
    const election = await getElection(address);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(dob);
    const data = await election.methods
      .addVoter(name, ppsn, dob, _address, photo, email)
      .send({ from: accounts[0] });
    return data;
  } catch (err) {
    console.error(err);
  }
};

// Get Voter Details from the contract using the election address
export const getVoterDetails = async (address, id) => {
  try {
    const election = await getElection(address);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const data = await election.methods
      .getVoterDetails(id)
      .call({ from: accounts[0] });
    return data;
  } catch (err) {
    toast.error("Voter not found");
    console.error(err);
  }
};

// Get voter count from the contract using the election address
export const getVoterCount = async (address) => {
  try {
    const election = await getElection(address);
    const data = await election.methods.getNumOfVoters().call();
    return data;
  } catch (err) {
    console.error(err);
  }
};

// Get party count from the contract using the election address
export const getPartyCount = async (address) => {
  try {
    const election = await getElection(address);
    const data = await election.methods.getNumOfParties().call();
    return data;
  } catch (err) {
    console.error(err);
  }
};

// Verify voter using id from the contract using the election address
export const verifyVoter = async (address, id) => {
  try {
    const election = await getElection(address);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const data = await election.methods
      .verifyVoter(id)
      .send({ from: accounts[0] });
    return data;
  } catch (err) {
    console.error(err);
  }
};

// Vote using userId and partyId from the contract using the election address
export const vote = async (address, partyId, userId) => {
  try {
    const election = await getElection(address);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(partyId, userId);
    const data = await election.methods
      .vote(partyId, userId)
      .send({ from: accounts[0] });
    return data;
  } catch (err) {
    console.error(err);
  }
};

// Get party details from the contract using the election address
export const getPartyDetails = async (address, id) => {
  try {
    const election = await getElection(address);
    const data = await election.methods.parties(id).call();
    return data;
  } catch (err) {
    console.error(err);
  }
};

// Get winner from the contract using the election address
export const getWinner = async (address) => {
  try {
    const election = await getElection(address);
    const data = await election.methods.getWinner().call();
    return data;
  } catch (err) {
    console.error(err);
  }
};

// Add party name, slogan, logoUri, mail, and officeAddress using the election address
export const addParty = async (
  address,
  name,
  slogan,
  logoUri,
  mail,
  officeAddress
) => {
  try {
    const election = await getElection(address);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const data = await election.methods
      .addParty(name, slogan, logoUri, mail, officeAddress)
      .send({ from: accounts[0] });
    return data;
  } catch (err) {
    console.error(err);
  }
};

// Get voter id using wallet address from the contract using the election address
export const getVoterId = async (address, _address) => {
  try {
    const election = await getElection(address);
    const data = await election.methods.isRegistered(_address).call();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

// Post verification imageURI with voterId to the contract using the election address
export const postVerification = async (address, voterId, imageURI) => {
  try {
    const election = await getElection(address);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const data = await election.methods
      .uploadVerification(imageURI, voterId)
      .send({ from: accounts[0] });
    return data;
  } catch (err) {
    console.error(err);
  }
};

// Get verification imageURI using wallet from the contract using the election address
export const getVerification = async (address, _address) => {
  try {
    const election = await getElection(address);
    const data = await election.methods
      .checkVerification(_address)
      .call({ from: _address });
    return data;
  } catch (err) {
    console.error(err);
  }
};

// Verify voter using id from the contract using the election address
export const approveVerification = async (address, id) => {
  try {
    const election = await getElection(address);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const data = await election.methods
      .verifyVoter(id)
      .send({ from: accounts[0] });
    return data;
  } catch (err) {
    console.error(err);
  }
};
