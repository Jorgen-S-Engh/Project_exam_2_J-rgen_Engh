import { Calendar } from "./ui/calendar";
import { useState } from "react";

export default function MyDatePicker() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const bookedDates = {
    from: new Date(2024, 9, 15),
    to: new Date(2024, 9, 25),
  };

  return (
    <Calendar
      mode="range"
      selected={date}
      onSelect={setDate}
      weekStartsOn={1}
      footer
      disabled={bookedDates}
      className="rounded-md border"
    />
  );
}
