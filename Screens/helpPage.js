import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';
import CardPage from './card.js';
import { StackNavigator } from "react-navigation";

export default class helpPage extends Component {
  render() {
    return (
    <View style={{flex:1, backgroundColor:"#46B2E0"}}>
    <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
    <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70, left:10}}/>
    </TouchableOpacity>
      <ScrollView>

        <Text style={{left: 25, fontSize:25, top:30, textAlign: "justify", fontWeight:"bold", color:"black"}}> What do you need help with? </Text>

        <View style={{flexDirection:"row",justifyContent:'space-between', paddingLeft:25, paddingRight:25, marginTop:50}}>
        <TouchableOpacity 
         style={{backgroundColor:"white", padding:8, borderRadius:20,  alignItems:"center",width:150, height:100, left:10, marginTop:20}}
         onPress={() => this.props.navigation.navigate('CardPage', {option : 1})} >
        <Text style={{fontSize:15, top:30, textAlign: "justify", fontWeight:"bold", color:"black"}}> About TEM </Text>
        </TouchableOpacity>
        <TouchableOpacity 
         style={{backgroundColor:"white", padding:8, borderRadius:20,  alignItems:"center",width:150, height:100, left:5, marginTop:20}}
         onPress={() => this.props.navigation.navigate('CardPage', {option : 2})} >
        <Text style={{fontSize:15, top:30, textAlign: "justify", fontWeight:"bold", color:"black"}}> Account Creation </Text>
        </TouchableOpacity>
        </View>

        <View style={{flexDirection:"row",justifyContent:'space-between', paddingLeft:25, paddingRight:25, marginTop:30}}>
        <TouchableOpacity 
         style={{backgroundColor:"white", padding:8, borderRadius:20,  alignItems:"center",width:150, height:100, left:10, marginTop:20}}
         onPress={() => this.props.navigation.navigate('CardPage', {option : 3})} >
        <Text style={{fontSize:15, top:30, fontWeight:"bold", color:"black"}}> Login/Forgot Password </Text>
        </TouchableOpacity>
        <TouchableOpacity 
         style={{backgroundColor:"white", padding:8, borderRadius:20,  alignItems:"center",width:150, height:100, left:5, marginTop:20}}
         onPress={() => this.props.navigation.navigate('CardPage', {option : 4})} >
        <Text style={{fontSize:15, top:30, textAlign: "justify", fontWeight:"bold", color:"black"}}> Update Info </Text>
        </TouchableOpacity>
        </View>

        <View style={{flexDirection:"row",justifyContent:'space-between', paddingLeft:25, paddingRight:25, marginTop:30}}>
        <TouchableOpacity 
         style={{backgroundColor:"white", padding:8, borderRadius:20,  alignItems:"center",width:150, height:100, left:10, marginTop:20}}
         onPress={() => this.props.navigation.navigate('CardPage', {option : 5})} >
        <Text style={{fontSize:15, top:30, fontWeight:"bold", color:"black"}}> Payment Options </Text>
        </TouchableOpacity>
        <TouchableOpacity 
         style={{backgroundColor:"white", padding:8, borderRadius:20,  alignItems:"center",width:150, height:100, left:5, marginTop:20}}
         onPress={() => this.props.navigation.navigate('CardPage', {option : 6})} >
        <Text style={{fontSize:15, top:30, fontWeight:"bold", color:"black"}}> Locate Vending Machines </Text>
        </TouchableOpacity>
        </View>

        <View style={{flexDirection:"row",justifyContent:'space-between', paddingLeft:25, paddingRight:25, marginTop:30}}>
        <TouchableOpacity 
         style={{backgroundColor:"white", padding:8, borderRadius:20,  alignItems:"center",width:150, height:100, left:10, marginTop:20}}
         onPress={() => this.props.navigation.navigate('CardPage', {option : 7})} >
        <Text style={{fontSize:15, top:30, fontWeight:"bold", color:"black"}}> How our App works </Text>
        </TouchableOpacity>
        <TouchableOpacity 
         style={{backgroundColor:"white", padding:8, borderRadius:20,  alignItems:"center",width:150, height:100, left:5, marginTop:20}}
         onPress={() => this.props.navigation.navigate('CardPage', {option : 8})} >
        <Text style={{fontSize:15, top:30, fontWeight:"bold", color:"black"}}> Contact Us! </Text>
        </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#B0BEC5',
    borderRadius : 25
  },
});


