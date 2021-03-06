import { QuestionBase } from './question-base';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateQuestion } from './question-date';

export class DateTimeQuestion extends DateQuestion {
    controlType = 'date-time';

    hourControl: FormControl;
    minuteControl: FormControl;

    constructor(options: {} = {}) {
        super(options);
        this.hourControl = new FormControl({ value: undefined, disabled: options['disabled'] != undefined ? options['disabled'] : false }, [Validators.min(0), Validators.max(23)]);
        this.minuteControl = new FormControl({ value: undefined, disabled: options['disabled'] != undefined ? options['disabled'] : false }, [Validators.min(0), Validators.max(59)]);
        if (this.dateControl.value) {
            this.hourControl.setValue(this.dateControl.value.getHours());
            this.minuteControl.setValue(this.dateControl.value.getMinutes());
        }
        this.hourControl.valueChanges.subscribe(hour => {
            if (hour && this.dateControl.value) {
                this.dateControl.value.setHours(hour);
            }
        })
        this.minuteControl.valueChanges.subscribe(min => {
            if (min && this.dateControl.value) {
                this.dateControl.value.setMinutes(min);
            }
        })
    }
}