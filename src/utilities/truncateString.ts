type TruncateString = (str: string, max?: number) => string;

export const truncateString: TruncateString = (str, max = 150) =>
  str.length < max
    ? str
    : `${str.substr(0, str.substr(0, max - 3).lastIndexOf(" "))}...`;
