import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  actionForm = this.fb.group({
    Mother: ['', Validators.required],
    Father: ['', Validators.required],
    Action: ['', Validators.required],
    Time: ['', Validators.required],
    Quantity: ['', Validators.required],
  });
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
  onSubmit() {
    console.log(this.actionForm.value);
  }
}
