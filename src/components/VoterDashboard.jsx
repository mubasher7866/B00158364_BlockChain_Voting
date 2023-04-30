import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  getPartyCount,
  getPartyDetails,
  getVoterDetails,
} from "../web3/ElectionClient";
import { PartiesTable } from "./PartiesTable";
import { VoterDetails } from "./VoterDetails";
import { VoterParties } from "./VoterParties";
import ReactLoading from "react-loading";

export const VoterDashboard = ({ voterId }) => {
  // State variables
  const [allParties, setAllParties] = useState([]);
  const [fetchedVoter, setFetchedVoter] = useState([]);
  let runOnce = false;

  useEffect(() => {
    if (!runOnce) {
      getAllParties();
      _getVoterDetails();
      runOnce = true;
    }
  }, []);

  // get deployedAddress from route params
  const deployedAddress = useParams().electionId;

  // Get all parties
  const getAllParties = async () => {
    setAllParties([]);
    const partyCount = await getPartyCount(deployedAddress);
    for (let i = 1; i <= partyCount; i++) {
      const party = await getPartyDetails(deployedAddress, i);
      setAllParties((prev) => [...prev, party]);
    }
  };

  // Get voter details
  const _getVoterDetails = async () => {
    const voter = await getVoterDetails(deployedAddress, voterId);
    console.log(voter);
    setFetchedVoter(voter);
  };
  return (
    <Container id="voting-dashboard">
      <Tabs defaultActiveKey="voters" id="uncontrolled-tab-example">
        <Tab eventKey="voters" title="Profile">
          <div className="my-3">
            <h3 className="mb-3">Voter Details</h3>
            {fetchedVoter && fetchedVoter.length > 0 ? (
              <VoterDetails voterDetails={fetchedVoter} />
            ) : (
              <ReactLoading
                type="balls"
                color="#0E1A72"
                height={100}
                width={100}
              />
            )}
          </div>
        </Tab>
        <Tab eventKey="party" title="Voting">
          <div className="my-4">
            <h3 className="mb-3">Political Parties</h3>
            <VoterParties
              parties={allParties}
              voterId={voterId}
              deployedAddress={deployedAddress}
            />
          </div>
        </Tab>
      </Tabs>
    </Container>
  );
};
