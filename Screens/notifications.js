import React from 'react';  
import {Button, Text, Image,ImageBackground} from 'react-native-elements';  
import {View, TextInput, TouchableOpacity} from 'react-native';
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

render(){
        // const amount='$10'
        // const vendingMachine='VM1'

        return<>
        <View style={{flex:1, backgroundColor:"#46B2E0"}}>
            {/* <View style={{flexDirection:"row",justifyContent:'space-between', paddingLeft:15, paddingRight:10}}>
            </View> */}
            <View style={{marginTop:70}}>
            {this.state.promotions && this.state.promotions.map(promo => (
                <View style={{margin: 20, marginTop:15, height:50, width:350, left:3, backgroundColor:'white', borderRadius:20}}>
                    <Text style={{fontSize:20, fontWeight:"700", textAlign:'left', paddingLeft:20, marginTop:15}}> ${promo.body} : {promo.coupon} </Text>
                </View>
            ))}
            </View>
        </View>
        </>
    }
};
