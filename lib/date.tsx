export const formatDate = (dateString: string) => {
  const currentDate = new Date(dateString);
  const formatString = `${currentDate.getFullYear()}年${currentDate.getMonth()}月${currentDate.getDate()}日`;
  return formatString;
};
