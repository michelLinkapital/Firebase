import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AngularFireMessaging} from '@angular/fire/compat/messaging';
import {Observable, of} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public resourceUrl = 'http://localhost:8085/api/fcm/registration';
  fcmToken!: string | null;

  constructor(
    protected http: HttpClient,
    protected angularFireMessaging: AngularFireMessaging,
  ) {}

  /*getFcmToken() {
    // 1. do we already have a token ...
    if (this.fcmToken != null) {
      // eslint-disable-next-line no-console
      console.log('Token already acquired! Using the existing one: token=', this.fcmToken);
      return;
    }
    // 2 if not ask user for permision and get tokn for further use ...
    this.angularFireMessaging.requestToken.subscribe({
        next: (token) => {
          this.fcmToken = token;
        },
        error: (err) => {
          // eslint-disable-next-line no-console
          console.error('Unable to get permission to notify.', err);
        }
      }
    );
  }*/getFcmToken(): Observable<string|null> {
    // 1. do we already have a token ...
    if (this.fcmToken != null) {
      // eslint-disable-next-line no-console
      console.log('Token already acquired! Using the existing one: token=', this.fcmToken);
      return of(this.fcmToken);
    }
    // 2 if not ask user for permision and get tokn for further use ...
    return this.angularFireMessaging.requestToken;
  }
}
