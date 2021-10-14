import React from 'react';  
import {Button, Text, Image,ImageBackground} from 'react-native-elements';  
import {View, TextInput, TouchableOpacity} from 'react-native';
import UserAccount from './UserAccount.js'; 
import PaymentOptions from './PaymentOptions.js';
import HomeScreen from './Homepage.js'; 
import { StackNavigator } from "react-navigation"; 
import ApplePaySuccess from './ApplePaySuccess.js';


export default class ApplePay extends React.Component{
render(){
     const amount = this.props.navigation.getParam('text');

        return<>
            <View style={{flex:1, backgroundColor:"#46B2E0"}}>

            <View style={{marginTop:442, left:3,  height:400, width:385, borderRadius:50, borderWidth: 2, borderColor: "black",
                backgroundColor:'white'}}>

                <View style={{flexDirection:"row",justifyContent:'space-between', paddingLeft:20, paddingRight:20}}>
                
                    <Image source={require('./applepay-icon2.png')} style={{left:-70, marginTop: 20, height:50, width:280, right: 100}}/>
                    
                    <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
                        <Image source={require('./close-icon.png')} style={{marginTop: 20, height:50, width:25}} />
                    </TouchableOpacity>
                </View>

                <Text style ={{fontSize:25,fontWeight:'500',marginTop:60, left:10, textAlign:'left', paddingLeft:0, paddingRight:20}}>Pay Vending Machine</Text>
                <Text style ={{fontSize:25,fontWeight:'500',marginTop:60, textAlign:'center', paddingLeft:0, paddingRight:20}}> {amount}</Text>
            
                <TouchableOpacity style={{backgroundColor:"black", padding:8, borderRadius:10,  alignItems:"center",width:200, height:45, left:100, marginTop:50}} onPress={() => this.props.navigation.navigate('ApplePaySuccess', {text:amount})}>
                    <Text style={{fontSize:22, color:"white"}}> Pay with Passcode </Text>
                </TouchableOpacity>
            
            </View>
            

            </View>
            </>
        }
};