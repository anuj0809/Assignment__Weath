import compassBackground from "@/public/illustrations/compassBackground.svg";
import compassNeedle from "@/public/illustrations/compassNeedle.svg";
import windIcon from "@/public/icons/wind.png";
import Image from "next/image";

const rotateClasses = {
  W: "rotate-0",
  WNW: "rotate-[22.5deg]",
  NW: "rotate-45",
  NNW: "rotate-[67.5deg]",
  N: "rotate-90",
  NNE: "rotate-[112.5deg]",
  NE: "rotate-[135deg]",
  ENE: "rotate-[157.5deg]",
  E: "rotate-180",
  ESE: "rotate-[202.5deg]",
  SE: "rotate-[225deg]",
  SSE: "rotate-[247.5deg]",
  S: "rotate-[270deg]",
  SSW: "rotate-[292.5deg]",
  SW: "rotate-[315deg]",
  WSW: "rotate-[337.5deg]",
};
const hoverClasses = {
  W: "group-hover:rotate-[360deg]",
  WNW: "group-hover:rotate-[382.5deg]",
  NW: "group-hover:rotate-[405deg]",
  NNW: "group-hover:rotate-[427.5deg]",
  N: "group-hover:rotate-[450deg]",
  NNE: "group-hover:rotate-[472.5deg]",
  NE: "group-hover:rotate-[495deg]",
  ENE: "group-hover:rotate-[517.5deg]",
  E: "group-hover:rotate-[540deg]",
  ESE: "group-hover:rotate-[562.5deg]",
  SE: "group-hover:rotate-[585deg]",
  SSE: "group-hover:rotate-[607.5deg]",
  S: "group-hover:rotate-[630deg]",
  SSW: "group-hover:rotate-[652.5deg]",
  SW: "group-hover:rotate-[675deg]",
  WSW: "group-hover:rotate-[697.5deg]",
};

function WindCard({ windSpeed, direction }) {
  return (
    <div className="card w-32 glass group">
      <div className="card-body p-2">
        <div className="relative">
          <img
            src={compassBackground.src}
            alt="compass"
            className="relative opacity-90 select-none pointer-events-none"
          />
          <img
            src={compassNeedle.src}
            alt="compass needle"
            className={`absolute top-[3.2rem] left-[1.1rem] opacity-90 select-none pointer-events-none transform ${rotateClasses[direction]} transition-transform duration-700 ease-in-out ${hoverClasses[direction]}`}
            width={80}
          />
        </div>
        <div
          className="flex gap-2 justify-center items-center px-2 pb-2 tooltip select-none pointer-events-none"
          data-tip="Wind"
        >
          <Image src={windIcon.src} alt="" height={24} width={24} />
          <p className="font-bold text-center text-sm whitespace-nowrap">
            {windSpeed.toFixed(2)}m/s {direction}
          </p>
        </div>
      </div>
    </div>
  );
}

export default WindCard;
