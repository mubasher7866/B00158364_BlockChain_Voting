import React, { useEffect, useState } from "react";
import { Button, Container, Form, Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  getPartyCount,
  getPartyDetails,
  getVoterDetails,
} from "../web3/ElectionClient";
import { AddParty } from "./AddParty";
import { ElectionStats } from "./ElectionStats";
// import { CreateElection } from "./CreateElection";
import { Footer } from "./Footer";
import NavbarTop from "./Navbar";
import { PartiesTable } from "./PartiesTable";
import { VoterDetails } from "./VoterDetails";

export const AdminTabs = () => {
  // State variables
  const [fetchedVoter, setFetchedVoter] = useState([]);
  const [allParties, setAllParties] = useState([]);
  let runOnce = false;

  // Modal state
  const [partyModal, setPartyModal] = useState(false);

  // Modal functions
  const handleShow = () => setPartyModal(true);

  // get deployedAddress from route params
  const deployedAddress = useParams().electionId;

  useEffect(() => {
    if (!runOnce) {
      getAllParties();
      runOnce = true;
    }
  }, []);

  // On submit handler for voter details
  const voterDetailFromContract = async (e) => {
    e.preventDefault();
    const voterId = e.target.voterId.value;
    try {
      const res = await getVoterDetails(deployedAddress, voterId);
      setFetchedVoter(res);
    } catch (err) {
      console.log(err);
    }
  };

  // Get all parties
  const getAllParties = async () => {
    setAllParties([]);
    const partyCount = await getPartyCount(deployedAddress);
    for (let i = 1; i <= partyCount; i++) {
      const party = await getPartyDetails(deployedAddress, i);
      setAllParties((prev) => [...prev, party]);
    }
  };

  return (
    <div>
      <NavbarTop />
      <Container className="py-5 admin-dashboard">
        <h2 className="mt-5 text-center">Admin Dashboard</h2>
        <ElectionStats />
        <Tabs
          defaultActiveKey="party"
          id="uncontrolled-tab-example"
          className="mt-5"
        >
          <Tab eventKey="party" title="Political Party">
            <div className="my-4">
              <h3 className="mb-3">Political Parties</h3>
              <PartiesTable parties={allParties} />
              <Button onClick={handleShow} className="ms-auto d-block">
                Add Party
              </Button>
              <AddParty show={partyModal} onHide={() => setPartyModal(false)} />
            </div>
          </Tab>
          <Tab eventKey="voters" title="Voters">
            <div className="my-3">
              <h3 className="mb-3">Voter Details</h3>
              <Form onSubmit={voterDetailFromContract}>
                <Form.Control
                  type="number"
                  placeholder="Voter ID"
                  id="voterId"
                />
                <Button type="submit" className="mt-3">
                  Submit
                </Button>
              </Form>
              {fetchedVoter && fetchedVoter.length > 0 ? (
                <VoterDetails voterDetails={fetchedVoter} />
              ) : (
                <></>
              )}
            </div>
          </Tab>
        </Tabs>
      </Container>
      <Footer />
    </div>
  );
};
