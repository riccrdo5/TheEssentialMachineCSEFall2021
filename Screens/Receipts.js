import React from 'react';  
import {Button, Text, Image,ImageBackground} from 'react-native-elements';  
import {View, TouchableOpacity} from 'react-native';
import { StackNavigator } from "react-navigation";

export default class HomeScreen extends React.Component{
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

            <Text style={{fontSize:30, color:'white', fontWeight:'bold', textAlign:'center', marginTop:10}}> Your Receipts </Text>

            <View style={{margin: 20, marginTop:50, height:70, width:350, left:3, backgroundColor:'white', borderRadius:20}}>
            <Text style={{fontSize:25, fontWeight:"700", textAlign:'center', marginTop:20}}> Paid {amount} to {vendingMachine} </Text>
            </View>
            <View style={{margin: 20, height:70, width:350, left:3, backgroundColor:'white', borderRadius:20}}>
            <Text style={{fontSize:25, fontWeight:"700", textAlign:'center', marginTop:20}}> Paid {amount} to {vendingMachine} </Text>
            </View>
            
            <View style={{margin: 20, height:70, width:350, left:3, backgroundColor:'white', borderRadius:20}}>
            <Text style={{fontSize:25, fontWeight:"700", textAlign:'center', marginTop:20}}> Paid {amount} to {vendingMachine} </Text>
            </View>

            <View style={{margin: 20, height:70, width:350, left:3, backgroundColor:'white', borderRadius:20}}>
            <Text style={{fontSize:25, fontWeight:"700", textAlign:'center', marginTop:20}}> Paid {amount} to {vendingMachine} </Text>
            </View>
        </View>
        </>
    }
};

