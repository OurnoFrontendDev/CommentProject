import dayjs from 'dayjs';

export const timeAgo = (createdAt: string) => {
  const createdDate = dayjs(createdAt);
  const now = dayjs();

  const diffInMinutes = now.diff(createdDate, 'minute');
  const diffInHours = now.diff(createdDate, 'hour');
  const diffInDays = now.diff(createdDate, 'day');

  if (diffInMinutes < 1) {
    return 'now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} h ago`;
  } else {
    return `${diffInDays} d ago`;
  }
};
