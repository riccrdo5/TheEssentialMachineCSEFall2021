import React from 'react';  
import {Button, Text, Image,ImageBackground} from 'react-native-elements';  
import {View,TextInput, TouchableOpacity} from 'react-native';
import UserAccount from './UserAccount.js'; 
import Login from './LoginPage.js';
import { StackNavigator } from "react-navigation";
import ScanQR from './ScanQR.js';

export default class VendingMachine extends React.Component{
    render(){
        const amount = this.props.navigation.getParam('text');
        return<>
            <View style={{flex:1, backgroundColor:"#46B2E0"}}>

            <TouchableOpacity style={{alignItems:"flex-end", paddingRight:20}} onPress={()=> this.props.navigation.navigate('ScanQR')}>
            <Text style={{height:50, width:50,marginTop:40, fontWeight:"bold", fontSize:20}}> Done </Text>
            </TouchableOpacity>
            <Image source={require('./vendingMachineDisburse.gif')} style={{height:400, width:400, marginTop:60}} />
            <Text style={{fontSize:30, fontWeight:"500", color:'white', fontWeight:"300", textAlign:'center', marginTop:40}}> Please collect your item from the vending machine</Text>
            </View>
        </>
    }
};

