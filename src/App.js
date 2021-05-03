import React, { useState, useEffect, useRef, useCallback } from "react";
import shouldAddBracket from "./utils/shouldAddBracket";

// prettier-ignore
const NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "+", "-", "*", "/", "Enter", "Escape"];
// prettier-ignore
const idsOfNums = ["zero","one","two","three","four","five","six","seven","eight","nine","decimal", "add", "subtract", "multiply", "divide", "equals", "clear"];

function App() {
  const [currentElement, setCurrentElement] = useState("0");
  const [allElements, setAllElements] = useState([]);
  const [currentDisplay, setCurrentDisplay] = useState("");

  // ! For handling each keypress event
  const handleUserKeyPress = useCallback((event) => {
    const pressedKey = event.key;
    if (NUMBERS.indexOf(pressedKey) !== -1) {
      const currentIndex = NUMBERS.findIndex((x) => x === pressedKey);
      document.getElementById(idsOfNums[currentIndex]).click();
      document
        .getElementById(idsOfNums[currentIndex])
        .classList.add("buttonEventClass");
      setTimeout(function () {
        document
          .getElementById(idsOfNums[currentIndex])
          .classList.remove("buttonEventClass");
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
    setCurrentDisplay(allElements.join(""));
  }, [allElements]);

  // ! For managing number inputs
  const manageNumbers = (someNum) => {
    setAllElements((prevElements) => [...prevElements, someNum]);
    // console.log(currentElement);
    // if (
    //   typeof currentElement === "number" &&
    //   isNaN(parseFloat(currentElement))
    // ) {
    //   clearState();
    //   setElement("");
    // }
    // if (currentDisplay[currentDisplay.length - 2] !== "=") {
    //   if (currentDisplay === "") {
    //     setCurrentDisplay(someNum);
    //   }
    //   if (
    //     currentElement.length === 1 &&
    //     someNum !== "." &&
    //     (currentElement.charAt(0) === "0" ||
    //       currentElement.charAt(0) === "+" ||
    //       currentElement.charAt(0) === "-" ||
    //       currentElement.charAt(0) === "/" ||
    //       currentElement.charAt(0) === "*")
    //   ) {
    //     setCurrentElement(String(someNum));
    //   } else if (
    //     currentElement.length === 1 &&
    //     (currentElement.charAt(0) === 0 ||
    //       currentElement.charAt(0) === "+" ||
    //       currentElement.charAt(0) === "-" ||
    //       currentElement.charAt(0) === "/" ||
    //       currentElement.charAt(0) === "*") &&
    //     someNum === "."
    //   ) {
    //     setCurrentElement("0.");
    //   } else if (
    //     someNum === "." &&
    //     parseFloat(currentElement) % 1 === 0 &&
    //     currentElement.slice(-1) !== "."
    //   ) {
    //     setCurrentElement((prevElement) => `${prevElement}${someNum}`);
    //   } else if (someNum !== ".") {
    //     setCurrentElement((prevElement) => `${prevElement}${someNum}`);
    //   }
    // } else {
    //   clearState();
    //   setCurrentElement(someNum);
    // }
  };

  // // ! For live update
  // const loaded = useRef(false);
  // useEffect(() => {
  //   if (loaded.current) {
  //     if (
  //       typeof currentElement === "number" &&
  //       isNaN(parseFloat(currentElement))
  //     ) {
  //       setCurrentDisplay("NaN");
  //       return;
  //     }
  //     if (currentDisplay[currentDisplay.length - 1] === currentElement) {
  //       return;
  //     }
  //     if (currentDisplay[currentDisplay.length - 2] !== "=") {
  //       if (
  //         (currentElement !== "+" &&
  //           currentElement !== "-" &&
  //           currentElement !== "/" &&
  //           currentElement !== "*") ||
  //         currentElement.charAt(currentElement.length - 1) === "."
  //       ) {
  //         setCurrentDisplay([...allElements, currentElement]);
  //       } else {
  //         setCurrentDisplay([...allElements]);
  //       }
  //     } else {
  //       setCurrentDisplay([...allElements]);
  //     }
  //   } else {
  //     loaded.current = true;
  //   }
  // }, [currentElement, currentDisplay, allElements]);

  // // ! For managing operator inputs
  const manageOperators = (someVal) => {
    setAllElements((prevElements) => [...prevElements, someVal]);
    //   if (
    //     typeof currentElement === "number" &&
    //     isNaN(parseFloat(currentElement))
    //   ) {
    //     return;
    //   }
    //   if (currentDisplay[currentDisplay.length - 2] !== "=") {
    //     if (
    //       (allElements[allElements.length - 2] === "+" ||
    //         allElements[allElements.length - 2] === "-" ||
    //         allElements[allElements.length - 2] === "/" ||
    //         allElements[allElements.length - 2] === "*") &&
    //       (currentElement === "+" ||
    //         currentElement === "-" ||
    //         currentElement === "/" ||
    //         currentElement === "*") &&
    //       allElements[allElements.length - 2].charAt(0) !== "(" &&
    //       someVal !== "-"
    //     ) {
    //       setAllElements(allElements.pop());
    //     }
    //     var someCurrentElement = "";
    //     if (currentElement.slice(-1) === ".") {
    //       someCurrentElement = currentElement.slice(0, -1);
    //     } else {
    //       someCurrentElement = currentElement;
    //     }
    //     var someElement = "";
    //     if (
    //       allElements[allElements.length - 1] === "(-" ||
    //       ((String(allElements[allElements.length - 2]).charAt(0) === "(" ||
    //         String(allElements[allElements.length - 3]).charAt(0) === "(") &&
    //         String(allElements[allElements.length - 1]).charAt(0) === ")" &&
    //         someVal !== "-")
    //     ) {
    //       someElement = ")" + someVal;
    //     } else {
    //       someElement = someVal;
    //     }
    //     if (someVal !== "-") {
    //       if (
    //         (allElements[allElements.length - 2] === ")+" ||
    //           allElements[allElements.length - 2] === ")-" ||
    //           allElements[allElements.length - 2] === ")*" ||
    //           allElements[allElements.length - 2] === ")/") &&
    //         allElements[allElements.length - 1] === "(-" &&
    //         (currentElement === "+" ||
    //           currentElement === "-" ||
    //           currentElement === "/" ||
    //           currentElement === "*")
    //       ) {
    //         setAllElements(allElements.pop());
    //         setAllElements([...allElements, someCurrentElement, someVal]);
    //       }
    //     }
    //     if (someVal !== "-") {
    //       if (
    //         currentElement.charAt(currentElement.length - 1) === "+" ||
    //         currentElement.charAt(currentElement.length - 1) === "-" ||
    //         currentElement.charAt(currentElement.length - 1) === "/" ||
    //         currentElement.charAt(currentElement.length - 1) === "*"
    //       ) {
    //         setAllElements(allElements.pop());
    //         setAllElements([...allElements, someElement]);
    //         setCurrentElement(someVal);
    //       } else {
    //         setAllElements([...allElements, someCurrentElement, someElement]);
    //         setCurrentElement(someVal);
    //       }
    //     } else {
    //       if (
    //         (currentElement.charAt(currentElement.length - 1) === "+" ||
    //           currentElement.charAt(currentElement.length - 1) === "-" ||
    //           currentElement.charAt(currentElement.length - 1) === "/" ||
    //           currentElement.charAt(currentElement.length - 1) === "*") &&
    //         allElements[allElements.length - 1] !== "(-"
    //       ) {
    //         setAllElements([...allElements, `(${someElement}`]);
    //         setCurrentElement(someVal);
    //       } else {
    //         if (
    //           currentElement.charAt(currentElement.length - 1) === "+" ||
    //           currentElement.charAt(currentElement.length - 1) === "-" ||
    //           currentElement.charAt(currentElement.length - 1) === "/" ||
    //           currentElement.charAt(currentElement.length - 1) === "*"
    //         ) {
    //           setAllElements([...allElements]);
    //           setCurrentElement(someVal);
    //         } else {
    //           setAllElements([...allElements, someCurrentElement, someElement]);
    //           setCurrentElement(someVal);
    //         }
    //       }
    //     }
    //     if (
    //       someElement === ")" + someVal &&
    //       String(allElements[allElements.length - 1]).charAt(0) === ")"
    //     ) {
    //       setAllElements([...allElements, someCurrentElement, someVal]);
    //     }
    //   } else {
    //     setAllElements([currentDisplay[currentDisplay.length - 1], someVal]);
    //     setCurrentElement(someVal);
    //   }
  };
  // ! Clearing the state - "AC" button
  const clearState = () => {
    setCurrentElement("0");
    if (currentElement === "0" && String(setCurrentDisplay) === "0,=,0") {
      setCurrentDisplay("");
    }
    if (allElements.length !== 0) {
      setAllElements([]);
    }
  };

  // ! Getting the result from input
  const equalFunc = () => {
    console.log(currentDisplay);
    let expForEval = currentDisplay;
    const lastItem = Number(expForEval.slice(-1)[0]);

    if (!lastItem && lastItem !== 0) expForEval = expForEval.slice(0, -1);
    if (shouldAddBracket(expForEval)) expForEval.concat(")");
    let solution;
    try {
      // eslint-disable-next-line
      solution = eval(expForEval);
      setCurrentDisplay([expForEval, "=", solution].join(""));
    } catch {
      solution = "Not a valid input";
      setCurrentDisplay("");
      setAllElements([]);
    }
    setCurrentElement(solution);
  };

  return (
    <div>
      <div className="allElementWrapper">
        <div className="forDisplayingCurrentAllValues">
          <div className="allValuesDisplay">
            {" "}
            {String(currentDisplay) === "0"
              ? ""
              : String(currentDisplay)
                  .replaceAll(",", "")
                  .replaceAll("*", `\u22C5`) //\u00d7 ! (code for x operator if you wish)
                  .replaceAll("/", `\u00f7`)}
          </div>
          <div id="display" className="currentValuesDisplay">
            {" "}
            {String(currentElement)
              .replaceAll("*", `\u22C5`) //\u00d7 ! (code for x operator if you wish)
              .replaceAll("/", `\u00f7`)}
          </div>
        </div>
        <div className="allButtons grid-container">
          <button
            id="clear"
            className="button grid-item-AC"
            onClick={clearState}
          >
            AC
          </button>
          <button
            id="divide"
            className="button grid-item-/"
            onClick={() => manageOperators("/")}
          >
            {`\u00f7`}
          </button>
          <button
            id="multiply"
            className="button grid-item-*"
            onClick={() => manageOperators("*")}
          >
            {`\u00d7`}
          </button>
          <button
            id="zero"
            className="button grid-item-0"
            onClick={() => manageNumbers(0)}
          >
            0
          </button>
          <button
            id="one"
            className="button grid-item-1"
            onClick={() => manageNumbers(1)}
          >
            1
          </button>
          <button
            id="two"
            className="button grid-item-2"
            onClick={() => manageNumbers(2)}
          >
            2
          </button>
          <button
            id="three"
            className="button grid-item-3"
            onClick={() => manageNumbers(3)}
          >
            3
          </button>
          <button
            id="four"
            className="button grid-item-4"
            onClick={() => manageNumbers(4)}
          >
            4
          </button>
          <button
            id="five"
            className="button grid-item-5"
            onClick={() => manageNumbers(5)}
          >
            5
          </button>
          <button
            id="six"
            className="button grid-item-6"
            onClick={() => manageNumbers(6)}
          >
            6
          </button>
          <button
            id="seven"
            className="button grid-item-7"
            onClick={() => manageNumbers(7)}
          >
            7
          </button>
          <button
            id="eight"
            className="button grid-item-8"
            onClick={() => manageNumbers(8)}
          >
            8
          </button>
          <button
            id="nine"
            className="button grid-item-9"
            onClick={() => manageNumbers(9)}
          >
            9
          </button>
          <button
            id="add"
            className="button grid-item-+"
            onClick={() => manageOperators("+")}
          >
            {`\u002B`}
          </button>
          <button
            id="subtract"
            className="button grid-item--"
            onClick={() => manageOperators("-")}
          >
            {`\u2212`}
          </button>

          <button
            id="decimal"
            className="button grid-item-."
            onClick={() => manageNumbers(".")}
          >
            .
          </button>

          <button
            id="equals"
            className="button grid-item-="
            onClick={equalFunc}
          >
            {`\u003D`}
          </button>
        </div>
      </div>
      <div>
        <h1 className="designBy">
          Design and code by{" "}
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
