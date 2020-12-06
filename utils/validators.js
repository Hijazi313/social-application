const {default:{isEmail}} = require('validator');


module.exports.validateUserLogin = (email, password)=>{
    const errors = {}
    if(email.trim() === ''){
        errors.email = 'Email is Required'
    }
     if(password.trim() === ''){
        errors.password = 'Password is Required'
    }
    if(!isEmail(email)){
        errors.email = `${email} is not a valid email address`
    }

    return {
        errors,
        valid:Object.keys(errors).length < 1
    }
    
}