import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  actionForm = this.fb.group(
    {
      Mother: ['', Validators.required],
      Father: ['', Validators.required],
      Action: ['', Validators.required],
      Time: ['', Validators.required],
      Quantity: ['', Validators.required],
    },
    { updateOn: 'submit' }
  );
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
  onSubmit() {
    console.log(this.actionForm.valid);
    if (!this.actionForm.valid) {
      this.actionForm.markAsDirty({ onlySelf: true });
      console.log(this.actionForm.value);
    } else {
      const errors = this.actionForm.errors;
      console.log(errors);
      console.log(this.actionForm.value);
    }
  }
}
