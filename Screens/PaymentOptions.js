import React from 'react';  
import {Button, Text, Image,ImageBackground} from 'react-native-elements';  
import {View, TouchableOpacity} from 'react-native';
import UserAccount from './UserAccount.js'; 
import Login from './LoginPage.js';
import SignUp from './SignUp.js';
import { StackNavigator } from "react-navigation";

export default class PaymentOptions extends React.Component{
    render(){
        return<>
            <View style={{flex:1, backgroundColor:"#46B2E0"}}>
            {/* <View style={{flexDirection:"row",justifyContent:'space-between', paddingLeft:15, paddingRight:10}}> */}
            <TouchableOpacity onPress={()=>{alert("Help!")}} >
                <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70}}/>
            </TouchableOpacity>

            <Text style ={{fontSize:50,fontWeight:'bold',marginTop:25}}>Amount to be paid:</Text>

            <Text style={{fontSize:20, fontWeight:'bold', textAlign:'center', marginTop:50, left:5}}> Already have an account? </Text>

            <Text>
      <Button
        title="Pay with Apple Pay"
      />
      </Text>
      <Button
        title="Pay with Google Pay"
      />
      <Text>
      <Button
        title="Pay with PayPal"
      />
      </Text>
      <Button
        title="Pay with Bitcoin"
      />
            </View>
        </>
    }
};

