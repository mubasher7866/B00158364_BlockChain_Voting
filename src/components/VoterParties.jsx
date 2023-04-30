import React from "react";
import { Alert, Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { vote } from "../web3/ElectionClient";

export const VoterParties = ({ parties, voterId, deployedAddress }) => {
  const [voted, setVoted] = React.useState("");
  console.log(voterId);
  // Vote handler
  const voteHandler = async (partyId) => {
    try {
      const res = await vote(deployedAddress, partyId, voterId);
      console.log(res);
      if (res) {
        toast.success("Voted Successfully");
        setVoted(res.transactionHash);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {voted && (
        <Alert variant="success">
          Voted Successfully! View Txn Details{" "}
          <a
            href={`https://mumbai.polygonscan.com/tx/${voted}`}
            className="fw-bold"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
          .
        </Alert>
      )}
      <Table
        striped
        bordered
        hover
        responsive
        style={{
          marginTop: "20px",
          backgroundColor: "white",
        }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Logo</th>
            <th>Party Name</th>
            <th>Party Slogan</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {parties.map((party, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={party[4]}
                  alt={party.partyName}
                  style={{
                    width: "50px",
                    height: "50px",
                    margin: "auto",
                    display: "block",
                  }}
                />
              </td>
              <td>{party.partyName}</td>
              <td>{party[2]}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => voteHandler(index + 1)}
                >
                  Vote
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
