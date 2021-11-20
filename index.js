/**
 * @format
 */

import {AppRegistry, AsyncStorage} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from "react-native-push-notification";
import {firebaseApp} from '../config/firebase';

PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
        console.log("TOKEN:", token.token);
        AsyncStorage.setItem('deviceToken',token.token);
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
            });
        }
    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    requestPermissions: true,

});

AppRegistry.registerComponent(appName, () => App);
