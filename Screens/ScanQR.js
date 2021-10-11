import React from 'react';  
import {Button, Text, Image,ImageBackground} from 'react-native-elements';  
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import { StackNavigator } from "react-navigation";
import UserAccount from './UserAccount.js';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

import PaymentOptions from './PaymentOptions.js';

export default class ScanQR extends React.Component{

    onSuccess = e => {
            this.props.navigation.navigate('PaymentOptions', {text: e.data});            
            };
    
    render(){
        return<>
        <View style={{flex:1, backgroundColor:"#46B2E0"}}>
            <View style={{flexDirection:"row",justifyContent:'space-between', paddingLeft:15, paddingRight:10}}>
            <TouchableOpacity >
            <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{alert("Notification!")}}>
            <Image source={require('./notification-icon.png')} style={{height:50, width:50,marginTop:70}} />
            </TouchableOpacity>
            </View>

            <Text style={{padding:20, fontSize:30, fontWeight:'bold', textAlign:'center', marginTop:40}}> Scan the QR Code to make the payment </Text>

            <View style={{marginTop:20, paddingLeft:30}}>
                <QRCodeScanner
                    onRead={this.onSuccess}
                    cameraStyle={[{backgroundColor:'white', overflow:'hidden', position: 'absolute', height: 330, width: 315, borderRadius:20}]}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                />
            </View>           

            <View style={{flexDirection:"row",justifyContent:'space-between', paddingLeft:25, paddingRight:25, marginTop:400}}>
            <TouchableOpacity onPress={()=>{alert("Help!")}}>
            <Image source={require('./help-icon.png')} style={{height:80, width:90}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{alert("Map!")}}>
            <Image source={require('./map-icon.png')} style={{height:80, width:90}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('UserAccount')} >
            <Image source={require('./user-icon.png')} style={{height:80, width:80}} />
            </TouchableOpacity>
            </View>

        </View>
        </>
    }
};

