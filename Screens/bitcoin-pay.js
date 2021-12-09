import React from 'react';  
import {Button, Text, Image,ImageBackground} from 'react-native-elements';  
import {View, TextInput, TouchableOpacity} from 'react-native';
import UserAccount from './UserAccount.js'; 
import PaymentOptions from './PaymentOptions.js';
import HomeScreen from './Homepage.js'; 
import { StackNavigator } from "react-navigation"; 
import{WebView} from 'react-native-webview';
// import WKWebView from 'react-native-wkwebview-reborn';
import BitcoinPaySuccess from './bitcoin-pay-success.js';
import BitcoinPayExpired from './bitcoin-pay-expired';
import {firebaseApp} from '../config/firebase';
const firestoreDb = firebaseApp.firestore();
firestoreDb.settings({ experimentalForceLongPolling: true });

/**
 * Change the StoreID and the bearer token of the invoice generation from the BTCPAYJUNGLE configuration 
 * as specified in the documentation
 */

export default class BitcoinPay extends React.Component{
    constructor(props) {
        super(props);
        this.state = { urlVal: "", isStatusLogged: false, amount:"", promoid:"", discount:"", email:"", vmNumber:""};
    }
    componentDidMount() {
        this.intervalID = setInterval(()=> this.fetchInvoiceStatus(), 1000)
        const amount = this.props.navigation.getParam('text').replace('$','');
        const machineId = this.props.navigation.getParam('id'); // machineNumber
        const user = this.props.navigation.getParam('UserEmail'); // useremail

        this.setState({amount : amount, email:user, vmNumber:machineId})
        let formData = new FormData();
        // Change the storeID according to your store number
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
    
    // log in receipts collection in firestore
    addReceipt = async(invoiceId) => {
      firestoreDb.collection('receipts').add({
        amount: this.state.amount,
        email: this.state.email,
        paymentMethod: "Bitcoin Pay",
        vendingMachineNumber: this.state.vmNumber,
        timestamp: Date.now(),
        transaction_id: invoiceId,
        transaction_status: 'paid'
      }).then((res) => {
        console.log("logged in receipts")
      })
      .catch((err) => {
        console.error("Error in completion: ", err);
      });
    }
    
     async fetchInvoiceStatus(){
         if( this.state.isStatusLogged == false){
        if(this.state.urlVal != ""){
            var invoiceId =  this.state.urlVal.split('=');
            // change the token value here from BTCPAYJUngle
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
                                console.log("in complete")

                                // log the status in RTDB regarding success
                                var ref = firebaseApp.database().ref("machines/").child(this.state.vmNumber)
                                ref.update({ comm : "transaction approved" });
                                ref.update({last_updated: Date.now()})
                                this.addReceipt(invoiceId[1])
                                //login transaction status only once
                                this.setState({isStatusLogged : true})

                                // log status in transaction-verify in firestore according to api
                                firestoreDb.collection('transaction-verify').add({
                                  transaction_amount: this.state.amount,
                                  vm_id: this.state.vmNumber,
                                  transaction_id: invoiceId[1],
                                  payment_gateway: 'BTCPAY',
                                  transaction_status: 'paid'
                                }).then((res) => {
                                  console.log("logged in transaction-verify")
                                })
                                .catch((err) => {
                                  console.error("Error in completion: ", err);
                                });

                                // after updating everything navigate to success page
                                this.props.navigation.navigate('BitcoinPaySuccess')

                            } else if (status === "expired"){
                                console.log("in expired")
                                //update RTDB
                                var ref = firebaseApp.database().ref("machines/").child(this.state.vmNumber)
                                ref.update({ comm : "transaction denied" });
                                ref.update({last_updated: Date.now()})
                                this.setState({isStatusLogged : true})
                                
                                firestoreDb.collection('transaction-cancel').add({
                                  transaction_amount: this.state.amount,
                                  vm_id: this.state.vmNumber,
                                  transaction_id: invoiceId[1],
                                  payment_gateway: 'BTCPAY',
                                  transaction_status: 'expired'
                                }).then((res) => {
                                  console.log("logged in transaction-cancel")
                                })
                                .catch((err) => {
                                  console.error("Error in expired invoice: ", err);
                                });

                                // after updating everything navigate to expired page
                                this.props.navigation.navigate('BitcoinPayExpired')
                            }
                         } 
                        })})
              .catch((error) => {console.error(error);
                var ref = firebaseApp.database().ref("machines/").child(this.state.vmNumber)
                ref.update({ comm : "transaction denied" });
                ref.update({last_updated: Date.now()})
                console.log(error);
              });
            }
        }
    }


    render(){
        return <WebView
        useWebKit={true}
        source ={{uri: this.state.urlVal}}
        // TEST: source ={{uri: 'https://btcpayjungle.com/api/v1/invoices?storeId=2qwRZJGfsxMjukdxbfecDABbyc3dUiW2gxFuFQ27yeQa&price=10&currency=USD'}}
        onError={(event) => {alert(`Webview error ${event.nativeEvent.description}`)
        var ref = firebaseApp.database().ref("machines/").child(this.state.vmNumber)
        ref.update({ comm : "transaction denied" });
        ref.update({last_updated: Date.now()})
        console.log(error);
      }}
        />
        }
};
