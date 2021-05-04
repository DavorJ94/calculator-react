export default function checkIfLastOperator(input, allElements) {
  const OPERATORS = ["+", "-", "/", "*"];
  const arrayElements = allElements.trim().split(" ");
  return OPERATORS.includes(arrayElements[arrayElements.length - 1]);
}
