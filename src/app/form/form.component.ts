import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { User } from '../user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  typePassword: string = 'password'
  messageForPassword: string = 'Show password'
  result: any

  userForm!: UntypedFormGroup
  roles: string[] = ['Guest', 'Moderator', 'Admin']
  user: User = new User(1, null, null, null, null, null)

  formLabels = {
    name: "Name",
    password: "Password",
    email: "E-mail",
    age: "Age",
    role: "Role",
  }

  formPlaceholder = {
    name: "Required field",
    password: "Required field",
    email: "Required field",
    age: "Required field",
    role: "Сhoose a role",
  }

  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.buildForm()
  }

  private buildForm(): void {
    this.userForm = this.formBuilder.group({
      name: [this.user.name, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      password: [this.user.password, [Validators.required, Validators.minLength(8)]],
      email: [this.user.email, [Validators.required, Validators.pattern(/^[A-Za-z0-9][A-Za-z0-9\.-_]*[A-Za-z0-9]*@([A-Za-z0-9]+([A-Za-z0-9-]*[A-Za-z0-9]+)*\.)+[A-Za-z]*$/)]],
      age: [this.user.age, [Validators.required, Validators.min(18)]],
      role: new UntypedFormControl(),
    })
  }

  onSubmit(): void {
    console.log(this.userForm.value);
    this.result = this.userForm.value;
    this.createControls();
  }

  private createControls(): void {
    this.userForm.controls['name'].setValue('');
    this.userForm.controls['password'].setValue('');
    this.userForm.controls['email'].setValue('');
    this.userForm.controls['age'].setValue('');
    this.userForm.controls['role'].setValue('');
  }

  showHidePassword(): void {
    this.typePassword === 'password' ? this.typePassword = 'text' : this.typePassword = 'password'
    this.formLabels.password === 'Hide password' ? this.formLabels.password = 'Show password' : this.formLabels.password = 'Hide password'
  }
}
