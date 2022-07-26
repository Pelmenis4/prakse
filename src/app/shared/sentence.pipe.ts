import { Pipe } from '@angular/core';

@Pipe({
  name: 'sentence'
})
export class SentencePipe{

transform(value:string): string {
    let first = value.substr(0,1).toUpperCase();
    return first + value.substr(1); 
    }

}