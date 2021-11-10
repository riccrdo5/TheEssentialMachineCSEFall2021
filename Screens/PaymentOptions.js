import React from 'react';  
import {Button, Text, Image,ImageBackground} from 'react-native-elements';  
import {View, TouchableOpacity} from 'react-native';
import UserAccount from './UserAccount.js'; 
import Login from './LoginPage.js';
import SignUp from './SignUp.js';
import ApplePaySuccess from './ApplePaySuccess.js';
import { StackNavigator } from "react-navigation";
import { ApplePayButton, PaymentRequest } from 'react-native-payments';
// import { ApplePay, APayRequestDataType, APayPaymentStatusType } from 'react-native-apay'
import BitcoinPay from './bitcoin-pay.js';

// const requestData : APayRequestDataType = {
//   merchantIdentifier: 'merchant.com.temapp',
//   supportedNetworks: ['mastercard', 'visa'],
//   countryCode: 'US',
//   currencyCode: 'USD',
//   paymentSummaryItems: [
//     {
//       label: 'Vending Machine',
//       amount: '0.01',
//     },
//   ],
// }

const supportedMethods = [
    { 
        supportedMethods: ['apple-pay'],
        data: 
            { 
                merchantIdentifier: 'merchant.com.temapp',
                supportedNetworks: ['visa', 'mastercard', 'amex'],
                environment: 'TEST',
                countryCode: 'US',
                currencyCode: 'USD',
                paymentMethodTokenizationParameters: {
                    parameters: {
                        gateway: 'stripe',
                        'stripe:publishableKey': 'pk_test_51JbOfHGLOm0NKpAUCOgcuyMP5h2hvv73RI67Gb81k8nU9ChLYuCBTT3xNdvhzzoRX5nQWpgVf92F5QjHAar7jeXt00k7rdLRuT'
                    },
                },
            } 
    }
];

const details = {
    id: 'test-payment',
    displayItems:[ 
        { 
            label: 'Payment',
             amount: { currency: 'USD', value: 1.00 }
        }],
    total: {
        label: 'Test',
        amount: { currency: 'USD', value: 1.00 } 
        } 
};

const paymentRequest = new PaymentRequest(supportedMethods,details);


// const METHOD_DATA = [
//     {
//         supportedMethods: ['apple-pay'],
//         data: {
//             merchantIdentifier: 'merchant.com.temapp',
//             supportedNetworks: ['visa', 'mastercard', 'amex'],
//             countryCode: 'US',
//             currencyCode: 'USD',
//             // uncomment this block to activate automatic Stripe tokenization.
//             // try putting your key pk_test... in here and see how the token format changes.
//             paymentMethodTokenizationParameters: {
//                 parameters: {
//                     gateway: 'stripe',
//                     'stripe:publishableKey': 'pk_live_51JbOfHGLOm0NKpAUilNTplOE8CMj5uQnwG9LIuqUvwITNj2JgPkMObDyq50eb6kKbdp2Q60YNs9uJwjMQxeZN6Pg00UZnFBD4L'
//                 },
//             },
//         },
//     },
// ];

// const DETAILS = {
//     id: 'basic-example',
//     displayItems: [
//         {
//             label: 'Movie Ticket',
//             amount: { currency: 'USD', value: '0.01' },
//         },
//     ],
//     total: {
//         label: 'Vending Machine',
//         amount: { currency: 'USD', value: '0.01' },
//     },
// };


export default class PaymentOptions extends React.Component{

    doPayment =(token)= async () => {
        console.log("Entered Do Payment")
        console.log("Token Receiverd"+token)
        // fetch('https://us-central1-the-essential-machine.cloudfunctions.net/applePay', {
        //     method: 'POST',
        //     headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //     amount: 100,
        //     currency: "usd",
        //     token: token
        //     }),
        // }).then((response) => response.json())
        //     .then((responseJson) => {
        //     console.log("Final Response" + responseJson);
        //     })
        //     .catch((error) => {
        //     console.error(error);
        //     });;
    }

    pay = async() => {
        console.log("Entered Pay")
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
                        this.doPayment(token)
                    })
                    .catch(e => {
                        alert(e.message);
                        paymentRequest.abort();
                    });
            }
        });
    }

    // pay = async() => {
	// 	console.log('Entered')
	// 	const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS);
    //     console.log(paymentRequest)
    //     console.log(paymentRequest.show())
	// 	paymentRequest.show().then(paymentResponse => {
	// 		const card_token = paymentResponse.details.paymentToken;
	// 		console.log("Token"+card_token);

	// 		// axios({
	// 		// 	method: 'POST',
	// 		// 	url: 'https://us-central1-the-essential-machine.cloudfunctions.net/applePay',
	// 		// 	data : {
	// 		// 		amount: 0.01,
	// 		// 		currency: 'usd',
	// 		// 		token: card_token
	// 		// 	}
	// 		// }).then(response => {
	// 		// 	console.log("Response"+ response)
	// 		// })

    //         // return fetch('https://us-central1-the-essential-machine.cloudfunctions.net/applePay', {
    //         //     method: 'POST',
    //         //     body: {
    //         //         amount: 0.01,
    //         //         currency: 'usd',
    //         //         token: card_token,
    //         //     }
    //         // }).then(res => {
    //         //         console.log("Response" + res.json())
    //         //     })
    //         //     .then(successHandler)
    //         //     .catch(errorHandler)

	// 	}).catch(error => {
    //         paymentRequest.abort()
	// 		console.log(error)
    //         const card_token = paymentResponse.details.paymentToken;
    //         console.log("Token"+card_token);
	// 		if(error.message === 'AbortError') {
	// 			console.log("Error")
	// 			this.debug('Payment request was dismissed');
	// 		}
    //         paymentRequest.abort()
	// 	});
	// };

    render(){
        const amount = this.props.navigation.getParam('text');
        // alert(amount)
        return<>
            <View style={{flex:1, backgroundColor:"#46B2E0"}}>
          
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70, left:10}}/>
            </TouchableOpacity>

            <Text style ={{fontSize:30,fontWeight:'bold',marginTop:25, textAlign:'center'}}>Amount to be paid:</Text>

            <View style={{marginTop:30, left:80,  height:200, width:200, borderRadius:300, backgroundColor:'white', justifyContent:'center'}}>
                <Text style={{fontSize:50, textAlign: 'center'}}>{amount}</Text>
            </View>

            <Text style={{paddingLeft:50, fontSize:25, fontWeight:'500', marginTop:50}}> Pay with: </Text>

            <View style={{flexDirection:"row",justifyContent:'space-between', paddingLeft:80, paddingRight:80, marginTop:30}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('BitcoinPay', {text:amount})}>
                <Image source={require('./bitcoin-icon.png')} style={{height:70, width:70}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => alert('PayPal!!')} >
                <Image source={require('./paypal-icon.jpeg')} style={{height:70, width:80,borderRadius:300}}/>
            </TouchableOpacity>
            </View>

            <View style={{flexDirection:"row",justifyContent:'space-between', paddingLeft:80, paddingRight:80, marginTop:40}}>
            {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('ApplePayPayment', {text:amount})}>
                <Image source={require('./applepay-icon.jpeg')} style={{height:50, width:80,borderRadius:5}}/>
            </TouchableOpacity> */}
            <ApplePayButton type="plain" width={80} height={50} borderRadius={5} style="white" onPress={this.pay}/>

            <TouchableOpacity onPress={() => alert('GooglePay!!')} >
                <Image source={require('./googlepay-icon.png')} style={{height:50, width:80, borderRadius:5}}/>
            </TouchableOpacity>
            </View>

          
            </View> 


          </>
    }
};

