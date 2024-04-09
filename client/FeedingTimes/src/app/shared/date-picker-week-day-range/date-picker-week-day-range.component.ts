import { Component, EventEmitter, Output } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
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
  implements MatDateRangeSelectionStrategy<string>
{
  @Output() dateChanged = new EventEmitter<Date[]>();

  dateRange: DateRange<any> = new DateRange<string>(null, null);
  constructor(private _dateAdapter: DateAdapter<string>) {}

  selectionFinished(date: string | null): DateRange<string> {
    this.dateRange = this._createFiveDayRange(date);
    this.dateChanged.emit([this.dateRange.start, this.dateRange.end]);
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
