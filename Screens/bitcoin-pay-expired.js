import React from 'react';  
import {Button, Text, Image,ImageBackground} from 'react-native-elements';  
import {View,TextInput, TouchableOpacity} from 'react-native';
import UserAccount from './UserAccount.js'; 
import Login from './LoginPage.js';
import { StackNavigator } from "react-navigation";
import ScanQR from './ScanQR.js';

export default class BitcoinPayExpired extends React.Component{
    render(){
        const amount = this.props.navigation.getParam('text');
        return<>
            <View style={{flex:1, backgroundColor:"#46B2E0"}}>

            <TouchableOpacity style={{alignItems:"flex-end", paddingRight:20}} onPress={()=> this.props.navigation.navigate('ScanQR')}>
            <Text style={{height:50, width:50,marginTop:40, fontWeight:"bold", fontSize:20}}> Try Again </Text>
            </TouchableOpacity>

            <Image source={require('./payment-failure.png')} style={{height:200, width:200, left:100, marginTop:60}} />

            <Text style={{fontSize:30, fontWeight:"500", color:'white', fontWeight:"300", textAlign:'center', marginTop:40}}> Invoice Expired. Please try again or choose another payment method </Text>

            <Text style={{fontSize:35, fontWeight:"500", color:'white', textAlign:'center', marginTop:30}}>{amount}</Text>

            </View>
        </>
    }
};

