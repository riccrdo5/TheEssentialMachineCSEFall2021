/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';  
import {View, ActivityIndicator, StatusBar, AsyncStorage} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import HomeScreen from './Screens/Homepage.js'; 
import Login from './Screens/LoginPage.js'; 
import UserAccount from './Screens/UserAccount.js'; 
import EditProfile from './Screens/EditProfile.js';
import Receipts from './Screens/Receipts.js';
import ForgotPassword from './Screens/ForgotPassword.js';
import ResetPasswordSuccess from './Screens/ResetPasswordSuccess.js';
import SignUp from './Screens/SignUp.js';
import PaymentOptions from './Screens/PaymentOptions.js';
import ScanQR from './Screens/ScanQR.js';
import Map from './Screens/Map.js';
import ApplePaySuccess from './Screens/ApplePaySuccess.js';
import BitcoinPay from './Screens/bitcoin-pay';
import BitcoinPaySuccess from './Screens/bitcoin-pay-success';
import PushNotificationIOS from "@react-native-community/push-notification-ios";


const stackNavigator = createStackNavigator({
    // HomeScreen: HomeScreen,
    ScanQR : ScanQR,
    UserAccount: UserAccount,
    EditProfile: EditProfile,
    Receipts: Receipts,
    Login: Login,
    ForgotPassword : ForgotPassword,
    ResetPasswordSuccess: ResetPasswordSuccess,
    SignUp:SignUp,
    PaymentOptions: PaymentOptions,
    Map : Map,
    ApplePaySuccess: ApplePaySuccess,
    BitcoinPay: BitcoinPay,
    BitcoinPaySuccess: BitcoinPaySuccess,

  },
  {
    headerMode: 'none',
  });

const AuthStack = createStackNavigator(
  {
    HomeScreen : HomeScreen
  },
  {
    headerMode: 'none',
  }
);

class AuthLoadingScreen extends React.Component{
  componentDidMount(){
    firebase.initializeApp(this);

    PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function(err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});
}
  constructor(props){
    super(props)
    this.loadData()
  }

  render(){
    return(
       <View style={{flex:1, backgroundColor:"#46B2E0"}}>
        <ActivityIndicator/>
        <StatusBar barStyle="default"/>
      </View>
    );
  }

  loadData = async() => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    this.props.navigation.navigate(isLoggedIn!=='1'?'Auth':'App');
  }
} 
export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading : AuthLoadingScreen,
    App : stackNavigator,
    Auth : AuthStack
  },
  {
    initialRouteName : 'AuthLoading'
  }
));
