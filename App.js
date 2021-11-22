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
import SendNotification from './Screens/sendNotification.js';
import BitcoinPayExpired from './Screens/bitcoin-pay-expired';
import helpPage from './Screens/helpPage.js';
import CardPage from './Screens/card.js';

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
    BitcoinPayExpired : BitcoinPayExpired,
    helpPage : helpPage,
    CardPage : CardPage,
    SendNotification: SendNotification
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
