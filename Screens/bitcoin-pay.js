import React from 'react';  
import {Button, Text, Image,ImageBackground} from 'react-native-elements';  
import {View, TextInput, TouchableOpacity} from 'react-native';
import UserAccount from './UserAccount.js'; 
import PaymentOptions from './PaymentOptions.js';
import HomeScreen from './Homepage.js'; 
import { StackNavigator } from "react-navigation"; 
import BitcoinPaySuccess from './bitcoin-pay-success';
import{WebView} from 'react-native-webview'

export default class BitcoinPay extends React.Component{
    constructor(props) {
        super(props);
        this.state = { urlVal: ""};
    }
    componentDidMount() {
        const amount = this.props.navigation.getParam('text');
        let formData = new FormData();
        formData.append('storeId', '2qwRZJGfsxMjukdxbfecDABbyc3dUiW2gxFuFQ27yeQa');
        formData.append('price', amount);
        formData.append('currency', 'USD');

        fetch('https://btcpayjungle.com/api/v1/invoices', {
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            body: formData  
        
          }).then( (response) => this.setState({urlVal : response.url}) ) 
        .catch(function (error) { console.log("@@@@@"+error);})
    }

    render(){
        return <WebView
        source ={{uri: this.state.urlVal}}
        //        source ={{uri: 'https://btcpayjungle.com/api/v1/invoices?storeId=2qwRZJGfsxMjukdxbfecDABbyc3dUiW2gxFuFQ27yeQa&price=10&currency=USD'}}
        onError={(event) => alert(`Webview error ${event.nativeEvent.description}`)}
        />
        }
};
