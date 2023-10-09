export function convertTime(timeString) {
  const [time, period] = timeString.split(" ");
  const [hours, minutes] = time.split(":");
  let hours24 = parseInt(hours, 10);

  if (period === "PM" && hours24 !== 12) {
    hours24 += 12;
  } else if (period === "AM" && hours24 === 12) {
    hours24 = 0;
  }

  return { hours: hours24, minutes: parseInt(minutes, 10) };
}
