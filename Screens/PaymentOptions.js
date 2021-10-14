import React from 'react';  
import {Button, Text, Image,ImageBackground} from 'react-native-elements';  
import {View, TouchableOpacity} from 'react-native';
import UserAccount from './UserAccount.js'; 
import Login from './LoginPage.js';
import SignUp from './SignUp.js';
import ApplePay from './ApplePay.js';
import { StackNavigator } from "react-navigation";

export default class PaymentOptions extends React.Component{
    render(){
        const amount = this.props.navigation.getParam('text');
        return<>
            <View style={{flex:1, backgroundColor:"#46B2E0"}}>
          
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70, left:10}}/>
            </TouchableOpacity>

            <Text style ={{fontSize:30,fontWeight:'bold',marginTop:25, textAlign:'center'}}>Amount to be paid:</Text>

            <View style={{marginTop:30, left:80,  height:200, width:200, borderRadius:300, backgroundColor:'white', justifyContent:'center'}}>
                <Text style={{fontSize:50, textAlign: 'center'}}>{amount}</Text>
            </View>

            <Text style={{paddingLeft:50, fontSize:25, fontWeight:'500', marginTop:50}}> Pay with: </Text>

            <View style={{flexDirection:"row",justifyContent:'space-between', paddingLeft:80, paddingRight:80, marginTop:30}}>
            <TouchableOpacity onPress={() => alert('Bitcoin!!')} >
                <Image source={require('./bitcoin-icon.png')} style={{height:70, width:70}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => alert('PayPal!!')} >
                <Image source={require('./paypal-icon.jpeg')} style={{height:70, width:80,borderRadius:300}}/>
            </TouchableOpacity>
            </View>

            <View style={{flexDirection:"row",justifyContent:'space-between', paddingLeft:80, paddingRight:80, marginTop:40}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ApplePay', {text:amount})}>
                <Image source={require('./applepay-icon.jpeg')} style={{height:50, width:80,borderRadius:5}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => alert('GooglePay!!')} >
                <Image source={require('./googlepay-icon.png')} style={{height:50, width:80, borderRadius:5}}/>
            </TouchableOpacity>
            </View>

          
            </View> 


          </>
    }
};

