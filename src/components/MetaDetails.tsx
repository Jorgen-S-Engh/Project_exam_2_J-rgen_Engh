import { Wifi, PawPrint, Utensils, CircleParking } from "lucide-react";

type MetaProps = {
  wifi: boolean;
  pets: boolean;
  breakfast: boolean;
  parking: boolean;
};

export default function MetaDetails({
  wifi,
  pets,
  breakfast,
  parking,
}: MetaProps) {
  return (
    <>
      <div className="flex gap-2">
        {wifi ? <Wifi /> : null}
        {pets ? <PawPrint /> : null}
        {breakfast ? <Utensils /> : null}
        {parking ? <CircleParking /> : null}
      </div>
    </>
  );
}
