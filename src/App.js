import React, { useState, useEffect, useRef, useCallback } from "react";
import $ from "jquery";

function App() {
  const [currentElement, setElement] = useState("0");
  const [allElements, setAllElements] = useState([]);
  const [forShowing, setForShowing] = useState("");
  // prettier-ignore
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "+", "-", "*", "/", "Enter", "Escape"];
  // prettier-ignore
  const idsOfNums = ["zero","one","two","three","four","five","six","seven","eight","nine","decimal", "add", "subtract", "multiply", "divide", "equals", "clear"];

  // ! For adding keypress event listeners
  const handleUserKeyPress = useCallback((event) => {
    event.preventDefault();
    const { key } = event;
    if (numbers.indexOf(key) !== -1) {
      var index = numbers.findIndex((x) => x === key);
      document.getElementById(idsOfNums[index]).click();
      $("#" + idsOfNums[index]).addClass("buttonEventClass");
      setTimeout(function () {
        $("#" + idsOfNums[index]).removeClass("buttonEventClass");
      }, 100);
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  // ! For managing number inputs
  const manageNumbers = (someNum) => {
    if (
      typeof currentElement === "number" &&
      isNaN(parseFloat(currentElement))
    ) {
      clearState();
      setElement("");
    }
    if (forShowing[forShowing.length - 2] !== "=") {
      if (forShowing === "") {
        setForShowing(someNum);
      }
      if (
        currentElement.length === 1 &&
        someNum !== "." &&
        (currentElement.charAt(0) === "0" ||
          currentElement.charAt(0) === "+" ||
          currentElement.charAt(0) === "-" ||
          currentElement.charAt(0) === "/" ||
          currentElement.charAt(0) === "*")
      ) {
        setElement(String(someNum));
      } else if (
        currentElement.length === 1 &&
        (currentElement.charAt(0) === 0 ||
          currentElement.charAt(0) === "+" ||
          currentElement.charAt(0) === "-" ||
          currentElement.charAt(0) === "/" ||
          currentElement.charAt(0) === "*") &&
        someNum === "."
      ) {
        setElement("0.");
      } else if (
        someNum === "." &&
        parseFloat(currentElement) % 1 === 0 &&
        currentElement.slice(-1) !== "."
      ) {
        setElement((prevElement) => `${prevElement}${someNum}`);
      } else if (someNum !== ".") {
        setElement((prevElement) => `${prevElement}${someNum}`);
      }
    } else {
      clearState();
      setElement(someNum);
      setForShowing(someNum);
    }
  };
  // ! For live update
  const loaded = useRef(false);
  useEffect(() => {
    if (loaded.current) {
      if (
        typeof currentElement === "number" &&
        isNaN(parseFloat(currentElement))
      ) {
        setForShowing("NaN");
        return;
      }
      if (forShowing[forShowing.length - 1] === currentElement) {
        return;
      }
      if (forShowing[forShowing.length - 2] !== "=") {
        if (
          (currentElement !== "+" &&
            currentElement !== "-" &&
            currentElement !== "/" &&
            currentElement !== "*") ||
          currentElement.charAt(currentElement.length - 1) === "."
        ) {
          setForShowing([...allElements, currentElement]);
        } else {
          setForShowing([...allElements]);
        }
      } else {
        setForShowing([...allElements]);
      }
    } else {
      loaded.current = true;
    }

    // eslint-disable-next-line
  }, [currentElement, allElements]);

  // ! For managing operator inputs
  const manageOperators = (someVal) => {
    if (
      typeof currentElement === "number" &&
      isNaN(parseFloat(currentElement))
    ) {
      return;
    }
    if (forShowing[forShowing.length - 2] !== "=") {
      if (
        (allElements[allElements.length - 2] === "+" ||
          allElements[allElements.length - 2] === "-" ||
          allElements[allElements.length - 2] === "/" ||
          allElements[allElements.length - 2] === "*") &&
        (currentElement === "+" ||
          currentElement === "-" ||
          currentElement === "/" ||
          currentElement === "*") &&
        allElements[allElements.length - 2].charAt(0) !== "(" &&
        someVal !== "-"
      ) {
        setAllElements(allElements.pop());
      }
      var someCurrentElement = "";
      if (currentElement.slice(-1) === ".") {
        someCurrentElement = currentElement.slice(0, -1);
      } else {
        someCurrentElement = currentElement;
      }

      var someElement = "";
      if (
        allElements[allElements.length - 1] === "(-" ||
        ((String(allElements[allElements.length - 2]).charAt(0) === "(" ||
          String(allElements[allElements.length - 3]).charAt(0) === "(") &&
          String(allElements[allElements.length - 1]).charAt(0) === ")" &&
          someVal !== "-")
      ) {
        someElement = ")" + someVal;
      } else {
        someElement = someVal;
      }
      if (someVal !== "-") {
        if (
          (allElements[allElements.length - 2] === ")+" ||
            allElements[allElements.length - 2] === ")-" ||
            allElements[allElements.length - 2] === ")*" ||
            allElements[allElements.length - 2] === ")/") &&
          allElements[allElements.length - 1] === "(-" &&
          (currentElement === "+" ||
            currentElement === "-" ||
            currentElement === "/" ||
            currentElement === "*")
        ) {
          setAllElements(allElements.pop());
          setAllElements([...allElements, someCurrentElement, someVal]);
        }
      }
      if (someVal !== "-") {
        if (
          currentElement.charAt(currentElement.length - 1) === "+" ||
          currentElement.charAt(currentElement.length - 1) === "-" ||
          currentElement.charAt(currentElement.length - 1) === "/" ||
          currentElement.charAt(currentElement.length - 1) === "*"
        ) {
          setAllElements(allElements.pop());
          setAllElements([...allElements, someElement]);
          setElement(someVal);
        } else {
          setAllElements([...allElements, someCurrentElement, someElement]);
          setElement(someVal);
        }
      } else {
        if (
          (currentElement.charAt(currentElement.length - 1) === "+" ||
            currentElement.charAt(currentElement.length - 1) === "-" ||
            currentElement.charAt(currentElement.length - 1) === "/" ||
            currentElement.charAt(currentElement.length - 1) === "*") &&
          allElements[allElements.length - 1] !== "(-"
        ) {
          setAllElements([...allElements, `(${someElement}`]);
          setElement(someVal);
        } else {
          if (
            currentElement.charAt(currentElement.length - 1) === "+" ||
            currentElement.charAt(currentElement.length - 1) === "-" ||
            currentElement.charAt(currentElement.length - 1) === "/" ||
            currentElement.charAt(currentElement.length - 1) === "*"
          ) {
            setAllElements([...allElements]);
            setElement(someVal);
          } else {
            setAllElements([...allElements, someCurrentElement, someElement]);
            setElement(someVal);
          }
        }
      }
      if (
        someElement === ")" + someVal &&
        String(allElements[allElements.length - 1]).charAt(0) === ")"
      ) {
        setAllElements([...allElements, someCurrentElement, someVal]);
      }
    } else {
      setAllElements([forShowing[forShowing.length - 1], someVal]);

      setElement(someVal);
    }
  };
  // ! Clearing the state - "AC" button
  const clearState = () => {
    // if (String(currentElement) !== "0") {
    setElement("0");
    // }
    if (currentElement === "0" && String(setForShowing) === "0,=,0") {
      setForShowing("");
    }
    if (allElements.length !== 0) {
      setAllElements([]);
    }
  };

  // ! Getting the result from input
  const equalFunc = () => {
    if (forShowing.length !== 0 && forShowing !== 0) {
      if (forShowing[forShowing.length - 2] !== "=") {
        const helpArray = forShowing;
        if (
          helpArray[helpArray.length - 1].charAt(
            helpArray[helpArray.length - 1].length - 1
          ) === "."
        ) {
          helpArray[helpArray.length - 1] = helpArray[
            helpArray.length - 1
          ].substring(0, helpArray[helpArray.length - 1].length - 1);
        }
        if (helpArray[helpArray.length - 2] === "(-") {
          helpArray.push(")");
        }
        if (helpArray[helpArray.length - 1] === "(-") {
          helpArray.pop();
        }
        if (helpArray[helpArray.length - 1].charAt(0) === ")") {
          helpArray[helpArray.length - 1] = helpArray[
            helpArray.length - 1
          ].substring(0, 1);
        }

        if (
          helpArray[helpArray.length - 1].charAt(0) === "+" ||
          helpArray[helpArray.length - 1].charAt(0) === "-" ||
          helpArray[helpArray.length - 1].charAt(0) === "/" ||
          helpArray[helpArray.length - 1].charAt(0) === "*"
        ) {
          helpArray.pop();
        }

        const toUseForShowing = helpArray.slice();

        for (var i = 0; i < helpArray.length; i++) {
          if (helpArray[i] === "(-") {
            helpArray[i + 1] = -1 * parseFloat(helpArray[i + 1]);
            if (helpArray[i + 2] === ")") {
              helpArray.pop();
            } else {
              helpArray[i + 2] = helpArray[i + 2].substring(1);
            }
            helpArray.splice(i, 1);
            i = -1;
            continue;
          }
        }

        for (i = 0; i < helpArray.length; i++) {
          if (helpArray[i] === "/") {
            var helpVar =
              parseFloat(helpArray[i - 1]) / parseFloat(helpArray[i + 1]);
            if (helpArray[i + 2]) {
              helpArray.splice(i + 2, 0, helpVar);
            } else {
              helpArray.push(helpVar);
            }

            helpArray.splice(i - 1, 3);
            i = -1;
          }
        }
        for (i = 0; i < helpArray.length; i++) {
          if (helpArray[i] === "*") {
            helpVar =
              parseFloat(helpArray[i - 1]) * parseFloat(helpArray[i + 1]);
            if (helpArray[i + 2]) {
              helpArray.splice(i + 2, 0, helpVar);
            } else {
              helpArray.push(helpVar);
            }
            helpArray.splice(i - 1, 3);
            i = -1;
          }
        }
        for (i = 0; i < helpArray.length; i++) {
          if (helpArray[i] === "-") {
            helpVar =
              parseFloat(helpArray[i - 1]) - parseFloat(helpArray[i + 1]);
            if (helpArray[i + 2]) {
              helpArray.splice(i + 2, 0, helpVar);
            } else {
              helpArray.push(helpVar);
            }
            helpArray.splice(i - 1, 3);

            i = -1;
          }
        }
        for (i = 0; i < helpArray.length; i++) {
          if (helpArray[i] === "+") {
            helpVar =
              parseFloat(helpArray[i - 1]) + parseFloat(helpArray[i + 1]);
            if (helpArray[i + 2]) {
              helpArray.splice(i + 2, 0, helpVar);
            } else {
              helpArray.push(helpVar);
            }
            helpArray.splice(i - 1, 3);
            i = -1;
          }
        }

        if (parseFloat(helpArray[0]) % 1 !== 0) {
          helpArray[0] = +parseFloat(helpArray[0]).toFixed(10);
          helpArray[0].toString();
        }
        setForShowing([toUseForShowing, "=", helpArray[0]]);
        setElement(helpArray[0]);
      }
    }
  };
  return (
    <div>
      <div className="allElementWrapper">
        <div className="forDisplayingCurrentAllValues">
          <div className="allValuesDisplay">
            {" "}
            {String(forShowing) === "0"
              ? ""
              : String(forShowing)
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
