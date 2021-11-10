import React from 'react';  
import {Text, Image,ImageBackground} from 'react-native-elements';  
import {View,Button,TouchableOpacity} from 'react-native';
import { Linking, Platform } from 'react-native';
import HomeScreen from './Homepage.js'; 
import EditProfile from './EditProfile.js';
import Receipts from './Receipts.js';
import ScanQR from './ScanQR.js';
import * as firebase from 'firebase';
import * as Animatable from 'react-native-animatable';
import {firebaseApp} from '../config/firebase';
import navigatePicture from './navigate-icon.png';
import UserAccount from './UserAccount.js';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';

export default class Map extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            markers : []
        }
    }

    loadVendingMachineLocationData = () => {
        firebaseApp.database().ref("machines/").on("value", snapshot =>{
            let responseList = Object.values(snapshot.val())
            console.log("Response" + responseList)
            this.setState({markers : responseList})
        });
    }

    markerClick =  (lat, long) => {
        const scheme = 'https://www.google.com/maps/dir/?api=1&travelmode=walking&dir_action=navigate&destination='
        const latLng = `${lat},${long}`;
        const url =  `${scheme}${latLng}`
        console.log(url)
        Linking.canOpenURL(url).then(supported => {
        if (!supported) {
            console.log('Can\'t handle url: ' + url);
        } else {
            Linking.openURL(url);
        }
        }).catch(err => console.error('An error occurred', err)); 
    };              

    componentDidMount(){
        this.loadVendingMachineLocationData()
    }    

    render(){
        const email = this.props.navigation.getParam('text');
        
        return<>
        <View style={{flex:1, backgroundColor:"#46B2E0"}}>
            <View style={{flexDirection:"row",justifyContent:'space-between', paddingLeft:15, paddingRight:10}}>
            <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
            <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{alert("Notification!")}}>
            <Image source={require('./notification-icon.png')} style={{height:50, width:50,marginTop:70}} />
            </TouchableOpacity>
            </View>
   
            <MapView
            style={{height:'50%', width:'90%', left:20, marginTop:70}}
            provider ={PROVIDER_GOOGLE}
            initialRegion={{
                latitude: 42.880230,
                longitude: 	-78.878738,
                latitudeDelta: 0.01,
                longitudeDelta:0.01
            }}
            showsUserLocation={true} 
            showsMyLocationButton = {true}
            toolbarEnabled = {true}
            >

            {this.state.markers.map((marker,i) => (
                <MapView.Marker 
                key={i}
                coordinate={{latitude: marker.latitude, longitude: marker.longitude}}>
                <Callout tooltip={true} onPress={() =>{this.markerClick(marker.latitude, marker.longitude)}}>
                    <Text style={{fontSize:20}}>{marker.title} </Text>
                    <Text style={{fontSize:18, textAlign:"center"}}> navigate! </Text>
                    {/* <View>
                        <Image source={navigatePicture} style={{height:50, width:50}} />
                    </View> */}
                </Callout>
                </MapView.Marker>
            ))}
            </MapView>

            <View style={{flexDirection:"row",justifyContent:'space-between', paddingLeft:25, paddingRight:25, marginTop:80}}>
            <TouchableOpacity onPress={()=>{alert("Help!")}}>
            <Image source={require('./help-icon.png')} style={{height:80, width:90}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('ScanQR')} >
            <Image source={require('./scan-icon.png')} style={{height:70, width:120}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('UserAccount', {text: email})} >
            <Image source={require('./user-icon.png')} style={{height:80, width:80}} />
            </TouchableOpacity>
            </View>
        </View>
        </>
    }
};
