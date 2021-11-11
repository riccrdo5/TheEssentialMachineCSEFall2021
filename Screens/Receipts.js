import React from 'react';  
import {Button, Text, Image,ImageBackground} from 'react-native-elements';  
import {View, TextInput, TouchableOpacity} from 'react-native';
import { StackNavigator } from "react-navigation";
import {firebaseApp} from '../config/firebase';
import * as firebase from 'firebase';



export default class HomeScreen extends React.Component{
    constructor(props){
        super(props)
        
        // this.setState({email: text})
    }

    state = {
        receipts: [],
        email : ''
    }

    componentDidMount(){
        const email = this.props.navigation.getParam('text');
        firebaseApp.firestore().collection('receipts')
        .where("email","==", email)
        .get()
        .then(snapshot =>{
            const data = snapshot.docs.map(doc => doc.data());  
            this.setState({receipts: data})
            console.log(JSON.stringify(this.state.receipts))
        })
    }

    render(){
        const amount='$10'
        const vendingMachine='VM1'

        return<>
        <View style={{flex:1, backgroundColor:"#46B2E0"}}>
            <View style={{flexDirection:"row",justifyContent:'space-between', paddingLeft:15, paddingRight:10}}>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('UserAccount')} >
            <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{alert("Notification!")}}>
            <Image source={require('./notification-icon.png')} style={{height:50, width:50,marginTop:70}} />
            </TouchableOpacity>
            </View>

            <Text style={{fontSize:30, color:'white', fontWeight:'bold', textAlign:'center', marginTop:10, marginBottom:20}}> Your Receipts </Text>

            {this.state.receipts && this.state.receipts.map(receipt => (
                <View style={{margin: 20, marginTop:15, height:70, width:330, left:3, backgroundColor:'white', borderRadius:20}}>
                    <Text style={{fontSize:20, fontWeight:"700", textAlign:'center', marginTop:20}}> Paid ${receipt.amount} to Vending Machine {receipt.vendingMachineNumber} </Text>
                </View>
            ))}
        </View>
        </>
    }
};

