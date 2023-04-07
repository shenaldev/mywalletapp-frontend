export function getYear() {
  const newDate = new Date().getFullYear();
  return newDate;
}

export function getMonth() {
  const month = new Date().getMonth();
  return month;
}

export function formatMonthDay(date) {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { day: "2-digit", month: "2-digit" });
}
