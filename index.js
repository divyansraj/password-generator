const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");

const uppercaseCheck=document.querySelector('#uppercase');
const lowercaseCheck=document.querySelector('#lowercase');
const numberscaseCheck=document.querySelector('#numbers');
const symbolscaseCheck=document.querySelector('#symbols');

const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".generateButton");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");

const symbols='~`!@#$%^&*()_-+={}[]:;"<,>.?/';


let password="";
let passwordLength=10;
let checkcount=1;
handleSlider();

function handleSlider(){
    inputSlider.value= passwordLength;
    lengthDisplay.innerText= passwordLength;
}


function setIndicator(color) {
    indicator.style.backgroundColor = color;
}


function getRandomInt(min,max){
    return Math.floor(Math.random() * (max-min)) + min;
}

function generateRandomNumber(){
    return getRandomInt(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRandomInt(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRandomInt(65,91));
}

function generateSymbol(){
    const rndNUm = getRandomInt(0,symbols.length);
    return symbols.charAt(rndNUm);
}

 
function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numberscaseCheck.checked) hasNum = true;
    if(symbolscaseCheck.checked) hasSym = true;

    if (hasUpper && hasLower && (hasSym || hasNum) && passwordLength>=8){
        setIndicator("#0f0")
    } else if((hasLower || hasUpper) && (hasNum || hasSym ) && passwordLength>=6){
        setIndicator("#ff0")
    } else {
        setIndicator("#f00")
    }

}


async function copycontent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }

    catch(e){
        copyMsg.innerText = "failed";
    }
    copyMsg.classList.add("active")
    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000 );
}

function handleCheckBoxChange(){
    checkcount=0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
        checkcount++;
    })

    if(passwordLength < checkcount){
        passwordLength = checkcount;
        handleSlider();
    }
    
}

function shufflePassword(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}



allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})


inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
    copycontent();
})

generateBtn.addEventListener('click', () => {

     if(checkcount <=0) return;

     if(passwordLength < checkcount) {
        passwordLength = checkcount;
        handleSlider;
    }

    password = "";

    let funcArr =[];

    if(uppercaseCheck.checked)
    funcArr.push(generateUpperCase);
    if(lowercaseCheck.checked)
    funcArr.push(generateLowerCase);
    if(numberscaseCheck.checked)
    funcArr.push(generateRandomNumber);
    if(symbolscaseCheck.checked)
    funcArr.push(generateSymbol);

    for(let i=0 ;i< funcArr.length ; i++){
        password += funcArr[i](); 
    }

    for(let i=0; i<passwordLength - funcArr.length ; i++){
        let randIndex = getRandomInt(0, funcArr.length);
        password += funcArr[randIndex]();
    }

    password = shufflePassword(Array.from(password));

     passwordDisplay.value = password;
     
     calcStrength();
})
 