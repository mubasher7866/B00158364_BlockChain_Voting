import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { FaUpload } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addParty } from "../web3/ElectionClient";
import { uploadImage } from "../web3/ipfsHandler";

export const AddParty = (props) => {
  // State
  const [imgURI, setImgURI] = useState("");


  // On change handler for file upload
  const _uploadImage = async (file) => {
    const response = await uploadImage(file);
    console.log("Image URI: ", response);
    setImgURI(response);
  };

  // Deployed Address from route params
  const deployedAddress = useParams().electionId;

  //   Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const partyName = e.target[1].value;
    const email = e.target[2].value;
    const slogan = e.target[3].value;
    const logo = imgURI;
    const officeAddress = e.target[5].value;
    try {
      const res = await addParty(
        deployedAddress,
        partyName,
        email,
        slogan,
        logo,
        officeAddress
      );
      console.log(res);
      if (res.status) {
        toast.success("Party Added Successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Political Party
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="partyForm" onSubmit={handleSubmit}>
          <fieldset>
            <Row xs={1} md={2} className="g-4">
              <Col>
                <Form.Control placeholder="Party name" />
              </Col>
              <Col>
                <Form.Control type="email" placeholder="Email" />
              </Col>
            </Row>
            <Row xs={1} className="g-4 mt-1 mb-3">
              <Col>
                <Form.Control type="text" placeholder="Slogan" />
              </Col>
              <Col>
                <Form.Label htmlFor="partyLogo" className="form-label">
                  Upload Party Logo &nbsp;{" "}
                  <FaUpload color={imgURI === "" ? "red" : "green"} size={20} />
                </Form.Label>
                <Form.Control
                  type="file"
                  required
                  id="partyLogo"
                  onChange={(e) => {
                    _uploadImage(e.target.files[0]);
                  }}
                />
              </Col>
              <Col>
                <Form.Control type="text" placeholder="Office Address" />
              </Col>
            </Row>
            <Button type="submit" disabled={imgURI === "" ? true : false}>
              Submit
            </Button>
          </fieldset>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
