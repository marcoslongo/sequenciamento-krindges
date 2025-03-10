export function formatDate(data: string): string {
  if (!data) return "Data inválida";

  const dataObj = new Date(data);
  if (isNaN(dataObj.getTime())) return "Data inválida";

  const dia = dataObj.getDate().toString().padStart(2, "0");
  const mes = (dataObj.getMonth() + 1).toString().padStart(2, "0");
  const ano = dataObj.getFullYear();

  return `${dia}/${mes}/${ano}`;
}
