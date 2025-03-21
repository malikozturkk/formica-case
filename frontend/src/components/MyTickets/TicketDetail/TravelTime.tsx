import { formatTime } from "@/utils/formaters";

const TravelTime = ({ label, time }: { label: string; time: string }) => (
  <div className="flex justify-between">
    <span className="opacity-80 truncate">{label}:</span>
    <span className="font-medium truncate">
      <time className="font-semibold w-max" dateTime={formatTime(time).date}>
        {formatTime(time).date} {formatTime(time).hour}
      </time>
    </span>
  </div>
);

export default TravelTime