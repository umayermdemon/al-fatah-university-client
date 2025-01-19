export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const gender = ["male", "female", "other"];

export const monthOptions = monthNames.map((item) => ({
  value: item,
  label: item,
}));

export const genderOptions = gender.map((item) => ({
  value: item,
  label: item,
}));
