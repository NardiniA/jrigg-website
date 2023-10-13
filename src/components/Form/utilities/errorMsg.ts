export const errorMsg = (error: any): string => {
  if (error?.message) return error?.message;
  if (error?.type === "required") return "Field is required";
  else return "Invalid Field";
};
