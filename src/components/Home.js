import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getActiveElections } from "../web3/FactoryClient";
import { Footer } from "./Footer";
import NavbarTop from "./Navbar";
import { WalletConnect } from "./WalletConnect";

export default function Home() {
  // State variables
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);

  // Import wallet from Redux store
  const wallet = useSelector((state) => state.wallet.value);

  // Get all elections from the contract on load
  useEffect(() => {
    _getAllElections();
  }, []);

  // Get all elections from the contract
  const _getAllElections = async () => {
    const allElections = await getActiveElections();
    setElections(allElections);
    // console.log("All Elections: ", allElections);
    setLoading(false);
  };

  return (
    <div>
      <NavbarTop />
      <WalletConnect />
      <Container style={{ minHeight: "80vh" }}>
        <h1 className="text-center mt-5">Welcome to Ireland Elections</h1>
        <h3 className="text-center mt-3">
          A Decentralized Voting System on the Polygon Blockchain
        </h3>

        <h4 className="text-center mt-5">How to use this website</h4>
        <p className="text-center mt-3">
          This website is a decentralized voting system on the Polygon
          blockchain. It allows you to create your own elections and vote in
          other elections. You can also view the results of the elections.
        </p>
        <p className="text-center mt-3">
          To vote in an election, you must first connect your wallet. You can
          connect your wallet by clicking on the "Connect Wallet" button on the
          page. You can use Metamask or any other Polygon wallet. Once you have
          connected your wallet, you can vote in an election by selecting it,
          then you will be redirected to a page where you can enter your details
          to vote in the election.
        </p>

        <h4 className="text-center mt-5">How to use the website as an admin</h4>
        <p className="text-center mt-3">
          To create an election, you must first connect your wallet. You can
          connect your wallet by clicking on the "Connect Wallet" button on the
          page. You can use Metamask or any other Polygon wallet. Once you have
          connected your wallet, you can create an election by navigating to the
          "Admin" page on the "Create Election" section of the page. You will be
          redirected to a page where you can create your election. You can also
          view your elections on the "Home Page".
        </p>
        <h4 className="text-center mt-5">Select from Elections to Proceed</h4>
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
                    className={`mt-5 bg-light text-center mx-1 py-2 rounded border text-decoration-none text-dark fw-bold ${
                      election.deployedAddress ===
                      "0x0000000000000000000000000000000000000000"
                        ? "d-none"
                        : null
                    }`}
                    as={Link}
                    to={`/election/${election.deployedAddress}`}
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
      </Container>
      {/* <UserLogin allElections={elections} /> */}
      <Footer />
    </div>
  );
}
