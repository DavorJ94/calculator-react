(this.webpackJsonpcalculator=this.webpackJsonpcalculator||[]).push([[0],[,,,,,function(module,__webpack_exports__,__webpack_require__){"use strict";var E_Programiranje_FreeCode_Camp_projekti_Front_end_libraries_Project_4_calculator_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(2),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(0),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(1),react__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__),_utils_checkIfLastOperator__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(6),_utils_checkIfLastTwoOperators__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(7),_utils_refineForDisplay__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(8),_utils_refineForEvaluation__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(9),BUTTON_CLASSES=["Escape","\\/","\\*","0","1","2","3","4","5","6","7","8","9","\\+","\\-","\\.","Enter"];function App(){var _useState=Object(react__WEBPACK_IMPORTED_MODULE_2__.useState)("0"),_useState2=Object(E_Programiranje_FreeCode_Camp_projekti_Front_end_libraries_Project_4_calculator_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.a)(_useState,2),currentElement=_useState2[0],setCurrentElement=_useState2[1],_useState3=Object(react__WEBPACK_IMPORTED_MODULE_2__.useState)(""),_useState4=Object(E_Programiranje_FreeCode_Camp_projekti_Front_end_libraries_Project_4_calculator_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.a)(_useState3,2),allElements=_useState4[0],setAllElements=_useState4[1],_useState5=Object(react__WEBPACK_IMPORTED_MODULE_2__.useState)(""),_useState6=Object(E_Programiranje_FreeCode_Camp_projekti_Front_end_libraries_Project_4_calculator_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.a)(_useState5,2),currentDisplay=_useState6[0],setCurrentDisplay=_useState6[1],_useState7=Object(react__WEBPACK_IMPORTED_MODULE_2__.useState)(!0),_useState8=Object(E_Programiranje_FreeCode_Camp_projekti_Front_end_libraries_Project_4_calculator_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.a)(_useState7,2),shouldDisplayUpdate=_useState8[0],setShouldDisplayUpdate=_useState8[1],handleUserKeyPress=Object(react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((function(e){var _=e.key;if(-1!==BUTTON_CLASSES.indexOf(_)||-1!==BUTTON_CLASSES.indexOf("\\"+_)){var t=BUTTON_CLASSES.findIndex((function(e){return e===_||e==="\\"+_})),r=document.querySelector(".grid-item-".concat(BUTTON_CLASSES[t]));r.click(),r.classList.add("buttonEventClass"),setTimeout((function(){r.classList.remove("buttonEventClass")}),100)}}),[]);Object(react__WEBPACK_IMPORTED_MODULE_2__.useEffect)((function(){return window.addEventListener("keydown",handleUserKeyPress),function(){window.removeEventListener("keydown",handleUserKeyPress)}}),[handleUserKeyPress]),Object(react__WEBPACK_IMPORTED_MODULE_2__.useEffect)((function(){var e=allElements.trim().split(" ");""===e[e.length-1]?setCurrentElement("0"):setCurrentElement(e[e.length-1])}),[allElements]),Object(react__WEBPACK_IMPORTED_MODULE_2__.useEffect)((function(){shouldDisplayUpdate&&setCurrentDisplay((function(){return Object(_utils_refineForDisplay__WEBPACK_IMPORTED_MODULE_5__.a)(allElements)}))}),[allElements,shouldDisplayUpdate]);var manageInputNumber=function e(_){shouldDisplayUpdate||clearState(),"."===_&&currentElement.includes(".")||(setAllElements((function(e){return" "!==e.slice(-1)&&""!==e.slice(-1)||"."!==_?e.concat(_):e.concat("0"+_)})),0===_&&"0"===currentElement&&e("."))},manageInputOperator=function(e){if(setShouldDisplayUpdate(!0),""!==allElements||"-"===e){var _=Object(_utils_checkIfLastTwoOperators__WEBPACK_IMPORTED_MODULE_4__.a)(allElements),t=Object(_utils_checkIfLastOperator__WEBPACK_IMPORTED_MODULE_3__.a)(e,allElements);setAllElements("-"!==e?t?_?function(_){return _.slice(0,-5).concat(" "+e+" ")}:function(_){return _.slice(0,-3).concat(" "+e+" ")}:function(_){return _.concat(" "+e+" ")}:_?function(_){return _.slice(0,-5).concat(" "+e+" ")}:function(_){return _.trim().concat(" "+e+" ")})}},clearState=function(){setShouldDisplayUpdate(!0),setAllElements("")},equalFunc=function equalFunc(){if(shouldDisplayUpdate&&currentDisplay){var expForEval=Object(_utils_refineForEvaluation__WEBPACK_IMPORTED_MODULE_6__.a)(currentDisplay),solution=String(eval(expForEval));if(solution.includes(".")){var decimalNumbers=solution.split(".");decimalNumbers[1].length>4&&(decimalNumbers[1]=decimalNumbers[1].slice(0,4)),solution=decimalNumbers.join(".")}setShouldDisplayUpdate(!1),setCurrentDisplay((function(){return expForEval.concat("=".concat(solution))})),setAllElements(solution)}};return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{className:"allElementWrapper",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{className:"forDisplayingCurrentAllValues",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{className:"allValuesDisplay",children:[" ",String(currentDisplay).replaceAll("*","\u22c5").replaceAll("/","\xf7")]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{className:"currentValuesDisplay",children:[" ",String(currentElement).replaceAll("*","\u22c5").replaceAll("/","\xf7")]})]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{className:"allButtons grid-container",children:BUTTON_CLASSES.map((function(e){var _=!1;return"\\"===e.charAt(0)&&(_=!0,e=e.slice(1)),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button",{className:"button grid-item-".concat(e),onClick:"Escape"===e?clearState:"Enter"===e?equalFunc:"."===e?function(){return manageInputNumber(".")}:_?function(){return manageInputOperator(e)}:function(){return manageInputNumber(e)},children:"Escape"===e?"AC":"Enter"===e?"=":"*"===e?"\xd7":"/"===e?"\xf7":e},"key-".concat(e))}))})]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("h1",{className:"designBy",children:["Designed and coded by"," ",Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("a",{href:"https://www.linkedin.com/in/davor-jovanovi%C4%87/",rel:"noreferrer",target:"_blank",children:"DavorJ"})]})})]})}__webpack_exports__.a=App},function(e,_,t){"use strict";function r(e,_){var t=_.trim().split(" ");return["+","-","/","*"].includes(t[t.length-1])}t.d(_,"a",(function(){return r}))},function(e,_,t){"use strict";function r(e){return!!e.trim().replace(/\s/g,"").match(/([^\d$\s]{2})$/gm)}t.d(_,"a",(function(){return r}))},function(e,_,t){"use strict";function r(e){for(var _=["+","-","/","*"],t=e.trim().split(" "),r=0;r<t.length;r++)"-"===t[r]&&_.includes(t[r-1])&&t.splice(r,0,"("),"("===t[r-2]&&t.splice(r+1,0,")");return t.join("")}t.d(_,"a",(function(){return r}))},function(e,_,t){"use strict";function r(e){return e.match(/([^\d$\s]{2})$/gm)&&(e=e.slice(0,-2)),isNaN(e.slice(-1))&&")"!==e.slice(-1)&&(e=e.slice(0,-1)),e}t.d(_,"a",(function(){return r}))},function(e,_,t){"use strict";t.r(_);var r=t(0),n=t(1),a=t.n(n),s=t(4),c=t.n(s),l=(t(16),t(5));c.a.render(Object(r.jsx)(a.a.StrictMode,{children:Object(r.jsx)(l.a,{})}),document.getElementById("root"))},,,,,,function(e,_,t){}],[[10,1,2]]]);
//# sourceMappingURL=main.f95ff254.chunk.js.map