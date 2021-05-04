export default function refineForDisplay(allElements) {
  const OPERATORS = ["+", "-", "/", "*"];
  const allElementsArray = allElements.trim().split(" ");
  for (let i = 0; i < allElementsArray.length; i++) {
    if (
      allElementsArray[i] === "-" &&
      OPERATORS.includes(allElementsArray[i - 1])
    ) {
      allElementsArray.splice(i, 0, "(");
    }
    if (allElementsArray[i - 2] === "(") {
      allElementsArray.splice(i + 1, 0, ")");
    }
  }
  return allElementsArray.join("");
}
