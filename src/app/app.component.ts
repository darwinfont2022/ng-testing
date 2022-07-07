import { Component, OnInit } from '@angular/core';
import { Calculator } from 'src/calculator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'testing-services';
  ngOnInit() {
    const calculator = new Calculator();
    const result = calculator.multiply(2, 3);
    const rst = calculator.divide(2, 0);
    console.log(rst);
    console.log(result);
  }
}
