import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

type signUpForm = {
  name: string;
  surname: string;
  birthday: Date;
  email: string;
  password: string;
  confirmPassword: string;
};

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  private _signUpForm: signUpForm = {
    name: '',
    surname: '',
    birthday: new Date(),
    email: '',
    password: '',
    confirmPassword: '',
  };

  private _isFormSent: boolean = false;

  public get signUpForm(): signUpForm {
    return this._signUpForm;
  }

  public set signUpForm(value: signUpForm) {
    this._signUpForm = value;
  }

  public get isFormSent(): boolean {
    return this._isFormSent;
  }

  public set isFormSent(value: boolean) {
    this._isFormSent = value;
  }

  signUp() {
    console.log(this._signUpForm);
    this.isFormSent = true;
  }
}
