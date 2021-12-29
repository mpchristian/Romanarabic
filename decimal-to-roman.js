let string = '3724';

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


function transform(rest, pot) {
  let nexUnit = 10 ** (pot + 1);
  let actualUnit = 10 ** pot;
  let result = '';

  if (rest === 1) {
    result = `${decCharToRoman(actualUnit)}`;
  } else if (rest <= 3) {
    for (let i=1; i<= rest; i+=1) {
      result=`${result}${decCharToRoman(actualUnit)}`;
    }
  } else if (rest < 5) {
    result = `${decCharToRoman(actualUnit)}${decCharToRoman(nexUnit / 2)}`;
  } else if (rest === 5) {
    result = `${decCharToRoman(rest *actualUnit)}`;
  } else if (rest < 9) {
    result = `${decCharToRoman(nexUnit / 2)}`;
    for (let i=1; i<= rest-5; i+=1) {
      result=`${result}${decCharToRoman(actualUnit)}`;
    }
  } else { // rest === 9
    result = `${decCharToRoman(actualUnit)}${decCharToRoman(nexUnit)}`;
  }

  return result;
}

let counter = 0;
let array = '';
function test1(number) {
  if (number === 0) {
    return array;
  }
  let rest = number % 10;

  array = `${transform(rest, counter)}${array}`;

  counter += 1;
  number = Math.floor(number / 10);
  return test1(number);
}

console.log(test1(3724));