export const formatTime = (date: Date): { hour: string; date: string } => {
    const utcDate = new Date(date.toISOString()); 
    const hours = utcDate.getUTCHours().toString().padStart(2, "0");
    const minutes = utcDate.getUTCMinutes().toString().padStart(2, "0");
    const formattedDate = `${utcDate.getUTCDate().toString().padStart(2, "0")}.${(utcDate.getUTCMonth() + 1).toString().padStart(2, "0")}.${utcDate.getUTCFullYear()}`;
    return {
      hour: `${hours}:${minutes}`,
      date: formattedDate
    };
}