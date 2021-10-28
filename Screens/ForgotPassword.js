import React from 'react';  
import {Button, Text, Image,ImageBackground} from 'react-native-elements';  
import {View,TextInput, TouchableOpacity} from 'react-native';
import UserAccount from './UserAccount.js'; 
import Login from './LoginPage.js';
import ResetPasswordSuccess from './ResetPasswordSuccess.js'
import { StackNavigator } from "react-navigation";
import {firebaseApp} from '../config/firebase';

export default class ForgotPassword extends React.Component{
    constructor(){
        super();
    }

    state = {
        email: ''
    }

    handleEmail = (text) => {
        this.setState({ email: text })
    }

    HandleForgotPassword = (email) =>{
        this.setState({ error: false })
        firebaseApp.auth().sendPasswordResetEmail(email)
            .then(()=>
                this.props.navigation.navigate('ResetPasswordSuccess')
            ) 
        .catch(error => this.setState({ errorMessage: error.message }));
    }

    render(){
        return<>
            <View style={{flex:1, backgroundColor:"#46B2E0"}}>

            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Login')} >
            <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70, left:20}}/>
            </TouchableOpacity>

            <Text style={{fontSize:30, color:'white', fontWeight:'bold', textAlign:'center', marginTop:100}}> Forgot Your Password? </Text>

            <Text style={{fontSize:20, color:'white', textAlign:'center', marginTop:20}}> Dont Worry! Just fill in your email and we will send you a link to reset your password. </Text>
            
            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:320, left:30, borderRadius:20, marginTop:80 }} > 
                <Image source={require('./email-icon.png')} style={{height:25, width:25}} />
                <TextInput autoCapitalize='none' style={{fontSize:20, color:'grey'}} placeholder="  Email Address" 
                placeholderTextColor="black"
                keyboardType='email-address'
                textContentType='emailAddress'
                autoFocus={true}
                onChangeText = {this.handleEmail}/>
            </TouchableOpacity>                

            <TouchableOpacity style={{backgroundColor:"black", padding:8, borderRadius:10,  alignItems:"center",width:200, left:90, marginTop:50}} onPress={() => this.HandleForgotPassword(this.state.email)}>
            <Text style={{fontSize:20, fontWeight:"bold", color:"white"}}> RESET PASSWORD </Text>
            </TouchableOpacity>

            {this.state.errorMessage &&
                <Text style={{color: '#ff0000',fontSize: 18,textAlign:'center',marginTop: 10, fontWeight: '600'}}>
                            {this.state.errorMessage}
                </Text>}

            </View>
        </>
    }
};

