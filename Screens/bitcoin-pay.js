import React from 'react';  
import {Button, Text, Image,ImageBackground} from 'react-native-elements';  
import {View, TextInput, TouchableOpacity} from 'react-native';
import UserAccount from './UserAccount.js'; 
import PaymentOptions from './PaymentOptions.js';
import HomeScreen from './Homepage.js'; 
import { StackNavigator } from "react-navigation"; 
import BitcoinPaySuccess from './bitcoin-pay-success';

export default class BitcoinPay extends React.Component{
render(){
     const amount = this.props.navigation.getParam('text');
        return<>
            <View style={{flex:1, backgroundColor:"#46B2E0"}}>

            <View style={{marginTop:200, left:3,  height:400, width:385, borderRadius:50, borderWidth: 2, borderColor: "black",
                backgroundColor:'white'}}>

                <View style={{flexDirection:"row",justifyContent:'space-between', paddingLeft:20, paddingRight:20}}>
                <Image source={require('./btcpay.png')} style={{left:-70, marginTop: 20, height:50, width:280, right: 100}}/>

                    <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
                        <Image source={require('./close-icon.png')} style={{marginTop: 20, height:50, width:25}} />
                    </TouchableOpacity>
                </View>
                <Text style ={{fontSize:15,fontWeight:'500',marginTop:30, left:10, textAlign:'center', paddingLeft:0, paddingRight:20}}>Awaiting Payment...</Text>

                <Text style ={{fontSize:28,fontWeight:'500',marginTop:40, left:10, textAlign:'center', paddingLeft:0, paddingRight:20}}>{amount} USD ~ 0.00015708 BTC</Text>

                <Text style ={{fontSize:25,fontWeight:'500',marginTop:60, left:10, textAlign:'center', paddingLeft:0, paddingRight:20}}>Address</Text>
                
                <TouchableOpacity style={{flexDirection:"row", backgroundColor:"#dae0df", alignItems:"center", padding:8, width:300, left:50, borderRadius:20, marginTop:20 }} >
                    <TextInput autoCapitalize='none' editable={false} selectable={true} style={{fontSize:15, color:'grey'}} placeholder="bc1ql0txrs7zdcczz23gncmvmaasawv"
                    placeholderTextColor="black"/>
                </TouchableOpacity>
                
            
            </View>
            

            </View>
            </>
        }
};