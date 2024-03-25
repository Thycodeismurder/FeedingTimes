import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Parent } from 'src/services/Parent';
import { ActivityTypes, DbActivity, Feeding, UserEvent } from 'src/services/User';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() parent: Parent | undefined;
  @Output() formSubmitEvent = new EventEmitter<ActivityTypes>();
  @Input() isPostingActivity = false;
  activity: ActivityTypes | undefined;
  activityForm = new FormGroup(
    {
      Type: new FormControl('Feeding', Validators.required),
      Time: new FormControl('', Validators.required),
      Quantity: new FormControl('', Validators.required),
      Icon: new FormControl('Breastfeeding', Validators.required),
    },
    { updateOn: 'submit' }
  );
  preSelectedAction = 'Feeding';
  constructor() {}

  ngOnInit(): void {}
  onSubmit() {
    if (this.activityForm.status == 'INVALID') {
      this.activityForm.markAllAsTouched();
    } else  if (this.activityForm.status == 'VALID') {
      if(this.activityForm.value.Type === 'Feeding') {
        this.activity = {
          type : this.activityForm.value.Type,
          icon: this.activityForm.value.Icon,
          quantity: this.activityForm.value.Quantity,
          time: this.activityForm.value.Time
        }
      }else if (this.activityForm.value.Type === 'Poop') {
        this.activity = {
          type : this.activityForm.value.Type,
          icon: this.activityForm.value.Icon,
          description: this.activityForm.value.Quantity,
          time: this.activityForm.value.Time
        }
      } else {
        this.activity = {
          type : this.activityForm.value.Type,
          icon: this.activityForm.value.Icon,
          description: this.activityForm.value.Quantity,
          time: this.activityForm.value.Time
        }
      }
      this.formSubmitEvent.emit(this.activity);
    } else {
      this.activityForm.markAllAsTouched();
    }
  } 
}
