import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidacionService {
  /*formRules = {
    nonEmpty: '^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$',
    usernameMin: 5,
    passwordMin: 6,
    passwordPattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}'
  };
  */

  errorMessages: object = {
    firstName: {
      required: 'First name is required',
    },
    lastName: {
      required: 'Last name is required',
    },
    
    email: {
      required: 'required',
      email: 'Invalid email address',
    },
    
    confirmPassword: {
      required: 'Password confirmation is required',
      passwordMismatch: 'Passwords must match'
    },
    accept: {
      requiredTrue: 'You have to accept our Terms and Conditions'
    },

    generales:{
      obligatorio: 'Este campo es obligatorio',
      formato_mail: 'No se cumple con formato de Email'
    },
    formatos:{
      twodigits: 'solo se permite numeros con dos digitos 00 - 99',
      twodecimals: 'solo se permiten numeros enteros o con 2 decimales 1.99'
    }

    /*
    username: {
      required: 'Username is required',
      minLength: `Username must be ${this.formRules.usernameMin} characters or more`,
      pattern: 'Must contain letters and/or numbers, no trailing spaces'
    },
    password: {
      required: 'Password is required',
      pattern: 'Password must contain: numbers, uppercase and lowercase letters',
      minLength: `Password must be at least ${this.formRules.passwordMin} characters`
    },
    */
  };

  /*
  formErrors = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    accept: false,
  };
  */

  constructor() {}

  public validaEstatus(estatus_form:string): boolean{
    var retorno = false;

    if( estatus_form == 'VALID'){
      retorno = true;
    }

    return retorno;
  }
}
