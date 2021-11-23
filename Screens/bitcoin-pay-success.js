import React from 'react';  
import {Button, Text, Image,ImageBackground} from 'react-native-elements';  
import {View,TextInput, TouchableOpacity} from 'react-native';
import UserAccount from './UserAccount.js'; 
import Login from './LoginPage.js';
import { StackNavigator } from "react-navigation";
import ScanQR from './ScanQR.js';
import VendingMachine from './VendingMachine.js';

export default class BitcoinPaySuccess extends React.Component{
    render(){
        const amount = this.props.navigation.getParam('text');
        return<>
            <View style={{flex:1, backgroundColor:"#46B2E0"}}>

            <TouchableOpacity style={{alignItems:"flex-end", paddingRight:20}} onPress={()=> this.props.navigation.navigate('VendingMachine')}>
            <Text style={{height:50, width:50,marginTop:40, fontWeight:"bold", fontSize:20}}> Done </Text>
            </TouchableOpacity>
            <Image source={require('./fulltick-icon.png')} style={{height:200, width:200, left:100, marginTop:60}} />

            <Text style={{fontSize:30, fontWeight:"500", color:'white', fontWeight:"300", textAlign:'center', marginTop:40}}> Payment Successful </Text>

            <Text style={{fontSize:35, fontWeight:"500", color:'white', textAlign:'center', marginTop:30}}>{amount}</Text>

            </View>
        </>
    }
};

