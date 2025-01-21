function objectEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

function currDateTime(mydate) {
  const now = new Date(mydate?.replace("PM", "")?.replace("AM", ""));
  const dateTime = now
    .toLocaleString("ms-MY", {
      // timeZone: "UTC",
      hour12: false,
      month: "short",
      day: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      // second: "2-digit",
    })
    .replaceAll("/", " ")
    .replaceAll("pada", "<br/>")
    .replaceAll(",", "<br/>");
  return dateTime;
}
function dateTimeNow() {
  const now = new Date();
  const dateTime = now.toLocaleString("ms-MY", {
    // timeZone: "UTC",
    hour12: false,
    month: "2-digit", // "long",
    day: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
  });
  return dateTime;
}

function currFormat(num) {
  return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
