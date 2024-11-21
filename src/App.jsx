import { useEffect, useState } from "react";
import "./App.css";
import Highlights from "./components/Highlights";
import Temperature from "./components/Temperature";

function App() {
  const [city, setCity] = useState("New Delhi");
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = "7668b387380446cda5b74312240711";
  const API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;

  useEffect(() => {
    fetch(API_URL)
      .then((responce) => {
        if (!responce.ok) {
          throw new Error("error");
        }
        return responce.json();
      })
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      })
      .catch((e) => {
        console.error("Error fetching data: ", e);
      });
  }, [city, API_URL]);

  return (
    <div className="bg-[url('https://getwallpapers.com/wallpaper/full/c/6/b/514753.jpg')] bg-cover w-full h-screen flex justify-center align-top">
      <div className="mt-40 w-1/5 h-1/3">
        {weatherData && (
          <Temperature
            setCity={setCity}
            stats={{
              location: weatherData?.location?.name,
              temp: weatherData?.current?.temp_c,
              time: weatherData?.location?.localtime,
              temperature: weatherData?.current?.temp_c,
              condition: weatherData?.current?.condition?.text,
            }}
          />
        )}
      </div>
      <div className="mt-40 w-1/3 h-1/3 p-10 grid grid-cols-2 gap-6">
        <h2 className="text-slate-200 text-2xl col-span-2">
          Today's Highlight
        </h2>
        {weatherData && (
          <>
            <Highlights
              stats={{
                direction: weatherData.current.wind_dir,
                title: "Wind Status",
                unit: "mph",
                value: weatherData.current?.wind_kph,
              }}
            />
            <Highlights
              stats={{
                title: "Humidity",
                value: weatherData.current?.humidity,
                unit: "%",
              }}
            />
            <Highlights
              stats={{
                title: "Visibility",
                unit: "miles",
                value: weatherData.current?.vis_miles,
              }}
            />
            <Highlights
              stats={{
                title: "Air Pressure",
                unit: "mb",
                value: weatherData.current?.pressure_mb,
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
