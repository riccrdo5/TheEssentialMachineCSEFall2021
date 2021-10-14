import React from 'react';  
import {Text, Image,ImageBackground} from 'react-native-elements';  
import {View,Button,TouchableOpacity} from 'react-native';
import HomeScreen from './Homepage.js'; 
import EditProfile from './EditProfile.js';
import Receipts from './Receipts.js';
import ScanQR from './ScanQR.js';

import UserAccount from './UserAccount.js';

export default class Map extends React.Component{
    render(){
        const email = this.props.navigation.getParam('text');
        
        return<>
        <View style={{flex:1, backgroundColor:"#46B2E0"}}>
            <View style={{flexDirection:"row",justifyContent:'space-between', paddingLeft:15, paddingRight:10}}>
            <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
            <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{alert("Notification!")}}>
            <Image source={require('./notification-icon.png')} style={{height:50, width:50,marginTop:70}} />
            </TouchableOpacity>
            </View>

            <View style={{marginTop: 380, flexDirection:"row",justifyContent:'space-between', paddingLeft:25, paddingRight:25, paddingTop:200}}>
            <TouchableOpacity onPress={()=>{alert("Help!")}}>
            <Image source={require('./help-icon.png')} style={{height:80, width:90}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('ScanQR')} >
            <Image source={require('./scan-icon.png')} style={{height:70, width:120}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('UserAccount', {text: email})} >
            <Image source={require('./user-icon.png')} style={{height:80, width:80}} />
            </TouchableOpacity>
            </View>
        </View>
        </>
    }
};
