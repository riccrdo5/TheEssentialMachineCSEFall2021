import React from 'react';  
import {Button, Text, Image,ImageBackground} from 'react-native-elements';  
import {View, TouchableOpacity} from 'react-native';
import UserAccount from './UserAccount.js'; 
import Login from './LoginPage.js';
import SignUp from './SignUp.js';
import { StackNavigator } from "react-navigation";
import helpPage from './helpPage.js';

export default class HomeScreen extends React.Component{
    render(){
        return<>
            <View style={{flex:1, backgroundColor:"#46B2E0"}}>
            <Text style={{fontSize:40, fontWeight:'bold', textAlign:'center', marginTop:110}}> Essential Vending Machine </Text>
            <Image source={require('./my-icon.png')} style={{height:300, width:250, left:67, marginTop:20 }} />

            <TouchableOpacity style={{backgroundColor:"white", padding:8, borderRadius:10,  alignItems:"center",width:150, left:120, marginTop:10}} onPress={()=> this.props.navigation.navigate('SignUp')}>
            <Text style={{fontSize:20, fontWeight:"bold", color:"black"}}> SIGN UP </Text>
            </TouchableOpacity>

            <Text style={{fontSize:20, fontWeight:'bold', textAlign:'center', marginTop:50, left:5}}> Already have an account? </Text>

            <TouchableOpacity style={{backgroundColor:"white", padding:8, borderRadius:10,  alignItems:"center",width:150, left:120, marginTop:20}} onPress={()=> this.props.navigation.navigate('Login')}>
            <Text style={{fontSize:20, fontWeight:"bold", color:"black"}}> LOGIN </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> this.props.navigation.navigate('helpPage')}>
            <Image source={require('./help-icon.png')} style={{height:60, width:60, left:20, marginTop:30 }} />
            </TouchableOpacity>
            </View>
        </>
    }
};

