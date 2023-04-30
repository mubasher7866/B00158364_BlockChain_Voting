import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllElections } from "../web3/FactoryClient";
import { CreateElection } from "./CreateElection";

export default function AdminBody() {
  // State variables
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);

  // Import wallet from Redux store
  const wallet = useSelector((state) => state.wallet.value);

  useEffect(() => {
    _getAllElections();
  }, []);

  // Get all elections from the contract
  const _getAllElections = async () => {
    const allElections = await getAllElections();
    setElections(allElections);
    setLoading(false);
  };

  return (
    <div id="adminBody">
      <Container className="my-5">
        <h2 className="text-center">Admin Panel</h2>
        <p className="text-center">
          This is the admin panel. Here you can create new elections and view
          existing elections as an admin. <br />
          <b className="text-danger">
            Only Admins can view their own Elections
          </b>
        </p>
        <Row className="g-2 mb-5" xs={1} sm={2} md={3} lg={5}>
          {elections ? (
            <>
              {elections.length === 0 && loading ? (
                <Col className="mt-5 bg-light text-center mx-1 py-2 rounded border text-decoration-none text-dark fw-bold">
                  Loading...
                </Col>
              ) : elections.length === 0 && !loading ? (
                <Col className="mt-5 bg-light text-center mx-1 py-2 rounded border text-decoration-none text-dark fw-bold">
                  No Elections Found
                </Col>
              ) : (
                elections.map((election, index) => (
                  <Col
                    key={index}
                    className="mt-5 bg-light text-center mx-1 py-2 rounded text-decoration-none fw-bold"
                    as={Link}
                    style={
                      election.authorityAddress.toLowerCase() !==
                      wallet.toLowerCase()
                        ? {
                            cursor: "not-allowed",
                            border: "1px solid red",
                            color: "red",
                            opacity: "0.5",
                          }
                        : { border: "1px solid green", color: "#000" }
                    }
                    to={
                      election.authorityAddress.toLowerCase() !==
                      wallet.toLowerCase()
                        ? "/"
                        : `/admin/${election.deployedAddress}`
                    }
                    onClick={() => {
                      // setting deployed address in window variable
                      window.selectedElection = election.deployedAddress;
                    }}
                  >
                    {election.electionName}
                  </Col>
                ))
              )}
            </>
          ) : (
            toast.error("Error loading elections")
          )}
        </Row>
        <h3 className="text-center mb-4">OR</h3>
        <div className="border py-4 rounded px-3">
          <h4 className="text-center mb-5">Create a new election</h4>
          <CreateElection />
        </div>
      </Container>
    </div>
  );
}
