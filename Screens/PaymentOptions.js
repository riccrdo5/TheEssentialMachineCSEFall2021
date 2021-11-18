import React from 'react';  
import {Button, Text, Image,ImageBackground} from 'react-native-elements';  
import {View, TouchableOpacity, AsyncStorage} from 'react-native';
import UserAccount from './UserAccount.js'; 
import Login from './LoginPage.js';
import SignUp from './SignUp.js';
import ApplePaySuccess from './ApplePaySuccess.js';
import { StackNavigator } from "react-navigation";
import { ApplePayButton, PaymentRequest } from 'react-native-payments';
import BitcoinPay from './bitcoin-pay.js';
import {firebaseApp} from '../config/firebase';
import { GooglePay, RequestDataType} from 'react-native-google-pay';

const allowedCardNetworks = ['VISA', 'MASTERCARD'];
const allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];

if(Platform.OS === 'android'){
  GooglePay.setEnvironment(GooglePay.ENVIRONMENT_PRODUCTION);
}

export default class PaymentOptions extends React.Component{

    addReceipt = async(amt) => {
        const vendingMachineId = this.props.navigation.getParam('vm_id');
        let user = await AsyncStorage.getItem('UserEmail');  
        firebaseApp.firestore().collection('receipts')
        .add({
            amount: amt,
            email: user,
            paymentMethod: "Apple Pay",
            vendingMachineNumber: vendingMachineId,
            timestamp: Date.now()
          }).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            this.props.navigation.navigate('ApplePaySuccess')
          })
          .catch((err) => {
            console.error("Error found: ", err);
          });
    }


    doPayment = async (token,amt) => {
        const machineId = this.props.navigation.getParam('id');
        console.log("Yayy " + machineId)
        console.log("Entered Do Payment")
        console.log("Token Received "+ token)
        var number = parseFloat(amt, 10)
        console.log("Number" + number + typeof(number))
        fetch('https://us-central1-the-essential-machine.cloudfunctions.net/applePay', {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            amount: number*100,
            currency: "usd",
            token: token
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
            console.log("Final Response" + JSON.stringify(responseJson));
            if(responseJson.status == "succeeded"){
                var ref = firebaseApp.database().ref("machines/").child(machineId)
                ref.update({ comm : "transaction approved" });
                ref.update({last_updated: Date.now()})
                this.addReceipt(number)
            }else{
                var ref = firebaseApp.database().ref("machines/").child(machineId)
                ref.update({ comm : "transaction denied" });
                ref.update({last_updated: Date.now()})
            }}).catch((error) => {
            var ref = firebaseApp.database().ref("machines/").child(machineId)
            ref.update({ comm : "transaction denied" });
            ref.update({last_updated: Date.now()})
            console.log(error);
        });
    }

    pay = (amt) => {
        console.log("Entered Pay "+amt)

        const details = {
            id: 'payment',
            total: {
                label: 'Vending Machine',
                amount: { currency: 'USD', value: amt } 
                } 
        };
        
        const paymentRequest = new PaymentRequest(supportedMethods,details);
        paymentRequest.canMakePayments()
        .then(canMakePayments => {
            if (canMakePayments) {
                console.log('Can Make Payments!')
                return paymentRequest
                    .show()
                    .then(paymentResponse => {
                        paymentResponse.complete('success');
                        const token = paymentResponse.details.paymentToken
                        console.log("Token" + token );
                        this.doPayment(token, amt)
                    })
                    .catch(e => {
                        alert(e.message);
                        paymentRequest.abort();
                    });
            }
        });
    }

    googlePay =(amt) =>{

      const requestData: RequestDataType = {
          cardPaymentMethod: {
            tokenizationSpecification: {
              type: 'PAYMENT_GATEWAY',
              gateway: 'stripe',
              stripe: {
                publishableKey: 'pk_test_51JbOfHGLOm0NKpAUCOgcuyMP5h2hvv73RI67Gb81k8nU9ChLYuCBTT3xNdvhzzoRX5nQWpgVf92F5QjHAar7jeXt00k7rdLRuT',
                version: '2018-11-08',
              },
              merchantId : 'BCR2DN4TXDD4TLIT' 
            },
            allowedCardNetworks,
            allowedCardAuthMethods,
          },
          transaction: {
            totalPrice: amt,
            totalPriceStatus : 'FINAL',
            currencyCode: 'USD',
          },
          merchantName: 'merchant.com.temapp',
      };

      console.log('Entered Google Pay' + amt);
      GooglePay.isReadyToPay(allowedCardNetworks, allowedCardAuthMethods)
        .then(ready => {
          console.log('Google Pay' + ready);
          if (ready) {
            GooglePay.requestPayment(requestData)
              .then((token) => {
                token = JSON.parse(token)
                console.log("token received"+token.id)
                this.doPayment(token.id, amt)
              }).catch(error => console.log(error.code, error.message));
          } else {
            alert("Google Pay Not Ready!")
          }
          }).catch(error => console.log(error.code, error.message))
    }

    render(){
        const amt = this.props.navigation.getParam('text');
        let user =  AsyncStorage.getItem('UserEmail');  
        return<>
            <View style={{flex:1, backgroundColor:"#46B2E0"}}>
          
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70, left:10}}/>
            </TouchableOpacity>

            <Text style ={{fontSize:30,fontWeight:'bold',marginTop:25, textAlign:'center'}}>Amount to be paid:</Text>

            <View style={{marginTop:30, left:80,  height:200, width:200, borderRadius:300, backgroundColor:'white', justifyContent:'center'}}>
                <Text style={{fontSize:50, textAlign: 'center'}}>{amt}</Text>
            </View>

            <Text style={{paddingLeft:50, fontSize:25, fontWeight:'500', marginTop:50}}> Pay with: </Text>

            <View style={{flexDirection:"row",justifyContent:'space-between', paddingLeft:80, paddingRight:80, marginTop:30}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('BitcoinPay', {text:amt, vm_id:vm_id, id:id , UserEmail:UserEmail})}>
                <Image source={require('./bitcoin-icon.png')} style={{height:70, width:70}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => alert('PayPal!!')} >
                <Image source={require('./paypal-icon.jpeg')} style={{height:70, width:80,borderRadius:300}}/>
            </TouchableOpacity>
            </View>

            <View style={{flexDirection:"row",justifyContent:'space-between', paddingLeft:80, paddingRight:80, marginTop:40}}>
            {
              Platform.OS === 'ios'?
                  <ApplePayButton type="plain" width={80} height={50} borderRadius={5} style="white" onPress={() => this.pay(amt)}/>
              : <Image 
                onPress={()=>this.googlePay(amt)} source={require('./googlepay-icon.png')} style={{height:50, width:80, borderRadius:5}}/>
            }
            </View>
            </View> 
          </>
    }
};

const supportedMethods = [
    { 
        supportedMethods: ['apple-pay'],
        data: 
            { 
                merchantIdentifier: 'merchant.com.temapp',
                supportedNetworks: ['visa', 'mastercard', 'amex'],
                countryCode: 'US',
                currencyCode: 'USD',
                paymentMethodTokenizationParameters: {
                    parameters: {
                        gateway: 'stripe',
                        'stripe:publishableKey': 'pk_live_51JbOfHGLOm0NKpAUilNTplOE8CMj5uQnwG9LIuqUvwITNj2JgPkMObDyq50eb6kKbdp2Q60YNs9uJwjMQxeZN6Pg00UZnFBD4L'
                    },
                },
            } 
    }
];