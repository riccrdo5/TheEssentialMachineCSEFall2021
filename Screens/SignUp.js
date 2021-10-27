import React from 'react';
import { useState } from 'react';

import {Button, Text, Image,ImageBackground} from 'react-native-elements';
import {StyleSheet,StatusBar,View, TextInput, TouchableOpacity,SafeAreaView, ScrollView, AsyncStorage} from 'react-native';
import UserAccount from './UserAccount.js';
import HomeScreen from './Homepage.js';
import { StackNavigator } from "react-navigation";
import {firebaseApp} from '../config/firebase';
import ScanQR from './ScanQR.js';

export default class SignUp extends React.Component{
    constructor(){
        super();
    }

    state = {
        email: '',
        password: '',
        firstName:'',
        lastName:'',
        school:'',
        city:'',
        state:'',
        zip:'',
        confirmPassword:'',
        hiddenPassword:true,
        hiddenConfirmPassword:true,
        errorMessage: null,
        isLoading: false
        }

    handleEmail = (text) => {
        this.setState({ email: text })
     }
     handlePassword = (text) => {
        this.setState({ password: text })
     }
     handleFirstName = (text) => {
        this.setState({ firstName: text })
     }   
      handleLastName = (text) => {
        this.setState({ lastName: text })
     }
     handleSchool= (text) => {
        this.setState({ school: text })
     }   
      handleCity = (text) => {
        this.setState({ city: text })
     }
     handleState = (text) => {
        this.setState({ state: text })
     }   
      handleZip = (text) => {
        this.setState({ zip: text })
     }
     handleConfirmPassword = (text) => {
        this.setState({ confirmPassword: text })
    }

    storeUser(uid) {
        firebaseApp.firestore().collection('users').doc(uid).set({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            school: this.state.school,
            email: this.state.email,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
          }).then(async(res) => {
            await AsyncStorage.setItem('isLoggedIn', '1');
            await AsyncStorage.setItem('UserEmail', JSON.stringify(this.state.email));
            this.props.navigation.navigate('ScanQR', {text: this.state.email})
          })
          .catch((err) => {
            console.error("Error found: ", err);
          });
      }


    onHandleSignup = (email, pass) => {
        this.setState({ error: false })
        if (pass !== this.state.confirmPassword) {
            this.setState({ errorMessage: 'Passwords does not match' });
        } else if (this.state.firstName == ''){
            this.setState({ errorMessage: 'Please enter your first name' });
        } else if (this.state.lastName == ''){
            this.setState({ errorMessage: 'Please enter your last name' });
        }else if (this.state.state == ''){
            this.setState({ errorMessage: 'Please enter your state' });
        } else if (this.state.city == ''){
            this.setState({ errorMessage: 'Please enter your city' });
        }else if (this.state.zip == ''){
            this.setState({ errorMessage: 'Please enter your zip code' });
        }else if (this.state.school == ''){
            this.setState({ errorMessage: 'Please enter your school' });
        } else {
            firebaseApp.auth().createUserWithEmailAndPassword(email,pass)
            .then(
                (userCredential) => this.storeUser(userCredential.user.uid)
                ) 
            .catch(error => this.setState({ errorMessage: error.message }));
        }
    };

    render(){
        return<>
            <View style={{flex:1, backgroundColor:"#46B2E0"}}>
            <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>

            <TouchableOpacity onPress={()=> this.props.navigation.navigate('HomeScreen')} >
            <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:40, left:20}}/>
            </TouchableOpacity>

            <Text style={{fontSize:30, color:'white', fontWeight:'bold', textAlign:'center'}}> SIGN UP </Text>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:300, left:30, borderRadius:20, marginTop:20 }}>
                <Image source={require('./name-icon.png')} style={{height:15, width:15}} />
                <TextInput autoCapitalize='none' style={{fontSize:15, color:'grey'}} placeholder="  First Name"    placeholderTextColor="black"
                  onChangeText = {this.handleFirstName}/>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:300, left:30, borderRadius:20, marginTop:20 }} >
                <Image source={require('./name-icon.png')} style={{height:15, width:15}} />
                <TextInput autoCapitalize='none' style={{fontSize:15, color:'grey'}} placeholder="  Last Name" placeholderTextColor="black"
                  onChangeText = {this.handleLastName}/>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:300, left:30, borderRadius:20, marginTop:20 }} >
                <Image source={require('./school-icon.png')} style={{height:15, width:15}} />
                <TextInput autoCapitalize='none' style={{fontSize:15, color:'grey'}} placeholder="  School"
                placeholderTextColor="black"
                onChangeText = {this.handleSchool}/>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:300, left:30, borderRadius:20, marginTop:20 }} >
                <Image source={require('./city-icon.png')} style={{height:15, width:15}} />
                <TextInput autoCapitalize='none' style={{fontSize:15, color:'grey'}} placeholder="  City"
                placeholderTextColor="black"
                onChangeText = {this.handleCity}/>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:300, left:30, borderRadius:20, marginTop:20 }} >
                <Image source={require('./city-icon.png')} style={{height:15, width:15}} />
                <TextInput autoCapitalize='none' style={{fontSize:15, color:'grey'}} placeholder="  State"
                placeholderTextColor="black"
                onChangeText = {this.handleState}/>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:300, left:30, borderRadius:20, marginTop:20 }} >
                <Image source={require('./map-icon.png')} style={{height:15, width:15}} />
                <TextInput autoCapitalize='none' style={{fontSize:15, color:'grey'}} placeholder="  ZipCode"
                    keyboardType="numeric"
                placeholderTextColor="black"
                onChangeText = {this.handleZip}/>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:300, left:30, borderRadius:20, marginTop:20 }} >
                <Image source={require('./email-icon.png')} style={{height:15, width:15}} />
                <TextInput autoCapitalize='none' style={{fontSize:15, color:'grey'}} placeholder="  Email Address"
                placeholderTextColor="black"
                keyboardType='email-address'
                textContentType='emailAddress'
                autoFocus={true}
                onChangeText = {this.handleEmail}/>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", justifyContent:"space-between", backgroundColor:"white", alignItems:"center", padding:8, width:300, left:30, borderRadius:20, marginTop:20 }} >
                <Image source={require('./password-icon.png')} style={{height:15, width:15}} />
                <TextInput autoCapitalize='none' secureTextEntry={this.state.hiddenPassword} style={{fontSize:15, color:'grey', right:90}} placeholder=" Password"
                placeholderTextColor="black"
                onChangeText = {this.handlePassword}/>
                <TouchableOpacity style={{alignItems:'flex-end'}} onPress={()=>this.setState({ hiddenPassword: !this.state.hiddenPassword })}>
                <Image source={require('./passwordshow-icon.png')} style={{height:15, width:15}} />
                </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", justifyContent:"space-between", backgroundColor:"white", alignItems:"center", padding:8, width:300, left:30, borderRadius:20, marginTop:20 }} >
                <Image source={require('./password-icon.png')} style={{height:15, width:15}} />
                <TextInput autoCapitalize='none' secureTextEntry={this.state.hiddenConfirmPassword} style={{fontSize:15, color:'grey', right:60}} placeholder="  Confirm Password"
                placeholderTextColor="black"
                onChangeText = {this.handleConfirmPassword}
                />
                <TouchableOpacity style={{alignItems:'flex-end'}} onPress={()=>this.setState({ hiddenConfirmPassword: !this.state.hiddenConfirmPassword })}>
                <Image source={require('./passwordshow-icon.png')} style={{height:15, width:15}} />
                </TouchableOpacity>
            </TouchableOpacity>
            </ScrollView>
            </SafeAreaView>
            
            <TouchableOpacity style={{backgroundColor:"black", padding:8, borderRadius:10,  alignItems:"center",width:250, left:80, top:0}}
            onPress={
                () => this.onHandleSignup(this.state.email, this.state.password)
             }>     
            <Text style={{fontSize:20, fontWeight:"bold", color:"white"}} > CREATE ACCOUNT </Text>
            </TouchableOpacity>
           
            {this.state.errorMessage &&
                <Text style={styles.errorText}>
                            {this.state.errorMessage}
                </Text>}

            <TouchableOpacity onPress={()=>{alert("Help!")}}>
            <Image source={require('./help-icon.png')} style={{height:60, width:60, left:20, marginTop:0 }} />
            </TouchableOpacity>
            </View>
        </>
    }
};
const styles = StyleSheet.create({
    container: {
      flex: 0.95,
      paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
      marginHorizontal: 20,
    },
    text: {
      fontSize: 42,
    },
    errorText: {
        color: '#ff0000',
        fontSize: 18,
        textAlign:'center',
        marginTop: 10,
        marginBottom: 10,
        fontWeight: '600'
      }
  });
