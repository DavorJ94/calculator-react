export default function checkIfLastTwoOperators(allElements) {
  const arrayElements = allElements.trim();
  const theVariable = arrayElements
    .replace(/\s/g, "")
    .match(/([^\d$\s]{2})$/gm);
  return theVariable ? true : false;
}
