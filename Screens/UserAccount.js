import React from 'react';  
import {Text, Image,ImageBackground} from 'react-native-elements';  
import {View,Button,TouchableOpacity} from 'react-native';
import HomeScreen from './Homepage.js'; 
import EditProfile from './EditProfile.js';
import Receipts from './Receipts.js';

export default class UserAccount extends React.Component{
    render(){
        return<>
        <View style={{flex:1, backgroundColor:"#46B2E0"}}>
            <View style={{flexDirection:"row",justifyContent:'space-between', paddingLeft:15, paddingRight:10}}>
            <TouchableOpacity onPress={()=>{alert("Help!")}} >
            <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{alert("Notification!")}}>
            <Image source={require('./notification-icon.png')} style={{height:50, width:50,marginTop:70}} />
            </TouchableOpacity>
            </View>

            <Image source={require('./user-icon.png')} style={{height:200, width:200, left:100, marginTop:60}} />

            <TouchableOpacity style={{flexDirection:"row",justifyContent:'space-between', paddingLeft:100, paddingRight:120, paddingTop:20}} onPress={()=> this.props.navigation.navigate('EditProfile')}>
            <Text style={{fontSize:25, textAlign:'center'}}> Email Address </Text>
            <Image source={require('./edit-icon.png')} style={{height:30, width:30}} />
            </TouchableOpacity>

            <TouchableOpacity style={{backgroundColor:"white", padding:8, borderRadius:10,  alignItems:"center",width:150, height:45, left:120, marginTop:50}} onPress={()=> this.props.navigation.navigate('Receipts')}>
            <Text style={{fontSize:22, fontWeight:"bold", color:"black"}}> RECEIPTS </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:150, left:120, borderRadius:10, marginTop:50}} onPress={()=> this.props.navigation.navigate('HomeScreen')}> 
                <Image source={require('./logout-icon.png')} style={{height:30, width:30}} />
                <Text style={{fontSize:20,fontWeight:"bold", color:'black'}}> LOGOUT </Text>
            </TouchableOpacity>

            <View style={{flexDirection:"row",justifyContent:'space-between', paddingLeft:25, paddingRight:25, paddingTop:120}}>
            <TouchableOpacity onPress={()=>{alert("Help!")}}>
            <Image source={require('./help-icon.png')} style={{height:80, width:90}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{alert("Map!")}}>
            <Image source={require('./map-icon.png')} style={{height:80, width:90}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{alert("Scan!")}}>
            <Image source={require('./scan-icon.png')} style={{height:70, width:120}} />
            </TouchableOpacity>
            </View>
        </View>
        </>
    }
};

