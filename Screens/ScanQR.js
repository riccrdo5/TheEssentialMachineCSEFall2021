import React from 'react';  
import {Button, Text, Image,ImageBackground} from 'react-native-elements';  
import {View, TouchableOpacity, StyleSheet,AsyncStorage} from 'react-native';
import { StackNavigator } from "react-navigation";
import UserAccount from './UserAccount.js';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import {firebaseApp} from '../config/firebase';
import PushNotification from "react-native-push-notification";
import SendNotification from './sendNotification.js'
import Map from './Map.js'
import PaymentOptions from './PaymentOptions.js';
import helpPage from './helpPage.js';
import notifications from './notifications.js';

export default class ScanQR extends React.Component{

    constructor(){
        super();
    }

    state = {
       isAdmin: ''
    }

    //   handleNotification = () =>{
    //   console.log("Pressed")
    //   PushNotification.localNotification({
    //     channelId : "test-local-channel",
    //     title :"You clicked on Send notification",
    //     message: "You did it!",
    //     bigText: "Hi Niharika you did it!!"
    //   });
    //   }

    //   PushNotification.localNotificationSchedule({
    //         channelId : "test-local-channel",
    //         title :"Alarm!!",
    //         message: "You did it After 10seconds!",
    //         date: new Date(Date.now()+10*1000),
    //         allowWhileIdle: true
    //   });

    // }

    createChannels = () =>{
        console.log("Channel Created")
        PushNotification.createChannel(
        {
        channelId : "test-local-channel",
        channelName: "Test Local Channel"
        }
        )
    }

    componentDidMount = async() => {
        console.log("Entered")
        this.createChannels();
        userEmail = await AsyncStorage.getItem('UserEmail'); 
        console.log("UserEmail"+userEmail)
        if(userEmail.startsWith('"')){
            userEmail = userEmail.slice(1,-1)
        }
        if(userEmail == 'contact@theessentialmachine.com'){
            this.setState({isAdmin: 1})
        }
    }

    getTransactionDetails = (vm_id, email) => {
        console.log("Entered VM!")
        var machineId = ''
        var amt = ''
        firebaseApp.database().ref("machines/").orderByChild('name').equalTo(vm_id).on("value", snapshot =>{
            machineId = Object.keys(snapshot.val())[0]
            let responseList = Object.values(snapshot.val())
            console.log(responseList[0].transaction_amount)
            amt =  responseList[0].transaction_amount
        });
        console.log("MachineId " +  machineId)
        console.log("Amount" + amt)
        var ref = firebaseApp.database().ref("machines/").child(machineId)
        ref.update({ active_user_id : email });
        return [amt, machineId, vm_id]
    }

    onSuccess = async(e) => {
            console.log(e.data)
            let user = await AsyncStorage.getItem('UserEmail');  
            var obj = this.getTransactionDetails(e.data, user)
            var amt = obj[0]
            var machineId = obj[1]
            var vm_num = obj[2]
            console.log("Got amount " + amt)
            console.log("Got id " + machineId)
            console.log("Got VM " + vm_num)
            this.props.navigation.navigate('PaymentOptions', {text: amt, id:machineId, vm_id:vm_num});     
            this.scanner.reactivate();       
    };


    render(){
        const email = this.props.navigation.getParam('text');

        return<>
        <View style={{flex:1, backgroundColor:"#46B2E0"}}>
            <View style={{flexDirection:"row",justifyContent:'space-between', paddingLeft:15, paddingRight:10}}>
            <TouchableOpacity>
            <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('notifications')} >
            <Image source={require('./notification-icon.png')} style={{height:50, width:50,marginTop:70}} />
            </TouchableOpacity>
            </View>

            <Text style={{padding:20, fontSize:30, fontWeight:'bold', textAlign:'center', marginTop:40}}> Scan the QR Code to make the payment </Text>

            <View style={{marginTop:20, paddingLeft:30}}>
                <QRCodeScanner 
                    reactivate={true}
                    showMarker={true}
                    ref={(node) => { this.scanner = node }}
                    onRead={this.onSuccess}
                    cameraStyle={[{backgroundColor:'white', overflow:'hidden', position: 'absolute', height: 330, width: 315, borderRadius:20}]}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                />
            </View>           

            <View style={{flexDirection:"row",justifyContent:'space-between', paddingLeft:25, paddingRight:25, marginTop:400}}>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('helpPage')}>
            <Image source={require('./help-icon.png')} style={{height:80, width:90}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Map')} >
            <Image source={require('./map-icon.png')} style={{height:80, width:90}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('UserAccount', {text: email})} >
            <Image source={require('./user-icon.png')} style={{height:80, width:80}} />
            </TouchableOpacity>
            
            {this.state.isAdmin==1 && 
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('SendNotification')}>
                    <Image source={require('./send-notification-icon.png')} style={{height:60, width:80}} />
                </TouchableOpacity>
            }
            </View>
            


        </View>
        </>
    }
};

