import React from 'react';  
import {Button, Text, Image,ImageBackground} from 'react-native-elements';  
import {View, StyleSheet, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { StackNavigator } from "react-navigation";
import {firebaseApp} from '../config/firebase';
import * as firebase from 'firebase';
const firestoreDb = firebaseApp.firestore();
firestoreDb.settings({ experimentalForceLongPolling: true }, {merge:true});
import notifications from './notifications.js';

export default class HomeScreen extends React.Component{
    constructor(props){
        super(props)
        
        // this.setState({email: text})
    }

    state = {
        receipts: [],
        email : ''
    }

    componentDidMount = async() => {
        const email = this.props.navigation.getParam('text');
        console.log(email)
        await firestoreDb.collection('receipts')
        .where("email","==", email)
        .get()
        .then(snapshot =>{
            console.log(JSON.stringify(snapshot))
            const data = snapshot.docs.map(doc => doc.data());  
            console.log(data)
            this.setState({receipts: data})
            console.log(JSON.stringify(this.state.receipts))
        })
    }

    render(){

        return<>
        <View style={{flex:1, backgroundColor:"#46B2E0"}}>
        <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }} style={styles.scrollView}>
            <View style={{flexDirection:"row",justifyContent:'space-between', paddingLeft:15, paddingRight:10}}>
            <TouchableOpacity onPress={()=> this.props.navigation.goBack()} >
            <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('notifications')} >
            <Image source={require('./notification-icon.png')} style={{height:50, width:50,marginTop:70}} />
            </TouchableOpacity>
            </View>

            <Text style={{fontSize:30, color:'white', fontWeight:'bold', textAlign:'center', marginTop:10, marginBottom:20}}> Your Receipts </Text>

        {this.state.receipts && this.state.receipts.map(receipt => (
            <View style={{marginTop:15, height:50, width:310, backgroundColor:'white', borderRadius:20}}>
                <Text style={{fontSize:16, fontWeight:"700", textAlign:'center', marginTop:20}}> Paid ${receipt.amount} to Vending Machine {receipt.vendingMachineNumber} </Text>
            </View>
        ))}
        </ScrollView>
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