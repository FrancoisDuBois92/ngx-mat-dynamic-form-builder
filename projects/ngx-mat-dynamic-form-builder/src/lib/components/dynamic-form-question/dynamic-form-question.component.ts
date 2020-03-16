import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'ngx-mat-dynamic-form-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.css']
})
export class DynamicFormQuestionComponent implements OnInit {

  // @Input() question: QuestionBase<any>;
  @Input() question: any;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }

  loading: boolean = false;

  constructor() {
  }

  ngOnInit() {
    if (this.question.selectionFilter) {
      console.log('TODO: Do some loading here...');
    } else if (this.question.options$) {
      this.loading = true;
      this.question.options$ = this.question.options$.pipe(
        tap(_ => this.loading = false)
      );
    }
  }

  setMutlipleValues(event: any): void {
    if (this.question.customChip) {
      this.form.controls[this.question.key].setValue(event);
    } else {
      this.form.controls[this.question.key].setValue(event.map(val => val[this.question.selection.key]));
    }
  }

  setSingleValue(event: any): void {
    // Clear input of auto complete
    if (!event)
      this.form.controls[this.question.key].setValue(undefined);
    else
      this.form.controls[this.question.key].setValue(event[this.question.selection.key]);
  }

  dateTimeChange(event: MatDatepickerInputEvent<Date>): void {
    if (this.question.hourControl.value) {
      event.value.setHours(this.question.hourControl.value);
    }
    if (this.question.minuteControl.value) {
      event.value.setMinutes(this.question.minuteControl.value);
    }
    this.form.controls[this.question.key].setValue(event.value);
  }

  dateChange(event: MatDatepickerInputEvent<Date>): void {
    this.form.controls[this.question.key].setValue(event.value);
  }
}
