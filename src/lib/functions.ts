export function applyDateMask(event: React.ChangeEvent<HTMLInputElement>) {
  const input = event.target;
  let value = input.value.replace(/\D/g, ""); // Remove caracteres não numéricos

  if (value.length > 2) {
    value = `${value.slice(0, 2)}/${value.slice(2)}`;
  }
  if (value.length > 5) {
    value = `${value.slice(0, 5)}/${value.slice(5, 9)}`;
  }

  input.value = value.slice(0, 10); // Limita ao máximo de 10 caracteres
}
export function formatToDDMMYYYY(date: string) {
  return new Date(date).toLocaleDateString("pt-br", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
}
export function parseToYYYYMMDD(date: string) {
  const [day, month, year] = date.split("/");
  return `${year}-${month}-${day}`;
}
