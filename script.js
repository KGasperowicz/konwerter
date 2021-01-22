const converter = document.querySelector("#converter");
const convert = document.querySelector(".conv");
const reset = document.querySelector(".reset");
const change = document.querySelector(".change");
const result = document.querySelector(".result");
const direction = document.querySelector(".direction");

let unitIn = "C";
let unitOut = "F";
let inputValue = "";
let outputValue = "";
const CtoF = (c) => (c * 9) / 5 + 32;
const FtoC = (f) => ((f - 32) * 5) / 9;

const numberRound = (x) => {
  return Math.round(x * 100) / 100;
};

function updateDOM() {
  converter.value = inputValue;
  direction.innerHTML = `°${unitIn} do °${unitOut}`;

  if (outputValue === null) {
    result.innerHTML = `podaj liczbę`;
  } else if (outputValue != "" && inputValue != "") {
    result.innerHTML = `${inputValue}°${unitIn} to ${outputValue}°${unitOut}`;
  } else {
    result.innerHTML = "";
  }
}

function calculate() {
  inputValue = converter.value;

  if (inputValue == "" || isNaN(inputValue)) {
    outputValue = null;
    updateDOM();
    return;
  } else if (unitIn == "C") {
    outputValue = CtoF(inputValue);
  } else {
    outputValue = FtoC(inputValue);
  }
  outputValue = numberRound(outputValue);
  updateDOM();
}

convert.addEventListener("click", calculate);
converter.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    calculate();
  }
});

function swapUnit() {
  const x = unitIn;
  unitIn = unitOut;
  unitOut = x;

  if (outputValue != "" && outputValue != null) {
    converter.value = outputValue;
    calculate();
  } else {
    inputValue = converter.value;
    updateDOM();
  }
}
change.addEventListener("click", swapUnit);

function clear() {
  converter.value = "";
  inputValue = "";
  outputValue = "";
  updateDOM();
}
reset.addEventListener("click", clear);

updateDOM();
