import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { loginAuth, loginAuthFailure, loginAuthSuccess } from '../../actions/auth/auth.actions';



@Injectable()
export class AuthEffects {

  loginAuth$ = createEffect( () => this.actions$.pipe(
    ofType(loginAuth),
    mergeMap((payload) => this.auth.login(payload).pipe(
      map(data => {
        return (loginAuthSuccess({data }))
      }),
      catchError(error => of(loginAuthFailure({error})))
    ))
  ));

  constructor(
    private actions$: Actions,
    private auth: AuthService

    ) {}

}
