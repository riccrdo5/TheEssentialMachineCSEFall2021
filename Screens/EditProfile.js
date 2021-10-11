import React from 'react';  
import {Button, Text, Image,ImageBackground} from 'react-native-elements';  
import {View, TextInput, TouchableOpacity} from 'react-native';
import UserAccount from './UserAccount.js'; 
import { StackNavigator } from "react-navigation"; 

export default class EditProfile extends React.Component{
    render(){
        return<>
            <View style={{flex:1, backgroundColor:"#46B2E0"}}>

            <View style={{flexDirection:"row",justifyContent:'space-between', paddingLeft:15, paddingRight:10}}>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('UserAccount')} >
            <Image source={require('./cross-icon.png')} style={{height:50, width:50,marginTop:60}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('UserAccount')} >
            <Image source={require('./tick-icon.png')} style={{height:50, width:50,marginTop:60}} />
            </TouchableOpacity>
            </View>

            <Text style={{fontSize:30, color:'white', fontWeight:'bold', textAlign:'center'}}> Edit Profile </Text>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:320, left:30, borderRadius:20, marginTop:15 }}> 
                <Image source={require('./name-icon.png')} style={{height:20, width:20}} />
                <TextInput style={{fontSize:20, color:'grey'}} placeholder="  First Name"/>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:320, left:30, borderRadius:20, marginTop:20 }} > 
                <Image source={require('./name-icon.png')} style={{height:20, width:20}} />
                <TextInput style={{fontSize:20, color:'grey'}} placeholder="  Last Name"/>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:320, left:30, borderRadius:20, marginTop:20 }} > 
                <Image source={require('./school-icon.png')} style={{height:20, width:20}} />
                <TextInput style={{fontSize:20, color:'grey'}} placeholder="  School"/>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:320, left:30, borderRadius:20, marginTop:20 }} > 
                <Image source={require('./city-icon.png')} style={{height:20, width:20}} />
                <TextInput style={{fontSize:20, color:'grey'}} placeholder="  City"/>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:320, left:30, borderRadius:20, marginTop:20 }} > 
                <Image source={require('./city-icon.png')} style={{height:20, width:20}} />
                <TextInput style={{fontSize:20, color:'grey'}} placeholder="  State"/>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:320, left:30, borderRadius:20, marginTop:20 }} > 
                <Image source={require('./map-icon.png')} style={{height:20, width:20}} />
                <TextInput style={{fontSize:20, color:'grey'}} placeholder="  ZipCode"/>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:320, left:30, borderRadius:20, marginTop:20 }} > 
                <Image source={require('./email-icon.png')} style={{height:20, width:20}} />
                <TextInput style={{fontSize:20, color:'grey'}} placeholder="  Email Address"/>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:320, left:30, borderRadius:20, marginTop:20 }} > 
                <Image source={require('./password-icon.png')} style={{height:20, width:20}} />
                <TextInput style={{fontSize:20, color:'grey'}} placeholder="  Current Password"/>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:320, left:30, borderRadius:20, marginTop:20 }} > 
                <Image source={require('./password-icon.png')} style={{height:20, width:20}} />
                <TextInput style={{fontSize:20, color:'grey'}} placeholder="  New Password"/>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:320, left:30, borderRadius:20, marginTop:20 }} > 
                <Image source={require('./password-icon.png')} style={{height:20, width:20}} />
                <TextInput style={{fontSize:20, color:'grey'}} placeholder="  Confirm New Password"/>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{alert("Help!")}}>
            <Image source={require('./help-icon.png')} style={{height:60, width:60, left:20, marginTop:30 }} />
            </TouchableOpacity>
            </View>
        </>
    }
};

