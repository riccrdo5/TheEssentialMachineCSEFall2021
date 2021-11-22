import React from 'react';  
import {Button, Text, Image,ImageBackground} from 'react-native-elements';  
import {View, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';
import UserAccount from './UserAccount.js'; 
import { StackNavigator } from "react-navigation";
import HomeScreen from './Homepage.js'; 
import ForgotPassword from './ForgotPassword.js'; 
import ScanQR from './ScanQR.js';
import {firebaseApp} from '../config/firebase';
import * as firebase from 'firebase';
import PushNotification from "react-native-push-notification";
const firestoreDb = firebaseApp.firestore();
firestoreDb.settings({ experimentalForceLongPolling: true });
import helpPage from './helpPage.js';

export default class Login extends React.Component{

    constructor(){
        super();
    }
    
    createChannels = () =>{
        console.log("Channel Created")
        PushNotification.createChannel(
        {
        channelId : "test-local-channel",
        channelName: "Test Local Channel"
        }
        )
    }

    componentDidMount(){
        console.log("Entered")
        this.createChannels();
    }

    state = {
        email: '',
        password: '',
        hiddenPassword: true,
        errorMessage: null
    }

    handleEmail = (text) => {
        this.setState({ email: text })
    }
    
    handlePassword = (text) => {
        this.setState({ password: text })
    }

    addUserInfoForNotifications = async(email, fullname) => {
        deviceToken = await AsyncStorage.getItem("deviceToken")
        console.log("Device Token found "+deviceToken)
        var dbRef = firestoreDb.collection("notifications").where("email","==", email)
        await dbRef
        .get()
        .then(async(querySnapshot) => {
            const data = querySnapshot.docs.map(doc => doc.data());
            const key = querySnapshot.docs.map(doc => doc.id);
            const docId = Object.values(key)[0]
            if(Object.keys(data).length){
                console.log("Document Already Exists");
                var deviceInfo = {platform:Platform.OS, token:deviceToken}
                var currentDeviceInfo = data[0].devices
                console.log(typeof(currentDeviceInfo))
                console.log("Updated"+JSON.stringify(currentDeviceInfo));
                currentDeviceInfo.push(deviceInfo)
                console.log("Updated"+JSON.stringify(currentDeviceInfo));
                await firestoreDb.collection("notifications").doc(docId).update({
                    devices: currentDeviceInfo
                });
            } else{
                console.log("No Such Document Exists");
                await firestoreDb.collection("notifications").add({
                name: fullname,
                email: email,
                devices: {platform: Platform.OS, token: deviceToken}
                });
            }
        });
        console.log("Updation Complete")
    }

    handleSignIn = (email, pass) => {
        this.setState({ error: false })
        firebaseApp.auth().signInWithEmailAndPassword(email,pass)
            .then(async()=>{
                await AsyncStorage.setItem('isLoggedIn', '1');
                await AsyncStorage.setItem('UserEmail', email);
                var response = firestoreDb.collection('users')
                .where("email","==", this.state.email)
                .get()
                .then(async(querySnapshot) => {
                    const data = querySnapshot.docs.map(doc => doc.data());
                    res = data[0]
                    // alert(res);
                    await AsyncStorage.setItem('firstName', res.firstName);
                    await AsyncStorage.setItem('lastName', res.lastName);
                    this.addUserInfoForNotifications(this.state.email, this.state.firstName+this.state.lastName)
                    this.props.navigation.navigate('ScanQR', {text: email})
                });
            }) 
        .catch(error => this.setState({ errorMessage: error.message }));
    }

    render(){
        return<>
            <View style={{flex:1, backgroundColor:"#46B2E0"}}>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('HomeScreen')} >
            <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70, left:20}}/>
            </TouchableOpacity>

            <Text style={{fontSize:50, color:'white', fontWeight:'bold', textAlign:'center', marginTop:100}}> LOGIN </Text>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:320, left:30, borderRadius:20, marginTop:60 }}> 
                <Image source={require('./email-icon.png')} style={{height:30, width:30}} />
                <TextInput autoCapitalize='none' style={{fontSize:16, color:'grey'}} placeholder="  Email Address"  placeholderTextColor="black"
                keyboardType='email-address'
                textContentType='emailAddress'
                autoFocus={true}
                onChangeText = {this.handleEmail}/>
            </TouchableOpacity>
            
            <TouchableOpacity style={{flexDirection:"row", justifyContent:"space-between", backgroundColor:"white", alignItems:"center", padding:8, width:320, left:30, borderRadius:20, marginTop:30 }}> 
                <Image source={require('./password-icon.png')} style={{height:30, width:30}} />
                <TextInput autoCapitalize='none' secureTextEntry={this.state.hiddenPassword} style={{fontSize:16, color:'grey', right:90}} placeholder="Password"
                placeholderTextColor="black"
                onChangeText = {this.handlePassword}/>
                <TouchableOpacity onPress={()=>this.setState({ hiddenPassword: !this.state.hiddenPassword })}>
                <Image source={require('./passwordshow-icon.png')} style={{height:15, width:15}} />
                </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> this.props.navigation.navigate('ForgotPassword')}>
            <Text style={{fontSize:20, color:'white', fontWeight:'bold', textAlign:'right', marginTop:40, paddingRight:30}}> Forgot Password? </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{backgroundColor:"black", padding:8, borderRadius:10,  alignItems:"center",width:150, left:110, marginTop:50}} onPress={
                () => this.handleSignIn(this.state.email, this.state.password)
             }>
            <Text style={{fontSize:20, fontWeight:"bold", color:"white"}}> LOGIN </Text>
            </TouchableOpacity>

            {this.state.errorMessage &&
                <Text style={{color: '#ff0000',fontSize: 18, textAlign:'center', marginTop: 10, fontWeight: '600'}}>
                            {this.state.errorMessage}
                </Text>
            }

            <TouchableOpacity onPress={()=> this.props.navigation.navigate('helpPage')}>
            <Image source={require('./help-icon.png')} style={{height:60, width:60, left:20, marginTop:100 }} />
            </TouchableOpacity>

            </View>
        </>
    }
};

