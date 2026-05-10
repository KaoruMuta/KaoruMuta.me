export const formatDate = (date: number | string) => {
  const currentDate = new Date(typeof date === 'string' ? date.replace(/-/g, '/') : date);
  const formatString = `${currentDate.getFullYear()}年${currentDate.getMonth() + 1}月${currentDate.getDate()}日`;
  return formatString;
};
