import React, { useEffect, useState } from "react";

export default function FullDateParagraph(props) {
  const { weather } = props;
  const [localDate, setLocalDate] = useState("");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    if (weather !== null) {
      const date = new Date(weather.location.localtime);
      const year = date.getFullYear();
      const month = months[date.getMonth()];
      const dateOfMonth = date.getDate();
      const day = daysOfWeek[date.getDay()];

      setLocalDate(`${day}, ${month} ${dateOfMonth}, ${year}`);
    }
  }, [weather]);

  return <p>{localDate}</p>;
}
