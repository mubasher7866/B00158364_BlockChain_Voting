import React from "react";
import { Table } from "react-bootstrap";

export const PartiesTable = ({ parties }) => {
  return (
    <div>
      <Table
        striped
        bordered
        hover
        responsive
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Logo</th>
            <th>Party Name</th>
            <th>Party Slogan</th>
            <th>Vote Count</th>
            <th>Contact Email</th>
            <th>Office Address</th>
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
              <td>{party[3]}</td>
              <td>{party[1]}</td>
              <td>{party.officeAddress}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
