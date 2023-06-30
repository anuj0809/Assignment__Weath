import rainDropletIcon from "@/public/icons/water-drop-icon.svg";
import snowIcon from "@/public/icons/snow.svg";
import humidityIcon from "@/public/icons/humidity.png";
import Image from "next/image";

function RainCard({ humidity, precipitation, snow }) {
  return (
    <div className="card w-32 glass">
      <div className="card-body p-2">
        <div className="flex gap-2 px-2 tooltip select-none" data-tip="Relative Humidity">
          <Image
            src={humidityIcon.src}
            alt="humidity icon"
            height={24}
            width={24}
            className="ms-[0.1rem]"
          />
          {humidity.toFixed(0)} %
        </div>
        <div className="flex gap-2 px-2 tooltip select-none" data-tip="Rain">
          <Image
            src={rainDropletIcon.src}
            alt="rain drop icon"
            height={24}
            width={24}
            className="px-1"
          />
          {precipitation.toFixed(0)} mm/hr
        </div>
        <div className="flex gap-2 px-2 tooltip select-none" data-tip="Snow">
          <Image src={snowIcon.src} alt="snow icon" height={24} width={24} />
          {snow.toFixed(0)} mm/hr
        </div>
      </div>
    </div>
  );
}

export default RainCard;
