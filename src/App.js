import React, { useState, useEffect, useCallback } from "react";
import checkIfLastOperator from "./utils/checkIfLastOperator";
import checkIfLastTwoOperators from "./utils/checkIfLastTwoOperators";
import refineForDisplay from "./utils/refineForDisplay";
import refineForEvaluation from "./utils/refineForEvaluation";

// prettier-ignore
const BUTTON_CLASSES = ["Escape", "\\/", "\\*",  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "\\+", "\\-", "\\.", "Enter"];

function App() {
  const [currentElement, setCurrentElement] = useState("0");
  const [allElements, setAllElements] = useState("");
  const [currentDisplay, setCurrentDisplay] = useState("");
  const [shouldDisplayUpdate, setShouldDisplayUpdate] = useState(true);

  // ! For handling each keypress event
  const handleUserKeyPress = useCallback((event) => {
    const pressedKey = event.key;
    if (
      BUTTON_CLASSES.indexOf(pressedKey) !== -1 ||
      BUTTON_CLASSES.indexOf("\\" + pressedKey) !== -1
    ) {
      const currentIndex = BUTTON_CLASSES.findIndex(
        (x) => x === pressedKey || x === "\\" + pressedKey
      );
      const currentElement = document.querySelector(
        `.grid-item-${BUTTON_CLASSES[currentIndex]}`
      );
      currentElement.click();
      currentElement.classList.add("buttonEventClass");
      setTimeout(function () {
        currentElement.classList.remove("buttonEventClass");
      }, 100);
    }
  }, []);
  // ! Adding and removing keydown event listeners
  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  useEffect(() => {
    const arrayElements = allElements.trim().split(" ");
    if (arrayElements[arrayElements.length - 1] === "") setCurrentElement("0");
    else {
      setCurrentElement(arrayElements[arrayElements.length - 1]);
    }
  }, [allElements]);

  // ! Displaying values
  useEffect(() => {
    if (!shouldDisplayUpdate) return;
    setCurrentDisplay(() => refineForDisplay(allElements));
  }, [allElements, shouldDisplayUpdate]);

  // ! Manage number inputs
  const manageInputNumber = (input) => {
    if (!shouldDisplayUpdate) clearState();
    if (input === "." && currentElement.includes(".")) return;
    setAllElements((prevNumber) =>
      (prevNumber.slice(-1) === " " || prevNumber.slice(-1) === "") &&
      input === "."
        ? prevNumber.concat("0" + input)
        : prevNumber.concat(input)
    );

    if (input === 0 && currentElement === "0") manageInputNumber(".");
  };

  // ! Manage operator inputs
  const manageInputOperator = (input) => {
    setShouldDisplayUpdate(true);
    if (allElements === "" && input !== "-") return;
    const shouldReplace = checkIfLastTwoOperators(allElements);
    const replaceOperator = checkIfLastOperator(input, allElements);
    if (input === "-") {
      shouldReplace
        ? setAllElements((prevNumber) =>
            prevNumber.slice(0, -5).concat(" " + input + " ")
          )
        : setAllElements((prevNumber) =>
            prevNumber.trim().concat(" " + input + " ")
          );
      return;
    }
    if (!replaceOperator)
      setAllElements((prevNumber) => prevNumber.concat(" " + input + " "));
    else if (shouldReplace) {
      setAllElements((prevNumber) =>
        prevNumber.slice(0, -5).concat(" " + input + " ")
      );
    } else
      setAllElements((prevNumber) =>
        prevNumber.slice(0, -3).concat(" " + input + " ")
      );
  };

  // ! Clearing the state - "AC" button
  const clearState = () => {
    setShouldDisplayUpdate(true);
    setAllElements("");
  };

  // ! Getting the result from input
  const equalFunc = () => {
    if (!shouldDisplayUpdate) return;
    if (!currentDisplay) return;
    const expForEval = refineForEvaluation(currentDisplay);

    // eslint-disable-next-line
    let solution = String(eval(expForEval));
    if (solution.includes(".")) {
      let decimalNumbers = solution.split(".");
      if (decimalNumbers[1].length > 4)
        decimalNumbers[1] = decimalNumbers[1].slice(0, 4);
      solution = decimalNumbers.join(".");
    }
    setShouldDisplayUpdate(false);
    setCurrentDisplay(() => expForEval.concat(`=${solution}`));
    setAllElements(solution);
  };

  return (
    <div>
      <div className="allElementWrapper">
        <div className="forDisplayingCurrentAllValues">
          <div className="allValuesDisplay">
            {" "}
            {String(currentDisplay)
              .replaceAll("*", `\u22C5`)
              .replaceAll("/", `\u00f7`)}
          </div>
          <div className="currentValuesDisplay">
            {" "}
            {String(currentElement)
              .replaceAll("*", `\u22C5`)
              .replaceAll("/", `\u00f7`)}
          </div>
        </div>

        <div className="allButtons grid-container">
          {BUTTON_CLASSES.map((item) => {
            let isOperator = false;
            if (item.charAt(0) === "\\") {
              isOperator = true;
              item = item.slice(1);
            }
            return (
              <button
                className={`button grid-item-${item}`}
                key={`key-${item}`}
                onClick={
                  item === "Escape"
                    ? clearState
                    : item === "Enter"
                    ? equalFunc
                    : item === "."
                    ? () => manageInputNumber(".")
                    : isOperator
                    ? () => manageInputOperator(item)
                    : () => manageInputNumber(item)
                }
              >
                {item === "Escape"
                  ? "AC"
                  : item === "Enter"
                  ? "="
                  : item === "*"
                  ? `\u00d7`
                  : item === "/"
                  ? `\u00f7`
                  : item}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <h1 className="designBy">
          Designed and coded by{" "}
          <a
            href="https://www.linkedin.com/in/davor-jovanovi%C4%87/"
            rel="noreferrer"
            target="_blank"
          >
            DavorJ
          </a>
        </h1>
      </div>
    </div>
  );
}

export default App;
