import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import {
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatDateRangeSelectionStrategy,
} from '@angular/material/datepicker';

@Component({
  selector: 'app-date-picker-week-day-range',
  templateUrl: './date-picker-week-day-range.component.html',
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: DatePickerWeekDayRangeComponent,
    },
  ],
  styleUrl: './date-picker-week-day-range.component.scss',
})
export class DatePickerWeekDayRangeComponent
  implements MatDateRangeSelectionStrategy<string>, OnChanges, OnInit
{
  @Output() dateChanged = new EventEmitter<Date[]>();
  @Input() setDate: Date = new Date();
  currentDate: Date[] = [
    new Date(), // Start date
    new Date(), // End date
  ];
  startDate = new FormControl(new Date());
  endDate = new FormControl(new Date());

  constructor(private _dateAdapter: DateAdapter<string>) {}
  ngOnInit(): void {
    this.dateChanged.emit(this.currentDate);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['setDate']) {
      this.currentDate = [
        this._createFiveDayRange(this.setDate.toString()).start,
        this._createFiveDayRange(this.setDate.toString()).end,
      ];
      this.startDate.setValue(this.currentDate[0]);
      this.endDate.setValue(this.currentDate[1]);
    }
  }
  startDateChanged(date: string) {
    this.currentDate[0] = new Date(date);
  }
  endDateChanged(date: string) {
    this.currentDate[1] = new Date(date);
    this.dateChanged.emit(this.currentDate);
  }
  selectionFinished(date: string | null): DateRange<string> {
    return this._createFiveDayRange(date);
  }

  createPreview(activeDate: string | null): DateRange<string> {
    return this._createFiveDayRange(activeDate);
  }

  private _createFiveDayRange(date: string | null): DateRange<any> {
    if (date) {
      const d = new Date(date);
      const day = d.getDay();
      const diff = d.getDate() - day + (day == 0 ? -6 : 1);
      const start = new Date(d.setDate(diff));
      const end = new Date(d.setDate(diff + 6));
      return new DateRange<any>(start, end);
    }

    return new DateRange<string>(null, null);
  }
}
