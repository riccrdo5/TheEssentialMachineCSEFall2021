import React from 'react'; 
import {View,Alert} from 'react-native';
import ScanQR from './ScanQR';

export default class InvalidQRCode extends React.Component{
    componentDidMount(){
        Alert.alert('Alert',
        'Invalid QR Code',[
        { text: "OK", onPress: () => this.props.navigation.navigate('ScanQR')}
        ])
    }
    render(){
        return<>
        <View style={{flex:1, backgroundColor:"#46B2E0"}}> 
        </View>
        </>
    }
}
