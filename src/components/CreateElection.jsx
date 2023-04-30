import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createElection } from "../web3/FactoryClient";

export const CreateElection = () => {
  // import wallet from redux store
  const wallet = useSelector((state) => state.wallet.value);

  // on submit, send the data to create election using contract
  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[1].value;
    const endTime = e.target[2].value;
    const description = e.target[3].value;
    try {
      const res = await createElection(title, description, endTime, wallet);
      //   console.log(res);
      // Success message using react-toastify
      if (res.status) {
        toast.success("Election created successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        //error if the account is not authorised - using react-toastify
        toast.error("Not authorized to create Elections", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Form className="electionForm" onSubmit={handleSubmit}>
        <fieldset>
          <Row xs={1} md={2} className="g-4">
            <Col>
              <Form.Control placeholder="Election Title" required />
            </Col>
            <Col>
              <Form.Control
                type="number"
                required
                placeholder="End Time (in EPOCH): 1677404019"
              />
              <Form.Text className="text-muted">
                Enter the time in EPOCH format from{" "}
                <a
                  href="https://www.epochconverter.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Epoch Converter
                </a>
              </Form.Text>
            </Col>
          </Row>
          <Row xs={1} className="g-4 mt-1 mb-3">
            <Col>
              <Form.Control
                type="text"
                placeholder="Election Description"
                required
              />
            </Col>
          </Row>
          <Button type="submit">Submit</Button>
        </fieldset>
      </Form>
    </div>
  );
};
