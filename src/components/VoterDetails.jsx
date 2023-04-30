import React, { useEffect } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { FaUpload } from "react-icons/fa";
import { uploadImage } from "../web3/ipfsHandler";
import {
  approveVerification,
  getVerification,
  getVoterId,
  postVerification,
} from "../web3/ElectionClient";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const VoterDetails = ({ voterDetails }) => {
  const [file, setFile] = React.useState(null);
  const deployedAddress = useParams().electionId;
  const [imgURI, setImgURI] = React.useState("");

  // On submit handler for file upload
  const _uploadImage = async (e) => {
    e.preventDefault();
    const response = await uploadImage(file);
    const id = await getVoterId(deployedAddress, voterDetails.wallet);
    toast.info("Sending Verification Request");
    try {
      const res = await postVerification(deployedAddress, id, response);
      if (res.status) {
        toast.success("Verification Request Sent");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error Occured");
    }
  };

  // Check if voter is verified or not on component mount
  useEffect(() => {
    checkVerifies();
    console.log("Checking Verifies");
  }, []);

  const checkVerifies = async () => {
    const status = await getVerification(deployedAddress, voterDetails.wallet);
    if (status !== "Not Verified" && voterDetails.verified === false) {
      toast.warn("Verification Pending");
      setImgURI(status);
    } else if (status === "Not Verified") {
      if (window.location.pathname.includes("admin")) {
        toast.error("Profile Not Verified");
        setImgURI("");
      } else {
        toast.warning("Upload Your ID");
      }
    } else {
      toast.success("Profile Verified");
    }
  };

  const handleApproval = async () => {
    const id = await getVoterId(deployedAddress, voterDetails.wallet);
    try {
      const res = await approveVerification(deployedAddress, id);
      if (res.status) {
        toast.success("Verification Approved");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error Occured");
    }
  };

  return (
    <div className="mt-5 voterDetails">
      <img
        src={voterDetails.photoUri}
        alt=""
        style={{
          width: "100%",
          margin: "auto",
          display: "block",
          maxWidth: "400px",
        }}
      />
      <Table
        striped
        bordered
        hover
        responsive
        className="mx-auto mt-3 bg-light"
        style={{ maxWidth: "700px" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <td>{voterDetails.name}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Address</th>
            <td>{voterDetails.residentialAddress}</td>
          </tr>
          <tr>
            <th>DOB</th>
            <td>{voterDetails.dob}</td>
          </tr>
          <tr>
            <th>PPSN Number</th>
            <td>{voterDetails.ppsnNumber}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{voterDetails.email}</td>
          </tr>
          <tr>
            <th>Wallet</th>
            <td>
              {voterDetails.wallet.slice(0, 6) +
                "..." +
                voterDetails.wallet.slice(-4)}
            </td>
          </tr>
          <tr>
            <th>Verified</th>
            <td
              className={`${
                window.location.pathname.includes("election") ? "d-none" : ""
              }`}
            >
              {voterDetails.verified
                ? "Yes"
                : imgURI && (
                    <>
                      <Button
                        disabled={imgURI === ""}
                        onClick={() => window.open(imgURI, "_blank")}
                        size="sm"
                      >
                        Open Image
                      </Button>
                      <Button
                        disabled={imgURI === ""}
                        onClick={handleApproval}
                        size="sm"
                        className="ms-2"
                        variant="success"
                      >
                        Verify
                      </Button>
                    </>
                  )}
            </td>
            <td
              className={`${
                window.location.pathname.includes("admin") ? "d-none" : ""
              }`}
            >
              {voterDetails.verified ? (
                "Yes"
              ) : (
                <>
                  <Form onSubmit={_uploadImage}>
                    <Form.Group controlId="uploadPhoto">
                      <Form.Label>
                        <FaUpload color={file ? "green" : "red"} />
                        {file ? (
                          <>
                            <span>
                              {" "}
                              {file.name.slice(0, 6)}...{file.name.slice(-6)}
                            </span>
                            <Button type="submit" className="ms-2" size="sm">
                              Submit
                            </Button>
                          </>
                        ) : (
                          " Upload Your ID"
                        )}
                      </Form.Label>
                      <Form.Control
                        type="file"
                        className="d-none"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </Form.Group>
                  </Form>
                </>
              )}
            </td>
          </tr>
          <tr>
            <th>Voted</th>
            <td>{voterDetails.voted ? "Yes" : "No"}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
