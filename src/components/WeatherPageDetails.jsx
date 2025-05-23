import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Alert, Image, Carousel } from "react-bootstrap";
import { useEffect, useState } from "react";
import DailyWeather from "./DailyWeather";

function WeatherPageDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const key = "207d28de63c22ef43369793a01b83fb2";
  const [errorData, setErrorData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [daysData, setDaysData] = useState(null);
  const [giornoMain, setGiornoMain] = useState("");

  const fetchWeatherData = async (location) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${key}&units=metric`);

      if (!response.ok) {
        setErrorData("Server non disponibile, riprova più tardi");
      }
      const data = await response.json();

      if (data.cod === "404") {
        setErrorData("Nessuna città  corrisponde al nome cercato, prova di nuovo");
      } else {
        setWeatherData(data);
        getRightDay(data);

        const secondRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${key}&units=metric`);

        if (!secondRes.ok) {
          setErrorData("Server non disponibile, riprova più tardi");
        }

        const daysData = await secondRes.json();

        if (daysData.cod === "404") {
          setErrorData("Nessuna città  corrisponde al nome cercato, prova di nuovo");
        } else {
          setDaysData(daysData);
        }
      }
    } catch (err) {
      console.error("Error:", err.message);
      setErrorData(err.message);
    }
  };

  const getRightDay = (d) => {
    console.log(d);
    const dataMain = new Date(d.dt);
    setGiornoMain(dataMain.toLocaleDateString("it-IT", { weekday: "long", month: "long", day: "numeric" }));
  };

  useEffect(() => {
    fetchWeatherData(params.location);
  }, []);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <>
      {errorData && (
        <Container className="d-flex justify-content-center align-items-center vh-100 flex-column">
          <Alert variant="danger" className="fw-bold fs-3">
            {errorData}
          </Alert>
          <Button className="fs-4 fw-bold custom-btn" onClick={handleBack}>
            Home
          </Button>
        </Container>
      )}
      {weatherData && daysData && (
        <Container className="py-5">
          <Button className="fs-4 fw-bold custom-btn" onClick={handleBack}>
            Home
          </Button>
          <Row className="mt-3">
            <Col>
              <h2 className="text-center">
                {params.location} {weatherData.sys.country}
              </h2>
              <p className="text-center">{giornoMain.toUpperCase()}</p>
              <div className="text-center mb-4">
                <h1>{weatherData.main.temp}°C</h1>
                <p>{weatherData.weather[0].main}</p>
                <Image className="custom-icon img-fluid" src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} />
              </div>
            </Col>
          </Row>
          <Row className="g-3 justify-content-center">
            <Col xs={12} sm={6} md={4} lg={6} className="text-center">
              <Card className="shadow">
                <Card.Body>
                  <Card.Title>Feels like</Card.Title>
                  <Card.Text>{weatherData.main.feels_like}°C</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4} lg={6} className="text-center">
              <Card className="shadow">
                <Card.Body>
                  <Card.Title>Umidità</Card.Title>
                  <Card.Text>{weatherData.main.humidity}%</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4} lg={6} className="text-center">
              <Card className="shadow">
                <Card.Body>
                  <Card.Title>Vento</Card.Title>
                  <Card.Text>{weatherData.wind.speed} km/h</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4} lg={6} className="text-center">
              <Card className="shadow">
                <Card.Body>
                  <Card.Title>Temperatura massima</Card.Title>
                  <Card.Text>{weatherData.main.temp_max}°C</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4} lg={6} className="text-center">
              <Card className="shadow">
                <Card.Body>
                  <Card.Title>Temperature minima</Card.Title>
                  <Card.Text>{weatherData.main.temp_min}°C</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Container className="py-4">
            <Carousel
              interval={1500}
              // interval={null}
              pause="hover"
              controls="true"
            >
              {daysData.list.map((ele) => (
                <Carousel.Item key={ele.dt}>
                  <div className="text-center">
                    <DailyWeather extraInfo={ele} />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </Container>
        </Container>
      )}
    </>
  );
}

export default WeatherPageDetails;
