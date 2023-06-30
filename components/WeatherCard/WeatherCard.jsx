import Image from "next/image";

function WeatherBox({
  city,
  country,
  temperature,
  weatherIcon,
  weatherDescription,
  longitude,
  latitude,
}) {
  return (
    <div className="card w-64 glass select-none pointer-events-none">
      <div className="card-body items-center">
        <h2 className="card-title justify-center text-2xl whitespace-nowrap">
          {city}, {country}
        </h2>
        <div className="text-6xl text-center">{temperature}°C</div>
        <div className="flex justify-center items-center">
          <Image
            src={`/weatherIcons/${weatherIcon}.png`}
            alt=""
            width={40}
            height={40}
          />
          <div className="font-bold text-slate-400 text-center">
            {weatherDescription}
          </div>
        </div>

        <div className="flex justify-center gap-2">
          <div className="text-center">lon: {longitude.toFixed(2)}</div>
          <div className="text-center">lat: {latitude.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

export default WeatherBox;
