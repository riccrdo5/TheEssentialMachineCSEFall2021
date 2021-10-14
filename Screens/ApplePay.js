import React from 'react';  
import {Button, Text, Image,ImageBackground} from 'react-native-elements';  
import {View, TextInput, TouchableOpacity} from 'react-native';
import UserAccount from './UserAccount.js'; 
import PaymentOptions from './PaymentOptions.js';
import HomeScreen from './Homepage.js'; 
import { StackNavigator } from "react-navigation"; 


export default class ApplePay extends React.Component{
render(){
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
                <Text style ={{fontSize:25,fontWeight:'500',marginTop:60, textAlign:'center', paddingLeft:0, paddingRight:20}}> $ XX</Text>
            
            
                <Button onPress={() => { alert('You tapped the button!');}} style={{height:80, width:200, color: 'white', left:90, marginTop:60, borderRadius:200}} title="Pay with passcode" color="#841584"/>
            
            
            </View>
            

            </View>
            </>
        }
};