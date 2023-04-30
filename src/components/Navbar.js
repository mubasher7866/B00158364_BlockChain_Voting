import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { isDesktop, isTablet } from "react-device-detect";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function NavbarTop() {
  return (
    <div className="shadow-sm">
      <Navbar bg="white" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src={logo} alt="" style={{ maxWidth: "75px" }} />
            {isDesktop || isTablet ? <span>Ireland Elections</span> : ""}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link className="text-black fw-semibold" as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link
                className="text-black fw-semibold"
                as={Link}
                to="/admin"
              >
                Admin
              </Nav.Link>
              <Nav.Link className="text-black fw-semibold" as={Link} to="/">
                Activities
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
