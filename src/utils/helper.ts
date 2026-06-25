// helper
export function toYYYYMMDD(date: Date): string {
  return date.toISOString().split("T")[0]; // "2027-03-15"
}
