import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Activity } from 'src/services/Activity';
import { Parent } from 'src/services/Parent';
import { User } from 'src/services/User';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnChanges {
  @Input() parent: Parent | undefined;
  @Output() formSubmitEvent = new EventEmitter<Activity>();
  activity: Activity | undefined;
  actionForm = new FormGroup(
    {
      Mother: new FormControl('', Validators.required),
      Father: new FormControl('', Validators.required),
      Action: new FormControl('Feeding', Validators.required),
      Time: new FormControl('', Validators.required),
      Quantity: new FormControl('', Validators.required),
    },
    { updateOn: 'submit' }
  );
  preSelectedAction = 'Feeding';
  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(): void {
    this.actionForm.patchValue({
      Mother: this.parent?.mother,
      Father: this.parent?.father,
    });
  }
  onSubmit() {
    if (!this.actionForm.invalid) {
      //create service need to be done first
      console.log(this.activity);
      this.formSubmitEvent.emit(this.activity);
    } else {
      console.log('hipheierror');
    }
  }
}
