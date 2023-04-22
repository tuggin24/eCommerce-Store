import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vocalToNumber'
})
export class VocalToNumberPipe implements PipeTransform {

    transform(value: string): string {
        return value.replace( 'a','4' ).replace( 'e', '3' ).replace( 'i', '1' ).replace( 'u', '6' ).replace( 'o', '0' );
    }

}
