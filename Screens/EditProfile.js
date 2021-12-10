import React from 'react';  
import {Button, Text, Image,ImageBackground} from 'react-native-elements';  
import {StyleSheet, View, TextInput, TouchableOpacity,ScrollView} from 'react-native';
import UserAccount from './UserAccount.js'; 
import { StackNavigator } from "react-navigation"; 
import {firebaseApp} from '../config/firebase';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as firebase from 'firebase';
const firestoreDb = firebaseApp.firestore();
firestoreDb.settings({ experimentalForceLongPolling: true });
import helpPage from './helpPage.js';

export default class EditProfile extends React.Component{

    constructor(){
        super();
    }

    state = {
        email :'',
        password: '',
        firstName:'',
        lastName:'',
        school:'',
        city:'',
        state:'',
        zip:'',
        currentPassword:'',
        newPassword:'',
        confirmNewPassword:'',
        passwordChangeNeeded: false,
        errorMessage:'',
        successMessage:'',
        hiddenCurrentPassword:true,
        hiddenNewPassword:true,
        hiddenConfirmNewPassword:true,
    }

    fetchUserData = () =>{
        console.log("Entered")
        const response = firestoreDb.collection('users')
        .where("email","==", this.state.email)
        .get()
        .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());
            res = data[0]
            // alert(res);
            this.setState({firstName: res.firstName})
            this.setState({lastName: res.lastName})
            this.setState({school: res.school})
            this.setState({city: res.city})
            this.setState({state: res.state})
            this.setState({zip: res.zip})
        });
    }

    handleEmail = (text) => {
        this.setState({ email: text })
     }
     handlePassword = (text) => {
        this.setState({ password: text })
        this.setState({passwordChangeNeeded: true})
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

     handleCurrentPassword = (text) =>{
         this.setState({currentPassword: text})
         this.setState({passwordChangeNeeded: true})
     }
    
     handleNewPassword = (text) =>{
         this.setState({newPassword: text})
     }
      handleConfirmNewPassword = (text) =>{
         this.setState({confirmNewPassword: text})
         this.setState({passwordChangeNeeded: true})
     }

    reauthenticate = (password) =>{
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, password)
        return user.reauthenticateWithCredential(cred)
    }
    
    changePassword = (user) =>{
        this.setState({ error: false })
        alert('Entered');
        this.reauthenticate(this.state.currentPassword).then(()=>{
            alert('yay!');
            firebase.auth().currentUser.updatePassword(this.state.newPassword).then(()=>
            {
                this.setState({successMessage:'Changes saved successfully!'})
                this.timeoutHandle = setTimeout(()=>{
                        this.props.navigation.navigate('UserAccount')
                }, 1000); 
            })
            .catch(error => this.setState({ errorMessage: error.message }));
        }).catch(error => this.setState({ errorMessage: error.message }));
    }

    updateChanges = () => {
        this.setState({ error: false })

        if (this.state.firstName == ''){
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
        }else{ 
            if(this.state.passwordChangeNeeded==true){
                if(this.state.currentPassword==''){
                    this.setState({ errorMessage: 'Please enter the current Password' });
                }else if(this.state.newPassword==''){
                    this.setState({ errorMessage: 'Please enter the new Password' });
                }else if(this.state.confirmNewPassword==''){
                    this.setState({ errorMessage: 'Please confirm the new Password' });
                }else if (this.state.newPassword !== this.state.confirmNewPassword) {
                    this.setState({ errorMessage: 'Passwords does not match' });
                }else{
                    var user = firebase.auth().currentUser;
                    var uid = user.uid;

                    firestoreDb.collection('users').doc(uid).update({
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        school: this.state.school,
                        email: this.state.email,
                        city: this.state.city,
                        state: this.state.state,
                        zip: this.state.zip,
                    }).then(()=>{
                        if(this.state.passwordChangeNeeded==true){
                            this.changePassword();
                        }
                    });
                }
            }else{
                var user = firebase.auth().currentUser;
                var uid = user.uid;

                firestoreDb.collection('users').doc(uid).update({
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    school: this.state.school,
                    email: this.state.email,
                    city: this.state.city,
                    state: this.state.state,
                    zip: this.state.zip,
                }).then(()=>{
                    this.setState({successMessage:'Changes saved successfully!'})
                    this.timeoutHandle = setTimeout(()=>{
                        this.props.navigation.navigate('UserAccount')
                    }, 1000); 
            });
        }
    }
    }

    componentDidMount() {
        this.fetchUserData()
    }

    render(){
        const email = this.props.navigation.getParam('text');
        this.state.email = email
        return<>
            <View style={{flex:1, backgroundColor:"#46B2E0"}}>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flex: 1}}>
            <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }} style={styles.scrollView}>
            <View style={{flexDirection:"row",justifyContent:'space-between', paddingLeft:15, paddingRight:10}}>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('UserAccount')} >
            <Image source={require('./cross-icon.png')} style={{height:50, width:50,marginTop:60}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.updateChanges()} >
            <Image source={require('./tick-icon.png')} style={{height:50, width:50,marginTop:60}} />
            </TouchableOpacity>
            </View>

            <Text style={{fontSize:30, color:'white', fontWeight:'bold', textAlign:'center'}}> Edit Profile </Text>
            <View style={{left:10}}>
            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:300, borderRadius:20, marginTop:15 }}> 
                <Image source={require('./name-icon.png')} style={{height:20, width:20}} />
                <TextInput value={this.state.firstName} style={{fontSize:18, width:300, left:5, color:'grey'}} placeholder="  First Name" onChangeText={this.handleFirstName} />
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:300,borderRadius:20, marginTop:20 }} > 
                <Image source={require('./name-icon.png')} style={{height:20, width:20}} />
                <TextInput value={this.state.lastName} style={{fontSize:18,width:300, left:5, color:'grey'}} onChangeText={this.handleLastName} placeholder="  Last Name"/>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:300, borderRadius:20, marginTop:20 }} > 
                <Image source={require('./school-icon.png')} style={{height:20, width:20}} />
                <TextInput value={this.state.school} style={{fontSize:18, width:300, left:5,color:'grey'}} onChangeText={this.handleSchool} placeholder="  School"/>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:300, borderRadius:20, marginTop:20 }} > 
                <Image source={require('./city-icon.png')} style={{height:20, width:20}} />
                <TextInput value={this.state.city} style={{fontSize:18, width:300, left:5,color:'grey'}} onChangeText={this.handleCity} placeholder="  City"/>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:300, borderRadius:20, marginTop:20 }} > 
                <Image source={require('./city-icon.png')} style={{height:20, width:20}} />
                <TextInput value={this.state.state} style={{fontSize:18,width:300, left:5, color:'grey'}} onChangeText={this.handleState} placeholder="  State"/>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:300, borderRadius:20, marginTop:20 }} > 
                <Image source={require('./map-icon.png')} style={{height:20, width:20}} />
                <TextInput value={this.state.zip} style={{fontSize:18, width:300, left:5,color:'grey'}} onChangeText={this.handleZip} placeholder="  ZipCode"/>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:300, borderRadius:20, marginTop:20 }} onPress={()=>{alert("You cannot edit the email address")}}>
                <Image source={require('./email-icon.png')} style={{height:20, width:20}} />
                <TextInput editable={false} value={this.state.email} style={{fontSize:18,width:300, left:5, color:'grey'}} onChangeText={this.handleEmail} placeholder="  Email Address"/>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", justifyContent:"space-between", backgroundColor:"white", alignItems:"center", padding:8, width:300, borderRadius:20, marginTop:20 }} > 
                <Image source={require('./password-icon.png')} style={{height:20, width:20}} />
                <TextInput style={{fontSize:20, width:235, left:5,color:'grey'}}  secureTextEntry={this.state.hiddenCurrentPassword} onChangeText={this.handleCurrentPassword}  placeholder="  Current Password"/>
                <TouchableOpacity style={{alignItems:'flex-end'}} onPress={()=>this.setState({ hiddenCurrentPassword: !this.state.hiddenCurrentPassword })}>
                <Image source={require('./passwordshow-icon.png')} style={{height:15, width:15}} />
                </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", justifyContent:"space-between", backgroundColor:"white", alignItems:"center", padding:8, width:300, borderRadius:20, marginTop:20 }} > 
                <Image source={require('./password-icon.png')} style={{height:20, width:20}} />
                <TextInput style={{fontSize:20,width:235, left:5, color:'grey'}} secureTextEntry={this.state.hiddenNewPassword} onChangeText={this.handleNewPassword} placeholder="  New Password"/>
                <TouchableOpacity style={{alignItems:'flex-end'}} onPress={()=>this.setState({ hiddenNewPassword: !this.state.hiddenNewPassword })}>
                <Image source={require('./passwordshow-icon.png')} style={{height:15, width:15}} />
                </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:"row", justifyContent:"space-between", backgroundColor:"white", alignItems:"center", padding:8, width:300, borderRadius:20, marginTop:20 }} > 
                <Image source={require('./password-icon.png')} style={{height:20, width:20}} />
                <TextInput style={{fontSize:20, width:235, left:5,color:'grey'}} secureTextEntry={this.state.handleConfirmNewPassword} onChangeText={this.handleConfirmNewPassword} placeholder="  Confirm New Password"/>
                <TouchableOpacity style={{alignItems:'flex-end'}} onPress={()=>this.setState({ handleConfirmNewPassword: !this.state.handleConfirmNewPassword })}>
                <Image source={require('./passwordshow-icon.png')} style={{height:15, width:15}} />
                </TouchableOpacity>
            </TouchableOpacity>

            {this.state.errorMessage!='' &&
            <Text style={{color: '#ff0000',fontSize: 18,textAlign:'center', fontWeight: '600'}}> {this.state.errorMessage} </Text>}

             {this.state.successMessage!='' &&
            <Text style={{color: '#57f416',fontSize: 18,textAlign:'center', fontWeight: '600'}}> {this.state.successMessage} </Text>}
            </View>
            </ScrollView>
            </KeyboardAwareScrollView>

            
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('helpPage')}}>
            <Image source={require('./help-icon.png')} style={{height:60, width:60, left:20, marginTop:30 }} />
            </TouchableOpacity>
            </View>
        </>
    }
};

const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
      marginHorizontal: 30,
      flexGrow : 1.5
    }
  });