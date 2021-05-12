export const countOfComments = (num) => {
  let result;
  const string = num.toString();
  const lastChar = string.charAt(string.length - 1);

  if (isNaN(num)) {
    result = "Ввод не состоит из цифр.";
  } else if (lastChar === "1" && !(num === 11)) {
    result = num + " комментарий";
  } else if (lastChar === "2" && !(num === 12)) {
    result = num + " комментария";
  } else if (lastChar === "3" && !(num === 13)) {
    result = num + " комментария";
  } else if (lastChar === "4" && !(num === 14)) {
    result = num + " комментария";
  } else {
    result = num + " комментариев";
  }

  return result;
};
