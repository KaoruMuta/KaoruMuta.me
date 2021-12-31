export const formatDate = (dateString: string) => {
  const currentDate = new Date(dateString.replace(/-/g, '/'));
  const formatString = `${currentDate.getFullYear()}年${currentDate.getMonth() + 1}月${currentDate.getDate()}日`;
  return formatString;
};
