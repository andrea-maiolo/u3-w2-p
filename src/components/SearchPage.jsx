import { useState } from "react";
import { Button, Col, Container, Accordion, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //controllo prima l input e lo cambio nello stato
  const handleLocationChange = (e) => {
    let valueToCheck = e.target.value;
    valueToCheck = valueToCheck.charAt(0).toUpperCase() + valueToCheck.slice(1).toLowerCase();
    if (/\d/g.test(valueToCheck) || /[\/`¬!"£$%^&*()_+=\-\/|\\<>\~}{@:{\[\];'#.\/]/g.test(valueToCheck)) {
      setError("City name cannot contain numbers or special characters");
      return;
    }
    setLocation(valueToCheck);
  };

  const handelFormSubmit = (e) => {
    e.preventDefault();
    navigate(`/details/${location}`);
  };

  return (
    <>
      <Container className="vh-100 d-flex flex-column justify-content-center align-items-center text-center ">
        <Row className="w-100">
          <Col xs={12} md={8} lg={6} className="mx-auto">
            <h1 className="mb-4">Pioverà oggi?</h1>
            <Form onSubmit={handelFormSubmit}>
              <Form.Group controlId="search">
                <Form.Control
                  required
                  type="text"
                  placeholder="Dove ti trovi?"
                  className="rounded-pill"
                  value={location}
                  minLength={3}
                  maxLength={15}
                  onChange={handleLocationChange}
                />
                {error && <div className="fs-5 mt-2">{error}</div>}
              </Form.Group>
              <Button className="mt-4 rounded-pill px-4 custom-btn" type="submit">
                Inizia ricerca
              </Button>
            </Form>
            <Accordion className="mt-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Info ricerca</Accordion.Header>
                <Accordion.Body>
                  La ricerca funziona meglio se si usa nome città, codice stato o codice paese.
                  <br />
                  eg. Roma, IT
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SearchPage;
