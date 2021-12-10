import React from 'react'; 
import {View,ActivityIndicator} from 'react-native';
import ScanQR from './ScanQR';

export default class PayPalProcessing extends React.Component{
    componentDidMount(){
        console.log("Entered PayPalProcessing")
    }
    render(){
        return<>
        <View style={{flex:1, backgroundColor:"#46B2E0"}}> 
            <ActivityIndicator size="large" />
        </View>
        </>
    }
}
