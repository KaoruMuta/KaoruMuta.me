export const formatDate = (date: string) => {
  const currentDate = new Date(date.replace(/-/g, '/'));
  const formatString = `${currentDate.getFullYear()}年${currentDate.getMonth() + 1}月${currentDate.getDate()}日`;
  return formatString;
};
