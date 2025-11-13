export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  
  const isToday = date.toDateString() === now.toDateString();

  const timeFormat = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  
  if (isToday) {
    return timeFormat.format(date);
  }
  
  const dateFormat = new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short'
  });

  return `${dateFormat.format(date)}, ${timeFormat.format(date)}`;
};

export const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};
