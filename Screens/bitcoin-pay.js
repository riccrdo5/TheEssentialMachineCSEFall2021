import React from 'react';  
import {Button, Text, Image,ImageBackground} from 'react-native-elements';  
import {View, TextInput, TouchableOpacity} from 'react-native';
import UserAccount from './UserAccount.js'; 
import PaymentOptions from './PaymentOptions.js';
import HomeScreen from './Homepage.js'; 
import { StackNavigator } from "react-navigation"; 
import{WebView} from 'react-native-webview';
import BitcoinPaySuccess from './bitcoin-pay-success.js';
import BitcoinPayExpired from './bitcoin-pay-expired';
import {firebaseApp} from '../config/firebase';


export default class BitcoinPay extends React.Component{
    constructor(props) {
        super(props);
        this.state = { urlVal: "", isStatusLogged: false, amount:"", vmid:"", promoid:"", discount:""};
    }
    componentDidMount() {
        this.intervalID = setInterval(()=> this.fetchInvoiceStatus(), 1000)
        const amount = this.props.navigation.getParam('text').replace('$','');
        const vmid = this.props.navigation.getParam('vmid');
        this.setState({amount : amount, vmid:vmid})
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
        
          }).then( (response) => {this.setState({urlVal : response.url});
          this.fetchInvoiceStatus();
        } )
        .catch(function (error) { console.log("error: "+error);})
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
      }

     async fetchInvoiceStatus(){
         if( this.state.isStatusLogged == false){
        if(this.state.urlVal != ""){
            var invoiceId =  this.state.urlVal.split('=');
            var bearer = 'Basic QkNkRTBCeXI3N1FEa3J2MW5rVk8xeWh5eWw3UklkN0NVTGtZaExPdlJ2dg==';
            fetch('https://btcpayjungle.com/invoices', {method: "GET" , 
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json',
                'Accept-Encoding' : 'gzip, deflate, br'
            }
        }) .then(response => response.json())
            .then(json => {
                json.data.map(({url, status}) =>  {
                         var match_invoiceId = JSON.stringify(url).split('=');
                         if( match_invoiceId[1].toString().replace(/"/g,"").trim() === invoiceId[1].toString().trim()) {
                            if(status === "paid"){
                                //login transaction status only once
                                // show success compponent
                                firebaseApp.firestore().collection('transaction-verify').doc('BTCPAY').set({
                                    transaction_amount: this.state.amount,
                                   //TODO: vm_id: this.state.vmid,
                                    transaction_id: invoiceId[1],
                                    payment_gateway: 'BTCPAY',
                                    transaction_status: 'paid'
                                  }).then((res) => {
                                    this.setState({isStatusLogged : true})
                                    this.props.navigation.navigate('BitcoinPaySuccess')
                                    console.log("in complete")
                                  })
                                  .catch((err) => {
                                    console.error("Error in completion: ", err);
                                  });
                            } else if (status === "expired"){
                                console.log("in expired")
                                firebaseApp.firestore().collection('transaction-verify').doc('BTCPAY').set({
                                    transaction_amount: this.state.amount,
                                    //TODO: vm_id: this.state.vmid,
                                    transaction_id: invoiceId[1],
                                    payment_gateway: 'BTCPAY',
                                    transaction_status: 'expired'
                                  }).then((res) => {
                                    this.setState({isStatusLogged : true})
                                    this.props.navigation.navigate('BitcoinPayExpired')
                                    console.log("in expired")
                                  })
                                  .catch((err) => {
                                    console.error("Error in expired invoice: ", err);
                                  });
                            }
                         } 
                        })})
              .catch((error) => {console.error(error);});
            }
        }
    }


    render(){
        return <WebView
        source ={{uri: this.state.urlVal}}
        // TEST: source ={{uri: 'https://btcpayjungle.com/api/v1/invoices?storeId=2qwRZJGfsxMjukdxbfecDABbyc3dUiW2gxFuFQ27yeQa&price=10&currency=USD'}}
        onError={(event) => alert(`Webview error ${event.nativeEvent.description}`)}
        />
        }
};
