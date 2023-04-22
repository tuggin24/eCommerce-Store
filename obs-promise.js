const { Observable } = require('rxjs');
const { filter } = require('rxjs/operators');

 const doSomething = () => {
   return new Promise( (resolve) => {
      resolve('Valor 1');
      resolve('Valor 2');
      setTimeout( () => {
         resolve('Valor 5')
      }, 3000 )
   }, (error) => {

   } );
 }

 const doSomething$ = () => {
   return new Observable( observer => {
      observer.next('valor 1 $');
      observer.next('valor 2 $');
      observer.next('valor 3 $');
      observer.next(null);
      setTimeout( () => {
         observer.next('Valor 6 $')
      }, 5000 );
      setTimeout( () => {
         observer.next(null);
      }, 8000 );
      setTimeout( () => {
         observer.next('Valor 7 $')
      }, 10000 );
   } )
 }

 (async () => {
   const rta = await doSomething();
   console.log('rta->',rta);
 })();

 ( () => {
   const obs$ = doSomething$();
   obs$.pipe( filter( value => value !== null ) ).subscribe( rta => {
      console.log(rta)
   } )
 } )();