import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getPartyCount, getVoterCount } from "../web3/ElectionClient";

export const ElectionStats = () => {
  // State variables
  const [votersRegistered, setVotersRegistered] = useState(0);
  const [partiesRegistered, setPartiesRegistered] = useState(0);

  // get deployedAddress from route params
  const deployedAddress = useParams().electionId;

  useEffect(() => {
    getVoters();
    getParties();
  }, []);

  // Get voters
  const getVoters = async () => {
    const res = await getVoterCount(deployedAddress);
    setVotersRegistered(res);
  };

  // Get parties
  const getParties = async () => {
    const res = await getPartyCount(deployedAddress);
    setPartiesRegistered(res);
  };

  return (
    <Row className="my-5" xs={1} md={2}>
      <Col className="mb-3">
        <Card className="shadow border-0">
          <Card.Body>
            <h5>Voters Registered</h5>
            <p className="fs-5 fw-bold">{votersRegistered}</p>
          </Card.Body>
        </Card>
      </Col>
      {/* <Col>
            <h5>Voters Voted</h5>
            <p></p>
        </Col> */}
      <Col>
        <Card className="shadow border-0">
          <Card.Body>
            <h5>Parties Registered</h5>
            <p className="fs-5 fw-bold">{partiesRegistered}</p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
