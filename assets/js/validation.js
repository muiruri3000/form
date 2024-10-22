const fnameError  = document.querySelector('#fnameError')
const lnameError  = document.querySelector('#lnameError')
const emailError  = document.querySelector('#emailError')
const radioError  = document.querySelector('#radioError')
const textareaError  = document.querySelector('#textareaError')
const consentError  = document.querySelector('#consentError')
const radioButtons = document.querySelectorAll('input[name="query"]');
const formGroupRadio = document.querySelectorAll('.radio-group');
const messageAlert = document.querySelector('.messageAlert'); 
const fname = document.querySelector('#fname'); 
const lname = document.querySelector('#lname'); 
const email = document.querySelector('#email'); 
const message = document.querySelector('#message'); 
const enquiry = document.querySelector('#enquiry'); 
const consent = document.querySelector('#consent'); 



radioButtons.forEach(rdb => {

    rdb.addEventListener('change', radioChange); 
    
});

const form = document.querySelector('.form');

function handleSubmit(e){

    e.preventDefault();


    let hasError = false; 


    const formData = new FormData(e.target); 

    const data = Object.fromEntries(formData); 

    Object.keys(validations).forEach(key=>{
       const errorsExist =  validations[key](data);
        if(errorsExist){
            hasError = true;
        }
       
    });

    if(!hasError){

        setTimeout(() => {
            
            messageAlert.classList.add('showMessage');

            document.querySelector('.form').reset();
            // fname.value='';
            // lname.value='';
            // email.value='';
            // message.value='';
          
        }, 1000);
        setTimeout(() => {
            
            messageAlert.classList.remove('showMessage');
        }, 2500);



    }else{
        messageAlert.classList.remove('showMessage');

    }
}

form.addEventListener('submit',handleSubmit);


const validations = {
    fname:(data)=> nameValidator(data,'fname'),
    lname:(data)=> nameValidator(data,'lname'),
    textarea:(data)=>  textValidator(data, 'message'),
    consent:(data)=> consentValidator(data, 'consent'),
    email:(data)=>validateEmail(data,'email'),
    query:(data)=>radioValidator(data,'query'),
    
}

function nameValidator(data,name){

    

    
    if(!data[name] || data[name].trim() === '' ){
       
        if(name === 'fname'){
       
        fnameError.textContent ='First Name cannot be empty!';
        
        
    }else if(name==='lname'){
        lnameError.textContent ='Last Name cannot be empty!'; 
    }
    return true; 
} else{
    if(name === 'fname'){

        fnameError.textContent = '';
    }else if(name==='lname'){
        
        lnameError.textContent = '';
}
    return false;
}

}
function validateEmail(data,email){
    let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(!data[email].match(pattern) || data[email].trim() === ''){
        emailError.textContent = 'Invalid Email!'; 
        return true;
    }else{
        emailError.textContent = '';
        return false;
    }
}

function textValidator(data, textarea){
    if(data[textarea].trim() ===''){
        textareaError.textContent = 'Cannot be blank. ';
        return true;
    }else{
        textareaError.textContent = '';
        return false;
    }

}
function consentValidator(data, consent){
        if(data[consent] !== 'yes'){
            consentError.textContent = 'You have to agree to proceed!'
            return true;
        }else{
            consentError.textContent = '';
            return false;
        }
    }
function radioValidator(data, radio){
        if(!data[radio]){
            radioError.textContent = 'you must select an option!'
            return true;
        }else{
            radioError.textContent = '';
            return false;
        }
    }
function radioChange(){
    const selectedRadio = document.querySelector('input[name="query"]:checked');

    formGroupRadio.forEach(fgr =>{

      

          
            fgr.classList.remove('inputStyle');

        
    })
    if(selectedRadio){
        selectedRadio.parentElement.classList.add('inputStyle')
    }
}