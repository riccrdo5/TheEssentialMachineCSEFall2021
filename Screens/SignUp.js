import React from 'react';  
import {Button, Text, Image,ImageBackground} from 'react-native-elements';  
import {View, TextInput, TouchableOpacity} from 'react-native';
import UserAccount from './UserAccount.js'; 
import HomeScreen from './Homepage.js'; 
import { StackNavigator } from "react-navigation"; 

export default class SignUp extends React.Component{

    render(){
        return<>
            <View style={{flex:1, backgroundColor:"#46B2E0"}}>

            <TouchableOpacity onPress={()=> this.props.navigation.navigate('HomeScreen')} >
            <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:60, left:20}}/>
            </TouchableOpacity>

            <Text style={{fontSize:30, color:'white', fontWeight:'bold', textAlign:'center', marginTop:20}}> SIGN UP </Text>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:320, left:30, borderRadius:20, marginTop:20 }}> 
                <Image source={require('./name-icon.png')} style={{height:15, width:15}} />
                <TextInput style={{fontSize:15, color:'grey'}} placeholder="  First Name"/>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:320, left:30, borderRadius:20, marginTop:20 }} > 
                <Image source={require('./name-icon.png')} style={{height:15, width:15}} />
                <TextInput style={{fontSize:15, color:'grey'}} placeholder="  Last Name"/>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:320, left:30, borderRadius:20, marginTop:20 }} > 
                <Image source={require('./school-icon.png')} style={{height:15, width:15}} />
                <TextInput style={{fontSize:15, color:'grey'}} placeholder="  School"/>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:320, left:30, borderRadius:20, marginTop:20 }} > 
                <Image source={require('./city-icon.png')} style={{height:15, width:15}} />
                <TextInput style={{fontSize:15, color:'grey'}} placeholder="  City"/>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:320, left:30, borderRadius:20, marginTop:20 }} > 
                <Image source={require('./city-icon.png')} style={{height:15, width:15}} />
                <TextInput style={{fontSize:15, color:'grey'}} placeholder="  State"/>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:320, left:30, borderRadius:20, marginTop:20 }} > 
                <Image source={require('./map-icon.png')} style={{height:15, width:15}} />
                <TextInput style={{fontSize:15, color:'grey'}} placeholder="  ZipCode"/>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:320, left:30, borderRadius:20, marginTop:20 }} > 
                <Image source={require('./email-icon.png')} style={{height:15, width:15}} />
                <TextInput style={{fontSize:15, color:'grey'}} placeholder="  Email Address"/>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:320, left:30, borderRadius:20, marginTop:20 }} > 
                <Image source={require('./password-icon.png')} style={{height:15, width:15}} />
                <TextInput style={{fontSize:15, color:'grey'}} placeholder=" Password"/>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:320, left:30, borderRadius:20, marginTop:20 }} > 
                <Image source={require('./password-icon.png')} style={{height:15, width:15}} />
                <TextInput style={{fontSize:15, color:'grey'}} placeholder="  Confirm Password"/>
            </TouchableOpacity>

            <TouchableOpacity style={{backgroundColor:"black", padding:8, borderRadius:10,  alignItems:"center",width:200, left:90, marginTop:30}} onPress={()=> this.props.navigation.navigate('Main')}>
            <Text style={{fontSize:20, fontWeight:"bold", color:"white"}}> CREATE ACCOUNT </Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={()=>{alert("Help!")}}>
            <Image source={require('./help-icon.png')} style={{height:60, width:60, left:20, marginTop:20 }} />
            </TouchableOpacity>
            </View>
        </>
    }
};

