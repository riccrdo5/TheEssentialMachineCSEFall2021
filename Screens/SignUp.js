import React from 'react';
import { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import {Button, Text, Image,ImageBackground} from 'react-native-elements';
import {StyleSheet,StatusBar,View, TextInput, TouchableOpacity,SafeAreaView, KeyboardAvoidingView,ScrollView, AsyncStorage} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import UserAccount from './UserAccount.js';
import HomeScreen from './Homepage.js';
import { StackNavigator } from "react-navigation";
import {firebaseApp} from '../config/firebase';
import * as firebase from 'firebase';
import ScanQR from './ScanQR.js';
import Feather from 'react-native-vector-icons/Feather';
Feather.loadFont();
import PushNotification from "react-native-push-notification";
import helpPage from './helpPage.js';
const firestoreDb = firebaseApp.firestore();
firestoreDb.settings({ experimentalForceLongPolling: true });

export default class SignUp extends React.Component{
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
        isValidFirstName: true,
        tickValidFirstName: false,
        isValidLastName: true,
        tickValidlastName: false,
        isValidSchool: true,
        tickValidSchool: false,
        isValidCity: true,
        tickValidCity: false,
        isValidState: true,
        tickValidState: false,
        isValidZip: true,
        tickValidZip: false,
        isValidEmail: true,
        tickValidEmail: false,
        isValidPassword: true,
        tickValidPassword: false,
        isValidConfirmPassword: true,
        tickValidConfirmPassword: false
        }

    handleEmail = (text) => {
        this.setState({ email: text })
        this.setState({isValidEmail: true})
        this.setState({tickValidEmail: false})
     }
     handlePassword = (text) => {
        this.setState({ password: text })
        this.setState({isValidPassword: true})
        this.setState({tickValidPassword: false})
     }
     handleFirstName = (text) => {
        this.setState({ firstName: text })
        this.setState({isValidFirstName: true})
        this.setState({tickValidFirstName: false})
     }   
      handleLastName = (text) => {
        this.setState({ lastName: text })
        this.setState({isValidLastName: true})
        this.setState({tickValidLastName: false})
     }
     handleSchool= (text) => {
        this.setState({ school: text })
        this.setState({isValidSchool: true})
        this.setState({tickValidSchool: false})
     }   
      handleCity = (text) => {
        this.setState({ city: text })
        this.setState({isValidCity: true})
        this.setState({tickValidCity: false})
     }
     handleState = (text) => {
        this.setState({ state: text })
        this.setState({isValidState: true})
        this.setState({tickValidState: false})
     }   
      handleZip = (text) => {
        this.setState({ zip: text })
        this.setState({isValidZip: true})
        this.setState({tickValidZip: false})
     }
     handleConfirmPassword = (text) => {
        this.setState({ confirmPassword: text })
        this.setState({isValidConfirmPassword: true})
        this.setState({tickValidConfirmPassword: false})
    }

    addUserInfoForNotifications = async(email, fullname) => {
        console.log("Entered addUserInfoForNotifications")
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (error, stores) => {
            stores.map((result, i, store) => {
            console.log({ [store[i][0]]: store[i][1] });
            return true;
            });
        });
        });

        deviceToken = await AsyncStorage.getItem('deviceToken');
        var dbRef = firestoreDb.collection("notifications").where("email","==", email)
        await dbRef
        .get()
        .then(async(querySnapshot) => {
            const data = querySnapshot.docs.map(doc => doc.data());
            const key = querySnapshot.docs.map(doc => doc.id);
            const docId = Object.values(key)[0]
            if(Object.keys(data).length){
                console.log("Document Already Exists");
                deviceInfo = {platform:Platform.OS,token:deviceToken}
                await firestoreDb.collection("notifications").doc(docId).update({
                    devices: firebase.firestore.FieldValue.arrayUnion(deviceInfo)
                });
            } else{
                console.log("No Such Document Exists");
                await firestoreDb.collection("notifications").add({
                name: fullname,
                email: email,
                devices: {platform: Platform.OS, token: deviceToken}
                });
            }
            this.props.navigation.navigate('ScanQR', {text: this.state.email})
        });
        console.log("Updation Complete")
    }

    storeUser(uid) {
        console.log("Entered Store User")
        firestoreDb.collection('users').doc(uid).set({
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
            await AsyncStorage.setItem('firstName', JSON.stringify(this.state.firstName));
            await AsyncStorage.setItem('lastName', JSON.stringify(this.state.lastName));
            await this.addUserInfoForNotifications(this.state.email, this.state.firstName+this.state.lastName)
          })
          .catch((err) => {
            console.error("Error found: ", err);
          });
      }


    onHandleSignup = async(email, pass) => {
        this.setState({ error: false })
        this.setState({ errorMessage:null })

        //Validation for Confirm Password
        if (pass !== this.state.confirmPassword) {
            await this.setState({isValidConfirmPassword: false})
        } else if(this.state.confirmPassword!=''){
            await this.setState({tickValidConfirmPassword: true})
        }

        //Validation for First Name
        if (this.state.firstName == ''){
            await this.setState({isValidFirstName: false});
        } else{
            await this.setState({tickValidFirstName: true});
        }

        //Validation for Last Name
        if (this.state.lastName == ''){
            await this.setState({isValidLastName: false});
        } else{
            await this.setState({tickValidLastName: true});
        }
        //Validation for State
        if (this.state.state == ''){
            await this.setState({isValidState: false});
        } else{
            await this.setState({tickValidState: true});
        }
        //Validation for City
        if (this.state.city == ''){
            await this.setState({isValidCity: false});
        } else{
            await this.setState({tickValidCity: true});
        }
        //Validation for Zipcode
        if (this.state.zip == ''){
            await this.setState({ isValidZip: false});
        } else{
            await this.setState({tickValidZip: true});
        }
        //Validation for School
        if (this.state.school == ''){
            await this.setState({ isValidSchool: false});
        } else{
            await this.setState({tickValidSchool: true});
        }

        if (this.state.email == ''){
            await this.setState({ isValidEmail: false});
        } else{
            await this.setState({tickValidEmail: true});
        }
        
        if (this.state.password == ''){
            await this.setState({ isValidPassword: false});
        } else{
            await this.setState({tickValidPassword: true});
        }
        if(this.state.tickValidFirstName && this.state.tickValidLastName && this.state.tickValidSchool && 
            this.state.tickValidCity && this.state.tickValidState && this.state.tickValidZip && this.state.tickValidEmail
             && this.state.tickValidPassword && this.state.tickValidConfirmPassword){
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

            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flex: 1}}>
            <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }} style={styles.scrollView}>
            <TouchableOpacity style={{width: 60, height: 60}} onPress={()=> this.props.navigation.navigate('HomeScreen')} >
            <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:10}}/>
            </TouchableOpacity>
            <Text style={{fontSize:30, color:'white', fontWeight:'bold', left:110}}> SIGN UP </Text>
            <View style={{left: 10}}>
            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:300, borderRadius:20, marginTop:20 }}>
                <Text style={{color:"red", fontSize: 20}}> * </Text>
                <Image source={require('./name-icon.png')} style={{height:15, width:15}} />
                <TextInput autoFocus={true} autoCapitalize='none' style={{fontSize:15, color:'grey', width:180, left:10}} placeholder="First Name"    placeholderTextColor="black" onChangeText={(val) => textInputChange(val)}
                  onChangeText = {this.handleFirstName}/>
                {this.state.tickValidFirstName? 
                <Animatable.View animation="bounceIn">
                    <Feather  name = "check-circle" color = "green" size = {20}/> 
                </Animatable.View> : null}
             </TouchableOpacity>

            {this.state.isValidFirstName? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{color:"#DC143C", fontSize: 15, fontWeight: "bold", left:40, marginTop:10}}>Please enter first name</Text>
            </Animatable.View>
            }
            
            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:300, borderRadius:20, marginTop:20 }} >
                <Text style={{color:"red", fontSize: 20}}> * </Text>
                <Image source={require('./name-icon.png')} style={{height:15, width:15}} />
                <TextInput autoCapitalize='none' style={{fontSize:15, color:'grey', width:230, left:10}} placeholder="Last Name" placeholderTextColor="black"
                  onChangeText = {this.handleLastName}/>
                  {this.state.tickValidLastName? 
                <Animatable.View animation="bounceIn">
                    <Feather  name = "check-circle" color = "green" size = {20}/> 
                </Animatable.View> : null}
            </TouchableOpacity>

            {this.state.isValidLastName? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{color:"#DC143C", fontSize: 15, fontWeight: "bold", left:40, marginTop:10}}>Please enter Last name</Text>
            </Animatable.View>
            }

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:300, borderRadius:20, marginTop:20 }} >
                <Text style={{color:"red", fontSize: 20}}> * </Text>
                <Image source={require('./school-icon.png')} style={{height:15, width:15}} />
                <TextInput autoCapitalize='none' style={{fontSize:15, color:'grey', width:230, left:10}} placeholder="School"
                placeholderTextColor="black"
                onChangeText = {this.handleSchool}/>
                {this.state.tickValidSchool? 
                <Animatable.View animation="bounceIn">
                    <Feather  name = "check-circle" color = "green" size = {20}/> 
                </Animatable.View> : null}
            </TouchableOpacity>

            {this.state.isValidSchool? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{color:"#DC143C", fontSize: 15, fontWeight: "bold", left:40, marginTop:10}}>Please enter School name</Text>
            </Animatable.View>
            }


            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:300, borderRadius:20, marginTop:20 }} >
                <Text style={{color:"red", fontSize: 20}}> * </Text>
                <Image source={require('./city-icon.png')} style={{height:15, width:15}} />
                <TextInput autoCapitalize='none' style={{fontSize:15, color:'grey', width:230, left:10}} placeholder="City"
                placeholderTextColor="black"
                onChangeText = {this.handleCity}/>
                {this.state.tickValidCity? 
                <Animatable.View animation="bounceIn">
                    <Feather  name = "check-circle" color = "green" size = {20}/> 
                </Animatable.View> : null}
            </TouchableOpacity>

            {this.state.isValidCity? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{color:"#DC143C", fontSize: 15, fontWeight: "bold", left:40, marginTop:10}}>Please enter City name</Text>
            </Animatable.View>
            }

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:300, borderRadius:20, marginTop:20 }} >
                <Text style={{color:"red", fontSize: 20}}> * </Text>
                <Image source={require('./city-icon.png')} style={{height:15, width:15}} />
                <TextInput autoCapitalize='none' style={{fontSize:15, color:'grey', width:230, left:10}} placeholder="State"
                placeholderTextColor="black"
                onChangeText = {this.handleState}/>
                {this.state.tickValidState? 
                <Animatable.View animation="bounceIn">
                    <Feather  name = "check-circle" color = "green" size = {20}/> 
                </Animatable.View> : null}
            </TouchableOpacity>

            {this.state.isValidState? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{color:"#DC143C", fontSize: 15, fontWeight: "bold", left:40, marginTop:10}}>Please enter State name</Text>
            </Animatable.View>
            }

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:300, borderRadius:20, marginTop:20 }} >
                <Text style={{color:"red", fontSize: 20}}> * </Text>
                <Image source={require('./map-icon.png')} style={{height:15, width:15}} />
                <TextInput autoCapitalize='none' style={{fontSize:15, color:'grey', width:230, left:10}} placeholder="ZipCode"
                    keyboardType="numeric"
                placeholderTextColor="black"
                onChangeText = {this.handleZip}/>
                {this.state.tickValidZip? 
                <Animatable.View animation="bounceIn">
                    <Feather  name = "check-circle" color = "green" size = {20}/> 
                </Animatable.View> : null}
            </TouchableOpacity>

            {this.state.isValidZip? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{color:"#DC143C", fontSize: 15, fontWeight: "bold", left:40, marginTop:10}}>Please enter Zip Code</Text>
            </Animatable.View>
            }

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:300, borderRadius:20, marginTop:20 }} >
                <Text style={{color:"red", fontSize: 20}}> * </Text>
                <Image source={require('./email-icon.png')} style={{height:15, width:15}} />
                <TextInput autoCapitalize='none' style={{fontSize:15, color:'grey', width:230, left:10}} placeholder="Email Address"
                placeholderTextColor="black"
                keyboardType='email-address'
                textContentType='emailAddress'
                onChangeText = {this.handleEmail}/>
                {this.state.tickValidEmail? 
                <Animatable.View animation="bounceIn">
                    <Feather  name = "check-circle" color = "green" size = {20}/> 
                </Animatable.View> : null}
            </TouchableOpacity>

            {this.state.isValidEmail? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{color:"#DC143C", fontSize: 15, fontWeight: "bold", left:40, marginTop:10}}>Please enter Email Address</Text>
            </Animatable.View>
            }

            {this.state.errorMessage &&
                <Text style={styles.errorText}>
                        {this.state.errorMessage}
                </Text>
            }
            
            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:300, borderRadius:20, marginTop:20 }} >
                <Text style={{color:"red", fontSize: 20}}> * </Text>
                <Image source={require('./password-icon.png')} style={{height:15, width:15}} />
                <TextInput autoCapitalize='none' secureTextEntry={this.state.hiddenPassword} style={{fontSize:15, color:'grey', paddingRight:150, width:235, left:10}} placeholder="Password"
                placeholderTextColor="black"
                onChangeText = {this.handlePassword}/>
                
                <TouchableOpacity style={{alignItems:'flex-end'}} onPress={()=>this.setState({ hiddenPassword: !this.state.hiddenPassword })}>
                <Image source={require('./passwordshow-icon.png')} style={{height:15, width:15}} />
                {this.state.tickValidPassword? 
                <Animatable.View animation="bounceIn">
                    <Feather  name = "check-circle" color = "green" size = {20}/> 
                </Animatable.View> : null}
                </TouchableOpacity>
            </TouchableOpacity>

            {this.state.isValidPassword? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{color:"#DC143C", fontSize: 15, fontWeight: "bold", left:40, marginTop:10}}>Please enter Password</Text>
            </Animatable.View>
            }

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:300, borderRadius:20, marginTop:20 }} >
                <Text style={{color:"red", fontSize: 20}}> * </Text>
                <Image source={require('./password-icon.png')} style={{height:15, width:15}} />
                <TextInput autoCapitalize='none' secureTextEntry={this.state.hiddenConfirmPassword} style={{fontSize:15, color:'grey', paddingRight:89, width:235, left:10}} placeholder="Confirm Password"
                placeholderTextColor="black"
                onChangeText = {this.handleConfirmPassword}
                />
                <TouchableOpacity style={{alignItems:'flex-end'}} onPress={()=>this.setState({ hiddenConfirmPassword: !this.state.hiddenConfirmPassword })}>
                <Image source={require('./passwordshow-icon.png')} style={{height:15, width:15}} />
                </TouchableOpacity>
                {this.state.tickValidConfirmPassword? 
                <Animatable.View animation="bounceIn">
                    <Feather  name = "check-circle" color = "green" size = {20}/> 
                </Animatable.View> : null}
            </TouchableOpacity>

             {this.state.isValidConfirmPassword? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{color:"#DC143C", fontSize: 15, fontWeight: "bold", marginTop:10}}>Password and Confirm Password are not matching</Text>
            </Animatable.View>
            }

            <TouchableOpacity style={{backgroundColor:"black", padding:8, borderRadius:10,  alignItems:"center",width:250, left:30, top:25}}
            onPress={
                () => this.onHandleSignup(this.state.email, this.state.password)
             }>     
            <Text style={{fontSize:20, fontWeight:"bold", color:"white"}} > CREATE ACCOUNT </Text>
            </TouchableOpacity>
            </View>

            <TouchableOpacity style={{width: 80, height: 80}} onPress={()=>{this.props.navigation.navigate('helpPage')}}>
            <Image source={require('./help-icon.png')} style={{height:60, width:60, left:-5, marginTop:30 }} />
            </TouchableOpacity>
            </ScrollView>
            </KeyboardAwareScrollView>
            </SafeAreaView>
            </View>
        </>
    }
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
      flex: 1,
      marginHorizontal: 30,
      flexGrow : 1.5
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
  

