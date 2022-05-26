import {Component, OnInit} from '@angular/core';
import {AngularFireMessaging} from '@angular/fire/compat/messaging';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Message} from './message';
import {FirebaseService} from './firebase.service';
import {mergeMap} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  messages: Array<Message> = [];
  title = 'Firebase';

  constructor(
    private firebaseService: FirebaseService,
    private msg: AngularFireMessaging,
    private http: HttpClient) {
  }

  ngOnInit() {
    this.login();

    this.msg.onMessage((payload) => {
      // Get the data about the notification
      let notification = payload.notification;
      // Create a Message object and add it to the array
      this.messages.push({title: notification.title, body: notification.body, iconUrl: notification.icon});
    });
  }

  login() {
    this.firebaseService.getFcmToken().pipe(
      mergeMap((token: any) => {
        const body = {
          email: 'client@gmail.com',
          password: 'Mn1234567*',
          fcmToken: token
        };
          return this.http.post('http://localhost:8085/api/auth/login', body)
        }
      ))
      .subscribe((data: any) => {
        localStorage.setItem('token', 'Bearer ' + data['token']);
      });

  }

  headers(): HttpHeaders {
    return new HttpHeaders()
      .set('Authorization', `${localStorage.getItem('token')}`)
  }

  loginHeaders(token: any): HttpHeaders {
    let headers = new HttpHeaders();

    if (token != null)
      headers.set('fcmToken', `${token}`);

    return headers;
  }

  register() {
    this.msg.requestToken.subscribe({
        next: (token) => {

          this.http.post('http://localhost:8085/api/fcm/registration',
            {
              token: token,
            },
            {
              headers: this.headers()
            }
          ).subscribe(() => {
          });

        },
        error: error => {
          console.log(error);
        }
      }
    );
  }
}
