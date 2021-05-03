export default function shouldAddBracket(inputArray) {
  return inputArray.split("(").length !== inputArray.split(")").length;
}
