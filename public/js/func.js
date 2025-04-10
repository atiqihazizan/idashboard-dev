function objectEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

function currDateTime(mydate) {
  try {
    if (!mydate) {
      return dateTimeNow();
    }

    // Parse the specific format: "2025-04-10 12:06:15 PM"
    const [datePart, timePart, meridiem] = mydate.trim().split(' ');
    const [year, month, day] = datePart.split('-');
    const [hours, minutes, seconds] = timePart.split(':');
    
    // Convert hours to 24-hour format if needed
    let hour24 = parseInt(hours);
    if (meridiem?.toUpperCase() === 'PM' && hour24 < 12) {
      hour24 += 12;
    } else if (meridiem?.toUpperCase() === 'AM' && hour24 === 12) {
      hour24 = 0;
    }

    const date = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      hour24,
      parseInt(minutes),
      parseInt(seconds)
    );

    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    const dateTime = date
      .toLocaleString("ms-MY", {
        hour12: false,
        month: "short",
        day: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
      .replaceAll("/", " ")
      .replaceAll("pada", "<br/>")
      .replaceAll(",", "<br/>");
    return dateTime;
  } catch (error) {
    console.warn("Date parsing error:", error, "for input:", mydate);
    return "Invalid date";
  }
}

function dateTimeNow() {
  const now = new Date();
  const dateTime = now.toLocaleString("ms-MY", {
    hour12: false,
    month: "2-digit", // "long",
    day: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  return dateTime;
}

function currFormat(num) {
  return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
