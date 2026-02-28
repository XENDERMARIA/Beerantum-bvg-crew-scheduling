export function generateScheduleFor(driver) {
  const days = ["Mon Mar 3", "Tue Mar 4", "Wed Mar 5", "Thu Mar 6", "Fri Mar 7", "Sat Mar 8", "Sun Mar 9"];
  const shifts = {
    morning: ["05:45", "14:15"],
    day: ["09:00", "17:30"],
    evening: ["13:30", "22:00"]
  };

  const [startTime, endTime] = shifts[driver.shift];

  const matchScore = Math.floor(82 + Math.random() * 16);

  const schedule = days.map((day, i) => {
    const isWeekend = i >= 5;
    const isOff = (driver.weekendOff && isWeekend) || i === 2;

    return {
      day,
      off: isOff,
      start: isOff ? null : startTime,
      end: isOff ? null : endTime,
      line: driver.route,
      relief: driver.preferredRelief,
      hours: isOff ? 0 : driver.hoursPerDay,
    };
  });

  return {
    driverId: driver.id,
    schedule,
    matchScore,
    generatedAt: new Date().toISOString(),
    status: "pending"
  };
}
