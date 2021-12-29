// Events for option selecting
let firstEntry = document.querySelector('#firstEntry');
let secondEntry = document.querySelector('#secondEntry');
let answer = document.querySelector('#area2');
let numberEntry = document.querySelector('#area1');

function putMessage() {
  let input = firstEntry.value;
  let message;

  if (input === 'Roman') {
    secondEntry.value = 'Arabic';
    // Event for put a background message on area1, case its Roman
    message = 'Roman';
  } else {
    secondEntry.value = 'Roman';
    // Event for put a background message on area1, case its Arabic
    message = 'Number';
  }
  numberEntry.placeholder = message;
}


firstEntry.addEventListener('click', putMessage);

secondEntry.addEventListener('click', () => {
  let output = secondEntry.value;

  if (output === 'Roman') {
    firstEntry.value = 'Arabic';
  } else {
    firstEntry.value = 'Roman';
  }
  putMessage();
});

// Event for change options by clicking on the button
let button = document.querySelector('#button-change');
button.addEventListener('click', () => {
  let aux = firstEntry.value;
  firstEntry.value = secondEntry.value;
  secondEntry.value = aux;

  let aux2 = answer.innerText;
  answer.innerText = '';
  numberEntry.value = aux2;
  putMessage();

});

// function conversion
function conversion() {
  let entryOption = firstEntry.value;

  if (entryOption === 'Roman') {
    if (numberEntry.value.length === 0 || !isNaN(numberEntry.value)) {
      answer.innerText = '';
      return;
    }
  } else {
    if (isNaN(numberEntry.value) || parseInt(numberEntry.value)>3999) {
      answer.innerText = 'Error';
      return;
    }
  }

  // Convertion table
  if (entryOption === 'Roman') {
    function romanCharToNumber(char) {
      let romanChar = char.toUpperCase();
      let decChar;
      switch (romanChar) {
        case 'I':
          decChar = 1;
          break;
        case 'V':
          decChar = 5;
          break;
        case 'X':
          decChar = 10;
          break;
        case 'L':
          decChar = 50;
          break;
        case 'C':
          decChar = 100;
          break;
        case 'D':
          decChar = 500;
          break;
        case 'M':
          decChar = 1000;
          break;
      }
      return decChar;
    }

    // Algorithm
    function convertToDecimals(string, sum) {
      if (string.length === 0) {
        return sum;
      }
      let past = romanCharToNumber(string[0]);
      sum = sum + past;
      string = string.slice(1);
      if (string.length === 0) {
        return sum;
      }
      if (past < romanCharToNumber(string[0])) {
        sum = sum + romanCharToNumber(string[0]) - 2 * past;
        string = string.slice(1);
      }
      return convertToDecimals(string, sum);
    }
    console.log(numberEntry.value);
    let result = convertToDecimals(numberEntry.value.toString(), 0);

    console.log(result.toString());

    if (result.toString() === 'NaN' || parseInt(result) > 3999) {
      answer.innerText = 'Error';
      return;
    }
    answer.innerText = result;

  } else {


    // Convertion table
    function decCharToRoman(string) {
      let decNumber = parseInt(string);
      let romanChar;
      switch (decNumber) {
        case 1:
          romanChar = 'I';
          break;
        case 5:
          romanChar = 'V';
          break;
        case 10:
          romanChar = 'X';
          break;
        case 50:
          romanChar = 'L';
          break;
        case 100:
          romanChar = 'C';
          break;
        case 500:
          romanChar = 'D';
          break;
        case 1000:
          romanChar = 'M';
          break;
      }
      return romanChar;
    }

    // Transforms the integer rest and the power into roman numerals
    function transform(rest, pot) {
      let nexUnit = 10 ** (pot + 1);
      let actualUnit = 10 ** pot;
      let result = '';

      if (rest === 1) {
        result = `${decCharToRoman(actualUnit)}`;
      } else if (rest <= 3) {
        for (let i = 1; i <= rest; i += 1) {
          result = `${result}${decCharToRoman(actualUnit)}`;
        }
      } else if (rest < 5) {
        result = `${decCharToRoman(actualUnit)}${decCharToRoman(nexUnit / 2)}`;
      } else if (rest === 5) {
        result = `${decCharToRoman(rest * actualUnit)}`;
      } else if (rest < 9) {
        result = `${decCharToRoman(nexUnit / 2)}`;
        for (let i = 1; i <= rest - 5; i += 1) {
          result = `${result}${decCharToRoman(actualUnit)}`;
        }
      } else { // rest === 9
        result = `${decCharToRoman(actualUnit)}${decCharToRoman(nexUnit)}`;
      }
      return result;
    }

    // Algorithm
    let counter = 0;
    let array = '';
    function convertToRoman(number) {
      if (number === 0) {
        return array;
      }
      let rest = number % 10;

      array = `${transform(rest, counter)}${array}`;

      counter += 1;
      number = Math.floor(number / 10);
      return convertToRoman(number);
    }

    // Calling the function
    let result = convertToRoman(parseInt(numberEntry.value));

    console.log(result);

    // print the answer
    answer.innerText = result;
  }

}

// Event for printing the answer
let convertButton = document.querySelector('#button-convert');
convertButton.addEventListener('click', conversion);