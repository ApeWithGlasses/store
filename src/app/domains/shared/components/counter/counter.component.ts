import { Component, Input, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input({required: true}) duration: number = 0;
  @Input({required: true}) message: string = '';

  constructor() {
    // NO ASYNC
    // Before render
    console.log('Constructor');
    console.log('-'.repeat(10));
  }

  ngOnChanges(changes: SimpleChanges) {
    // Before and during render  
    console.log('ngOnChanges');
    console.log('-'.repeat(10));
    console.log(changes);
    const duration = changes['duration'];
    if (duration && duration.currentValue !== duration.previousValue) this.doSomething();
  }

  ngOnInit() {
    // After render
    // ASYNC
    console.log('ngOnInit');
    // Showing the state of duration and message
    console.log('duration =>', this.duration);
    console.log('message =>', this.message);
    console.log('-'.repeat(10));
  }

  ngAfterViewInit() {
    // After render
    // Child had been rendered
    console.log('ngAfterViewInit');
    console.log('-'.repeat(10));
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    console.log('-'.repeat(10));
  }

  doSomething() {
    console.log('duration changed');
  }
}
