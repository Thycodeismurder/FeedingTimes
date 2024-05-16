import { Component, EventEmitter, Output, output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../shared/functions/myErrorStateMatcher';
import { UserLogin } from 'src/services/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @Output() emitLogin = new EventEmitter();
  usernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  userLogin: UserLogin = {
    username: null,
    password: null,
  };
  submitForm() {
    if (this.usernameFormControl.valid && this.passwordFormControl.valid) {
      this.userLogin = {
        username: this.usernameFormControl.value,
        password: this.passwordFormControl.value,
      };
      this.emitLogin.emit(this.userLogin);
    }
  }
}
