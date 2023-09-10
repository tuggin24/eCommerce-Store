import { AbstractControl } from "@angular/forms";

export class MyValidator{

    static validPassword(control: AbstractControl){
        const value = control.value;
        if(!containsNumber(value)){
            return {invalid_password: true};
        }
        return null;
    }

    static matchPassword(control: AbstractControl){
        const password = control.get('password')?.value;
        const confirmPassword = control.get('confirmPassword')?.value;
        if(password === confirmPassword){
            return null;
        }
        return {match_error: true};
    }
}

function isNumber(value: string){
    return !isNaN(parseInt(value,10));
}

function containsNumber(value: string){
    return value.split('').find((value) => isNumber(value) ) !== undefined;
}