import { Component, Input, SimpleChange, SimpleChanges, signal } from '@angular/core';

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
  counter = signal(0);
  counterRef: number | undefined;

  // A good option to manage intervals
  // interval$: Subscription | null = null;

  // ngOnInit(): void { 
  //   this.interval$ = interval(1000).subscribe(() => { 
  //     console.log(this.counter()); this.counter.update(value => value + 1); 
  //   }); 
  // }

  // ngOnDestroy(): void { 
  //   this.interval$?.unsubscribe(); 
  // }

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
    this.counterRef = window.setInterval(() => {
      console.log('run interval');
      this.counter.update(prevState => prevState + 1);
    }, 1000);
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
    window.clearInterval(this.counterRef);
  }

  doSomething() {
    console.log('duration changed');
  }
}
