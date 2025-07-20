export function getYearFromDateString(dateString: string) {
  try {
    const date = new Date(dateString);
    return date.getFullYear();
  } catch (e) {
    return "-";
  }
}
