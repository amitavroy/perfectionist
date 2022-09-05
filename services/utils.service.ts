export const getLocalDate = (dateTimeString: string) => {
  const newData = new Date(dateTimeString);
  if (!newData) throw new Error("Wrong date format.");
  return newData.toLocaleDateString() + " " + newData.toLocaleTimeString();
};
