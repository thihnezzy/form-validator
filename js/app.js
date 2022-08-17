const form = document.querySelector('form');

//Get input
const username = document.getElementById('username');
const email = document.getElementById('email');
const password1 = document.getElementById('password');
const password2 = document.getElementById('password-confirmation');


//Show input error msg
const showError = (inp, msg) =>{
    const formControl = inp.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = msg;
    return false;
}

//Show success outline
const showSuccess = (inp) =>{
    const formControl = inp.parentElement;
    formControl.className = 'form-control success';
}

const checkEmail = (email) => {
    if (!String(email)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )){
            showSuccess(email);
        }else
            showError(email, 'Invalid Email');
    };


const checkRequired = (inpArr) =>{
    var flag = true;
    inpArr.forEach(function (input) {
        if (input.value.trim() ===''){
            showError(input, `${getFieldName(input)} is required`);
            flag = false;
        }else{
            if (['username', 'password', 'password-confirmation'].includes(input.id))
                checkLength([input],3,25);
            else if (input.id === 'email'){
                checkEmail(input);
            }  
        }
    })
    return flag;
}

const getFieldName = (inp) =>{
    return inp.id[0].toUpperCase() + inp.id.substring(1)
}

const checkCorrectPassword = (password1, password2) =>{
    if (password1.value.trim() !== password2.value.trim()){
        showError(password1,'')
        showError(password2,'Password must be the same' );
    }else{
        showSuccess(password1);
        showSuccess(password2);
    }
}

const checkLength = (inpArr,min,max) =>{
    inpArr.forEach(function (input) {
        if (input.value.length < min){
            showError(input,`${getFieldName(input)} must be at least ${min} characters`);
        }else if (input.value.length > max){
            showError(input, `${getFieldName(input)} must be less than ${max} characters`);
        }else
        showSuccess(input);
    })
}
//Event Listeners
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    if(checkRequired([username, email,password1, password2])){
        checkCorrectPassword(password1,password2);
    }
    
})