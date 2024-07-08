export function convertTimeFormat(inputTime: string) {
  const date = new Date(inputTime);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const formattedTime = `${formattedHours}:${String(minutes).padStart(2, "0")} ${ampm}, ${day}-${month}-${year}`;
  return formattedTime;
}
