import React from 'react';  
import {Button, Text, Image,ImageBackground} from 'react-native-elements';  
import {View, TextInput, TouchableOpacity, Clipboard} from 'react-native';
import { StackNavigator } from "react-navigation";
import {firebaseApp} from '../config/firebase';
import * as firebase from 'firebase';
import Receipts from './Receipts.js';
import Map from './Map.js';
import ScanQR from './ScanQR.js';
import UserAccount from './UserAccount.js';


export default class HomeScreen extends React.Component{
    constructor(props){
    super(props)
        
        // this.setState({email: text})
    }

    state = {
        promotions: []
    }

    componentDidMount(){
        firebaseApp.firestore().collection('promotions')
        .get()
        .then(snapshot =>{
            const data = snapshot.docs.map(doc => doc.data());  
            this.setState({promotions: data})
            console.log(JSON.stringify(this.state.promotions))
        })
    }

    handleCopy (coupon) {
        Clipboard.setString(coupon)
        alert('Copied to clipboard');
    }

    render(){
            // const amount='$10'
            // const vendingMachine='VM1'

            return<>
            <View style={{flex:1, backgroundColor:"#46B2E0"}}>
                <TouchableOpacity style={{left:20}} onPress={()=> this.props.navigation.goBack()}>
                    <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70}}/>
                </TouchableOpacity>
                <View style={{marginTop:20}}>
                {this.state.promotions && this.state.promotions.map(promo => (
                    <View style={{flexDirection:"row",margin: 10, marginTop:15, height:50, width:330, left:20, backgroundColor:'white', borderRadius:20}}>
                        <Text style={{fontSize:20, fontWeight:"700", textAlign:'left', paddingLeft:20, marginTop:15}}> ${promo.body} : {promo.coupon} </Text>
                        <TouchableOpacity onPress={()=> this.handleCopy(promo.coupon)} >
                            <Image source={require('./copy-icon.png')} style={{height:50, width:50, left:5}}/>
                        </TouchableOpacity>
                    </View>
                ))}
                </View>
            </View>
            </>
        }
};
