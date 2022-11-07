const cadena = 'hola';
let arrayRepetid = [];

function factorial(n) {
  if(n === 1){
    return n
  } else {
    return n * factorial(n-1) 
  }
}

function Random(n) {
  let random = Math.floor(Math.random() * n);
  while(arrayRepetid.includes(random)) {
    random = Math.floor(Math.random() * n);
  }
  
    arrayRepetid.push(random);
    return random;
  
}

function subStrings(array) {
  let countSubsStrings = factorial(array.length);
  const ArraysubString = new Set();
  while(ArraysubString.size < countSubsStrings){
    let string = '';
    for (let i = 0; i < 4; i++) {
      let random = Random(array.length);
      string += array[random]
    }
    arrayRepetid = [];
    ArraysubString.add(string);
    arrayRepetid.fill('-')
  }
  console.log(ArraysubString)
}

let algo = subStrings(cadena.split(''))