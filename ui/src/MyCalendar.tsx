import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MyCalendar = ({handleSubmit, type, initialTime}) => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(
    new Date(initialTime),
  );

  const handleCalendarChange = (date: Date | null) => {
    setSelectedDateTime(date);
    handleSubmit(date, type);
  }

  return (
    <DatePicker
      selected={selectedDateTime}
      // onChange={(date: Date | null) => setSelectedDateTime(date)}
      onChange={handleCalendarChange}
      minDate={1628066814000}
      maxDate={1629794814000}
    />
  );
};

export default MyCalendar;