import React from 'react';  
import {Button, Text, Image,ImageBackground} from 'react-native-elements';  
import {View,TextInput, TouchableOpacity} from 'react-native';
import UserAccount from './UserAccount.js'; 
import Login from './LoginPage.js';
import { StackNavigator } from "react-navigation";
import ScanQR from './ScanQR.js';
import VendingMachine from './VendingMachine.js';
import BitcoinPaySuccess from './bitcoin-pay-success.js';

export default class BitcoinTestPay extends React.Component{
    render(){
        return<>
            <View style={{flex:1, backgroundColor:"#46B2E0"}}>

            <TouchableOpacity style={{alignItems:"flex-end", paddingRight:20}} onPress={()=> this.props.navigation.navigate('BitcoinPaySuccess')}>
            <Text style={{height:50, width:50,marginTop:5, fontWeight:"bold", fontSize:20}}> Done </Text>
            </TouchableOpacity>

            <Image source={require('./btc_test_pay.png')} style={{height:740, width:390, marginTop:10}} />
            </View>
        </>
    }
};

