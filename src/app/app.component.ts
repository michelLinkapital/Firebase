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
  disableLogin = false;

  constructor(
    private firebaseService: FirebaseService,
    private msg: AngularFireMessaging,
    private http: HttpClient) {
  }

  ngOnInit() {
    this.setFcmToken();
  }

  login() {
    this.http.post('http://localhost:8085/api/auth/login', {
      email: 'admin@gmail.com',
      password: 'Mn1234567*'
    })
      .subscribe(
        (data: any) => {
          this.disableLogin = true;
          localStorage.setItem('token', 'Bearer ' + data['token']);

          if (localStorage.getItem('fcmToken') != null) {

            var options = {
              headers: this.headers()
            };
            const body = {
              token: localStorage.getItem('fcmToken')
            };
            this.http.post('http://localhost:8085/api/fcm', body, options).subscribe();
          }
        }
      )
  }

  setFcmToken() {
    this.firebaseService.getFcmToken().subscribe(
      (token: any) => {
        localStorage.setItem('fcmToken', token);
      }
    )
  }
  send() {

    var options = {
      headers: this.headers()
    };
    const body = {
      token: localStorage.getItem('fcmToken'),
      userId: 1,
      message: 'the message',
      type: 'OFFER_NOTIFICATION',
      payload: {
        hello: 'payload'
      },
    };
    this.http.post('http://localhost:8085/api/fcm/notify', body, options).subscribe();
  }

  subscribe() {
    console.log('subscribed')
    this.msg.onMessage((payload) => {
      // Get the data about the notification
      let notification = payload.notification;
      // Create a Message object and add it to the array
      this.messages.push({title: notification.title, body: notification.body, iconUrl: notification.icon});
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

}
