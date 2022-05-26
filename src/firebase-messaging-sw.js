importScripts('https://www.gstatic.com/firebasejs/8.7.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.7.0/firebase-messaging.js')

// The object we pass as an argument is the same object we copied into the environment files
firebase.initializeApp({
  apiKey: "AIzaSyCxHTfkk-9kKulz76rruU_rZ7FnpeCSvys",
  authDomain: "michatest-9236c.firebaseapp.com",
  projectId: "michatest-9236c",
  storageBucket: "michatest-9236c.appspot.com",
  messagingSenderId: "588319639892",
  appId: "1:588319639892:web:8e2a058c1122558fe7e0c1",
  measurementId: "G-99EV42692W"
})

const messaging = firebase.messaging();
messaging.usePublicVapidKey('BKZoIm0252LJ6RkSXILZOIKGXtcNeoc1nbwln4V0cxltiwRFkZjzgO9jGoj6uXPU0RwRzIp5LIJe3rHwRFuHnpw');
