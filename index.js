/**
 * @format
 */

import {AppRegistry, AsyncStorage} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from "react-native-push-notification";
import {firebaseApp} from '../config/firebase';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import notifications from './Screens/notifications.js';
import {Navigation} from 'react-navigation';

async function convertApnTokenToFcmToken(token){

    var body = {
        application : 'org.reactjs.native.example.TEMAPP',
        sandbox : false,
        apns_tokens : [
            token
        ]
    };

    var options = {
	    method: "POST",
	    headers: {
            'Accept': 'application/json',
            "Content-type": "application/json; charset=UTF-8",
            'Authorization' : 'key=AAAA2-C3Joo:APA91bFiEmWbDkwRUti-ZCdmjQUcE55JKINWm2w9X3SInY2cxFJLid-UG994cGNFe2TaEEXR_UN5DwU377ACJdPRYIWBjCQ2OSAgTXW1cNazpNFlovgiFcNfaMBiIJEUjI9HwwObDlHE'
	    },
	    body: JSON.stringify(body)
    }

    await fetch("https://iid.googleapis.com/iid/v1:batchImport", options)
	.then(function(response) {
	    return response.json();
	}).then(async(response) => {
	    console.log("Prueba " + JSON.stringify(response))
        if(response.results[0].status == 'OK') {
            deviceToken = response.results[0].registration_token
            console.log("Device Token At Start"+deviceToken)
            await AsyncStorage.setItem('deviceToken',deviceToken);
        }
	}).catch(function(error) {
	    console.log("Error " + JSON.stringify(error))
	});
}

PushNotificationIOS.addEventListener('register', token => {
      console.log('token: ', token);
    });

 PushNotificationIOS.addEventListener(
      'registrationError',
      registrationError => {
        console.log(registrationError, '--');
      },
    );

PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
        console.log("TOKEN:", token.token);
        if(Platform.OS=='ios'){
            console.log("IOS!!");
            convertApnTokenToFcmToken(token.token);
        } else{
            console.log("Android!!");
            AsyncStorage.setItem('deviceToken',token.token);
        }
        // sendRegistrationToServer(token.token);
        // AsyncStorage.getAllKeys((err, keys) => {
        // AsyncStorage.multiGet(keys, (error, stores) => {
        //     stores.map((result, i, store) => {
        //     console.log({ [store[i][0]]: store[i][1] });
        //     return true;
        //     });
        // });
        // });
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        if(notification.foreground){
            PushNotification.localNotification({
            channelId : "test-local-channel",
            title :notification.title,
            message: notification.message,
            // image: notification.bigPictureUrl,
            });

            PushNotificationIOS.presentLocalNotification({
                alertTitle: notification.title,
                alertBody : notification.message,
            });
        }
    // process the notification
        if (notification.userInteraction) {
           console.log('Entered App')
        }

    // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    senderID: "944367937162",
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },
    requestPermissions: true,

});

AppRegistry.registerComponent(appName, () => App);
