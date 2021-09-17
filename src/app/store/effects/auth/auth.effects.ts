import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActionType } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AuthPayload } from 'src/app/models/auth-payload';
import { AuthService } from 'src/app/services/auth.service';
import {
  loginAuth,
  loginAuthFailure,
  loginAuthSuccess,
} from '../../actions/auth/auth.actions';

@Injectable()
export class AuthEffects {
  loginAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAuth),
      mergeMap((action) => {
        return this.auth.login(action.data).pipe(
          map((data) => {
            return loginAuthSuccess({ data });
          }),
          catchError((error) => {
            return of(loginAuthFailure({ error }));
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private auth: AuthService) {}
}
