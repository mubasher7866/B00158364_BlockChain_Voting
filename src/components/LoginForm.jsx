import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { addVoter } from "../web3/ElectionClient";
import { useParams } from "react-router-dom";
import { uploadImage } from "../web3/ipfsHandler";
import moment from "moment";
import { FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";

export const LoginForm = ({ election }) => {
  const [imgURI, setImgURI] = useState("");
  // import wallet from redux store
  const wallet = useSelector((state) => state.wallet.value);
  // console.log(wallet);
  // Get deployedAddress from route params
  const deployedAddress = useParams().electionId;

  // On change handler for file upload
  const _uploadImage = async (file) => {
    const response = await uploadImage(file);
    console.log(response);
    setImgURI(response);
  };

  // Submit form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target[1].value;
    const email = e.target[2].value;
    const ppsn = e.target[3].value;
    // convert date to unix timestamp
    const dob = moment(e.target[4].value).unix();
    const address = e.target[6].value;
    try {
      const res = await addVoter(
        deployedAddress,
        fullName,
        ppsn,
        dob,
        address,
        imgURI,
        email
      );
      console.log(res);
      if (res.status) {
        // react toastify to show success or error
        toast.success("Voter Registered Successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form className="loginForm mx-auto px-md-0 px-2" onSubmit={handleSubmit}>
      <h2 className="mb-5">Register to Vote for {election[0]}</h2>
      {/* React Bootstrap Warning Alert to Connect Wallet */}
      {wallet === "" ? (
        <div className="alert alert-warning" role="alert">
          Please connect your wallet to vote
        </div>
      ) : (
        ""
      )}
      <fieldset disabled={wallet === "" ? true : false}>
        <Row xs={1} md={2} className=" g-4">
          <Col>
            <Form.Control placeholder="Full name" required />
          </Col>
          <Col>
            <Form.Control type="email" placeholder="Email" required />
          </Col>
          <Col>
            <Form.Control type="text" placeholder="PPSN" required />
          </Col>
          <Col>
            <Form.Control type="date" required />
          </Col>
          <Col>
            <Form.Label htmlFor="formFile" className="form-label">
              Upload Photograph &nbsp;{" "}
              <FaUpload color={imgURI === "" ? "red" : "green"} size={20} />
            </Form.Label>
            <Form.Control
              type="file"
              required
              id="formFile"
              onChange={(e) => {
                _uploadImage(e.target.files[0]);
              }}
            />
          </Col>
        </Row>
        <Row className="my-4 ">
          <Col>
            <Form.Control type="text" placeholder="Address" required />
          </Col>
        </Row>
        <Button type="submit" disabled={imgURI === "" ? true : false}>
          Submit
        </Button>
      </fieldset>
    </Form>
  );
};
