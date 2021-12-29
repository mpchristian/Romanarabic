let roman = 'M'; // 49

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

function convertToDecimals(string,sum) {
  if (string.length === 0) {
    return sum;
  }
  let past = romanCharToNumber(string[0]);
  sum = sum + past;
  string=string.slice(1);
  if (string.length === 0) {
    return sum;
  }
  if ( past <romanCharToNumber(string[0])) {
    sum = sum + romanCharToNumber(string[0]) - 2*past;
    string=string.slice(1);
  }
  return convertToDecimals(string,sum);
}
let result = convertToDecimals(roman,0);

console.log(result);
