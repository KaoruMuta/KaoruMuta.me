export const formatDate = (date: number) => {
  const dateString = String(date);
  const currentDate = new Date(
    Number(dateString.slice(0, 4)),
    Number(dateString.slice(4, 6)) - 1,
    Number(dateString.slice(6, 8)),
  );
  const formatString = `${currentDate.getFullYear()}年${currentDate.getMonth() + 1}月${currentDate.getDate()}日`;
  return formatString;
};
