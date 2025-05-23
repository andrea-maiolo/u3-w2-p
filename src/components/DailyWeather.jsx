import { Card } from "react-bootstrap";

const DailyWeather = ({ extraInfo }) => {
  const dataGiorno = new Date(extraInfo.dt_txt);
  const giorno = dataGiorno.toLocaleDateString("it-IT", { weekday: "long" });
  const ora = dataGiorno.toTimeString().slice(0, 5);

  console.log(giorno);

  return (
    <Card className="shadow custom-gradient py-5">
      <Card.Body>
        <Card.Title className="fs-3">
          {giorno.charAt(0).toUpperCase() + giorno.slice(1, giorno.length)} {ora}
        </Card.Title>
        <Card.Text className="fs-4">{extraInfo.main.temp}°C</Card.Text>
        <Card.Text className="fs-4">{extraInfo.weather[0].main}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default DailyWeather;
