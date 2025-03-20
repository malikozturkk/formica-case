export const formatTime = (date: Date): { hour: string, date: string } => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
    return {
        hour: `${hours}:${minutes}`,
        date: formattedDate
    };
}