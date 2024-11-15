export function getCurrentMonthFormatted() {
  const currentDate = new Date(); // Get the current date
  const options = { month: "short", year: "numeric" }; // Formatting options
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    currentDate
  );

  // Add a comma between month and year
  return formattedDate.replace(" ", ", ");
}
