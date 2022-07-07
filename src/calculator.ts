export class Calculator {
    multiply(a: number, b: number): number { return a * b; }
    divide(a: number, b: number): number { 
      if( b == 0 ){
            return 0;
      } else {
        return a / b; 
      }
    }
}