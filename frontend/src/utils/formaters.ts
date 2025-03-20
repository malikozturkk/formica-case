export const formatTime = (date: Date | string | number): { hour: string; date: string } => {
  const utcDate = date instanceof Date ? date : new Date(date);
  const hours = utcDate.getUTCHours().toString().padStart(2, "0");
  const minutes = utcDate.getUTCMinutes().toString().padStart(2, "0");
  const formattedDate = `${utcDate.getUTCDate().toString().padStart(2, "0")}.${(utcDate.getUTCMonth() + 1).toString().padStart(2, "0")}.${utcDate.getUTCFullYear()}`;
  return {
    hour: `${hours}:${minutes}`,
    date: formattedDate
  };
}

export const formatPrice = (price?: number): string => {
  if (typeof price !== 'number') return "₺0,00";

  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 2
  }).format(price);
};