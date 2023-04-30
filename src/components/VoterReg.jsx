import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getElectionDetails,
  getVoterId,
} from "../web3/ElectionClient";
import { Footer } from "./Footer";
import { LoginForm } from "./LoginForm";
import NavbarTop from "./Navbar";
import ReactLoading from "react-loading";
import { VoterDashboard } from "./VoterDashboard";

export const VoterReg = () => {
  // State
  const [election, setElection] = useState({});
  const [voterId, setVoterId] = useState(0);
  const [loading, setLoading] = useState(true);

  // import wallet from redux store
  const wallet = useSelector((state) => state.wallet.value);

  // get deployedAddress from route params
  const deployedAddress = useParams().electionId;

  // Call _getElection on component mount
  useEffect(() => {
    _getElection();
    _isVoterRegistered();
  }, []);

  // Get election data from deployedAddress
  const _getElection = async () => {
    const _election = await getElectionDetails(deployedAddress);
    setElection(_election);
  };

  // Check if voter is already registered
  const _isVoterRegistered = async () => {
    const res = await getVoterId(deployedAddress, wallet);
    setVoterId(res);
    setLoading(false);
  };

  return (
    <div>
      <NavbarTop />
      <div className="UserLogin-main">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <ReactLoading
              type="balls"
              color="#0E1A72"
              height={100}
              width={100}
            />
          </div>
        ) : // If voter is not registered, show login form else show voter dashboard
        voterId === "0" ? (
          <LoginForm election={election} />
        ) : (
          <VoterDashboard voterId={voterId} />
        )}
      </div>
      <Footer />
    </div>
  );
};
