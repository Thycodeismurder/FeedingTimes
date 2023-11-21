import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Parent } from 'src/services/ParentType';
import { User } from 'src/services/UserType';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnChanges {
  @Input() parent: Parent | undefined;
  @Output() formSubmitEvent = new EventEmitter<User>();
  user: User | undefined;
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
      this.user = {
        Father: this.actionForm.get('Father')?.value,
        Mother: this.actionForm.get('Mother')?.value,
        HeVi: [
          {
            activity: {
              type: 'Feeding',
              quantity: this.actionForm.get('Quantity')?.value,
              time: this.actionForm.get('Time')?.value,
            },
          },
        ],
      };
      console.log(this.user);
      this.formSubmitEvent.emit(this.user);
    } else {
      console.log('hipheierror');
    }
  }
}
