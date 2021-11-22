import React from 'react';  
import {Button, Text, Image,ImageBackground} from 'react-native-elements';  
import {View, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import { StackNavigator } from "react-navigation";
import {firebaseApp} from '../config/firebase';
import * as firebase from 'firebase';
import ImagePicker from 'react-native-image-crop-picker';
const firestoreDb = firebaseApp.firestore();
firestoreDb.settings({ experimentalForceLongPolling: true });
import ScanQR from './ScanQR.js';

export default class SendNotification extends React.Component{
    constructor(props){
        super(props)
    }

    state = {
        title: '',
        body : '', 
        image: ''
    }

    handleNotificationTitle = (text) => {
        this.setState({ title: text })
    }

    handleNotificationBody = (text) => {
        this.setState({ body: text })
    }

    uploadPhotoFromGallery (){
        ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
        }).then(image => {
        console.log(image);
        this.setState({image: image.path})
        });
    }

    handleSendNotification = async() =>{
        console.log("Title:"+this.state.title);
        console.log("Body:"+this.state.body);
        // console.log(FirebaseInstanceId.getInstance().getToken())
        tokens = []
        await firestoreDb.collection("notifications").get().then(async(querySnapshot) => {
            const data = querySnapshot.docs.map(doc => doc.data());
            console.log(JSON.stringify(data));
            for (var i = 0; i < data.length; i++) {
                devicesInfo = data[i].devices;
                for(var j=0; j<devicesInfo.length; j++){
                    tokens.push(devicesInfo[j].token)
                }
            }
        });
        console.log(JSON.stringify(tokens))
        console.log(typeof(this.state.image))
        await fetch('https://us-central1-the-essential-machine.cloudfunctions.net/sendNotification', {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: this.state.title,
                message: this.state.body,
                image: this.state.image,
                fcmTokens: tokens
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
            console.log("Final Response" + JSON.stringify(responseJson));
        });
    }


    render(){
        return<>
        <View style={{flex:1, backgroundColor:"#46B2E0"}}>
            <View style={{flexDirection:"row",justifyContent:'space-between', paddingLeft:15, paddingRight:10}}>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('ScanQR')} >
            <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70}}/>
            </TouchableOpacity>
            </View>

            <ScrollView>
            <View style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, height:50, width:300, left:30, borderRadius:20, marginTop:25 }}>
            <TextInput style={{fontSize:15, color:'grey'}} placeholder="  Notification Title" placeholderTextColor="black"
                  onChangeText = {this.handleNotificationTitle}/>
            </View>

            <View style={{flexDirection:"row", backgroundColor:"white", padding:8, height:200, width:300, left:30, borderRadius:20, marginTop:25 }}>
            <TextInput numberOfLines={3} multiline={true} style={{fontSize:15, color:'grey'}} placeholder="  Notification Body" placeholderTextColor="black"
                  onChangeText = {this.handleNotificationBody}/>
            </View>

            
            {this.state.image!='' && 
            <View>
                <TouchableOpacity style={{marginTop:20, alignItems: 'center',}}
                onPress={() => this.uploadPhotoFromGallery()}>
                <Image source={{uri: this.state.image}} style={{justifyContent: 'center', height:200, width:200}} />
                </TouchableOpacity>
            </View>
            }

            <TouchableOpacity style={{backgroundColor:"black", padding:8, borderRadius:10,  alignItems:"center",width:220, left:70, marginTop:25}} 
             onPress={() => this.uploadPhotoFromGallery()}>
                <Text style={{fontSize:20, fontWeight:"bold", color:"white"}}> Upload Image </Text>
            </TouchableOpacity>

             <TouchableOpacity style={{backgroundColor:"black", padding:8, borderRadius:10,  alignItems:"center",width:220, left:70, marginTop:25}} 
             onPress={() => this.handleSendNotification()}>
                <Text style={{fontSize:20, fontWeight:"bold", color:"white"}}> SEND NOTIFICATION </Text>
            </TouchableOpacity>
            </ScrollView>

        </View>
        </>
    }
};

