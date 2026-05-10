export const formatDate = (date: number) => {
  const currentDate = new Date(date);
  const formatString = `${currentDate.getFullYear()}年${currentDate.getMonth() + 1}月${currentDate.getDate()}日`;
  return formatString;
};
