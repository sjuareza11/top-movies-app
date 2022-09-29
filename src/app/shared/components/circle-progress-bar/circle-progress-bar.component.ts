import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CIRCUMFERENCE_DEGREES, HALF_CIRCUMFERENCE_DEGREES } from '../../../core/constants/maths';

@Component({
  selector: 'app-circle-progress-bar',
  templateUrl: './circle-progress-bar.component.html',
  styleUrls: ['./circle-progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CircleProgressBarComponent implements OnInit, OnChanges {
  @Input()
  public percentage!: number;
  public progressRight: number = 0;
  public progressLeft: number = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['percentage']) {
      this.calculateDegrees();
    }
  }

  private calculateDegrees(): void {
    const percentageArea = (this.percentage * CIRCUMFERENCE_DEGREES) / 100;
    if (percentageArea >= HALF_CIRCUMFERENCE_DEGREES) {
      this.progressRight = HALF_CIRCUMFERENCE_DEGREES;
      this.progressLeft = percentageArea - this.progressRight;
    } else {
      this.progressRight = percentageArea;
      this.progressLeft = 0;
    }
  }
}
