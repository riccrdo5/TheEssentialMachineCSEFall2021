import React from 'react';  
import {Button, Text, Image,ImageBackground} from 'react-native-elements';  
import {View,TextInput, TouchableOpacity} from 'react-native';
import UserAccount from './UserAccount.js'; 
import Login from './LoginPage.js';
import { StackNavigator } from "react-navigation";

export default class ResetPasswordSuccess extends React.Component{
    render(){
        return<>
            <View style={{flex:1, backgroundColor:"#46B2E0"}}>

            <TouchableOpacity style={{alignItems:"flex-end", paddingRight:20}} onPress={()=> this.props.navigation.navigate('Login')}>
            <Text style={{height:50, width:50,marginTop:40, fontWeight:"bold", fontSize:20}}> Done </Text>
            </TouchableOpacity>

            <Image source={require('./fulltick-icon.png')} style={{height:200, width:200, left:100, marginTop:60}} />

            <Text style={{fontSize:30, color:'white', fontWeight:"300", textAlign:'center', marginTop:40}}> Password Reset Email Sent </Text>

            <Text style={{fontSize:20, color:'white', textAlign:'center', marginTop:30}}> An email has been sent to email-address. Follow thw instructions in the email to reset your password. If you haven't received the mail, try waiting for few minutes or check your spam folder. </Text>

            </View>
        </>
    }
};

