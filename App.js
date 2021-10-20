/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';  
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
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
import ApplePay from './Screens/ApplePay.js';
import ApplePaySuccess from './Screens/ApplePaySuccess.js';
import BitcoinPay from './Screens/bitcoin-pay';
import BitcoinPaySuccess from './Screens/bitcoin-pay-success';

const stackNavigator = createStackNavigator({
    HomeScreen: HomeScreen,
    UserAccount: UserAccount,
    EditProfile: EditProfile,
    Receipts: Receipts,
    Login: Login,
    ForgotPassword : ForgotPassword,
    ResetPasswordSuccess: ResetPasswordSuccess,
    SignUp:SignUp,
    PaymentOptions: PaymentOptions,
    ScanQR : ScanQR,
    Map : Map,
    ApplePay: ApplePay,
    ApplePaySuccess: ApplePaySuccess,
    BitcoinPay: BitcoinPay,
    BitcoinPaySuccess: BitcoinPaySuccess,

  },
  {
    headerMode: 'none',
  });

const App = createAppContainer(stackNavigator);

export default App;