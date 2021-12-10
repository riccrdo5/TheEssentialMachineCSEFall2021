import React from 'react';  
import {Button, Text, Image,ImageBackground} from 'react-native-elements';  
import {View, TextInput, TouchableOpacity, AsyncStorage, Modal} from 'react-native';
import UserAccount from './UserAccount.js'; 
import Login from './LoginPage.js';
import SignUp from './SignUp.js';
import ApplePaySuccess from './ApplePaySuccess.js';
import { StackNavigator } from "react-navigation";
import { ApplePayButton, PaymentRequest } from 'react-native-payments';
import BitcoinPay from './bitcoin-pay.js';
import {firebaseApp} from '../config/firebase';
import { GooglePay, RequestDataType} from 'react-native-google-pay';
import * as firebase from 'firebase';
const firestoreDb = firebaseApp.firestore();
firestoreDb.settings({ experimentalForceLongPolling: true }, {merge:true});
import {WebView} from 'react-native-webview';
import BitcoinTestPay from './bitcoin-test-pay.js';

// import WKWebView from 'react-native-wkwebview-reborn';

const allowedCardNetworks = ['VISA', 'MASTERCARD', 'DISCOVER', 'AMEX'];
const allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];

if(Platform.OS === 'android'){
  GooglePay.setEnvironment(GooglePay.ENVIRONMENT_PRODUCTION);
}

export default class PaymentOptions extends React.Component{
     constructor(){
        super();
    }

    componentDidMount(){
        const amt = this.props.navigation.getParam('text');
        this.setState({amount: amt})
    }

    state = {
        coupon :'', 
        amount: '',
        couponApplied: false
    }
  
    addVendingMachineForNotificationUse = async(vendingMachineId) => {
        console.log("Updating values for Notifications Functionality")
        var dbRef = firestoreDb.collection("notifications").where("email","==", useremail)
        await dbRef
        .get()
        .then(async(querySnapshot) => {
            const data = querySnapshot.docs.map(doc => doc.data());
            const key = querySnapshot.docs.map(doc => doc.id);
            const docId = Object.values(key)[0]
            if(Object.keys(data).length){
                console.log("Document Already Exists");
                await firestoreDb.collection("notifications").doc(docId).update({
                    used_vending_machines: firebase.firestore.FieldValue.arrayUnion(vendingMachineId)
                });
            }
        });
        console.log("Updation Complete")
    }

    state = {
        showModal: false,
    };

    handleResponse = (data) => {
        if (data.title === "success") {
            this.setState({ showModal: false, status: "Complete" });
            this.props.navigation.navigate('ApplePaySuccess')
            // this.props.navigation.navigate('Surprise')
        } else if (data.title === "cancel") {
            this.setState({ showModal: false, status: "Cancelled" });
        } else {
            return;
        }
    };

    addReceipt = async(amt) => {
        const vendingMachineId = this.props.navigation.getParam('vm_id');
        let user = await AsyncStorage.getItem('UserEmail');  
        firestoreDb.collection('receipts')
        .add({
            amount: amt,
            email: user,
            paymentMethod: "Apple Pay",
            vendingMachineNumber: vendingMachineId,
            timestamp: Date.now()
          }).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            this.addVendingMachineForNotificationUse(vendingMachineId)
            this.props.navigation.navigate('ApplePaySuccess')
            // this.props.navigation.navigate('Surprise')
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

    pay = () => {
        amt = this.state.amount
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

    googlePay =() =>{
      amt = this.state.amount
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

    // payPalPayment = (amt) => {
    //     console.log('Entered Pay Pal Payment' + amt);
    //     x = parseFloat(amt).toFixed(2)
    //     fetch('https://us-central1-the-essential-machine.cloudfunctions.net/paypal', {
    //         method: 'POST',
    //         headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //         amount: x,
    //         }),
    //     }).then((response) => response.json())
    // }

    handleDiscount = (text) => {
        this.setState({ coupon: text })
        this.setState({ couponApplied: false })
    }

    handleCoupon = async() =>{
        if(!this.state.couponApplied){
            console.log("Entered Handle Coupon")
            coupon = this.state.coupon
            console.log("Coupon", coupon)
            if(coupon==undefined){
                alert('Discount Code cannot be empty')
            }else{
                await firestoreDb.collection('promotions')
                .where("coupon","==", coupon)
                .get()
                .then(snapshot =>{
                    console.log("Yayy!")
                    const data = snapshot.docs.map(doc => doc.data());  
                    if(data[0]){
                        discount = data[0].discount
                        originalamt = this.state.amount
                        finalamt = (originalamt - (originalamt * discount)/100).toFixed(2);
                        this.setState({ amount: finalamt })
                        this.setState({ couponApplied: true })
                        window.location.reload();
                    }else{
                        alert('Invalid Coupon')
                    }
                    
                }).catch(error =>console.log(error));
            }
        }
    }

    render(){
        let user =  AsyncStorage.getItem('UserEmail');  
        const machineId = this.props.navigation.getParam('id');

        return<>
            <View style={{flex:1, backgroundColor:"#46B2E0"}}>
          
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70, left:10}}/>
            </TouchableOpacity>

            <Text style ={{fontSize:30,fontWeight:'bold',marginTop:25, textAlign:'center'}}>Amount to be paid:</Text>

            <View style={{marginTop:30, left:95,  height:200, width:200, borderRadius:300, backgroundColor:'white', justifyContent:'center'}}>
                <Text style={{fontSize:50, textAlign: 'center'}}>${this.state.amount}</Text>
            </View>
            <View style={{flexDirection:"row",justifyContent:'space-between', paddingLeft:30, paddingRight:80, marginTop:40}}>
            <Text style={{fontSize:25, textAlign: 'left', fontWeight:'500'}}>Discount code: </Text>
            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:3, width:150, left:10, borderRadius:5 }}> 
            <TextInput onChangeText = {this.handleDiscount} style={{fontSize:15, left:10, color:'grey', width:150}} placeholder= "Enter Code" />
            </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={()=>this.handleCoupon()} style={{backgroundColor:"white", padding:8, borderRadius:10,  alignItems:"center",width:100, height:35, left:150, marginTop:25}} >
            <Text style={{fontSize:15, fontWeight:"bold", color:"black"}}> Apply </Text>
            </TouchableOpacity>
            
            <Text style={{paddingLeft:25, fontSize:25, fontWeight:'500', marginTop:20}}> Pay with: </Text>
            
                 { /*
            <View style={{flexDirection:"row",justifyContent:'space-between', paddingLeft:80, paddingRight:80, marginTop:10}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('BitcoinPay', {text:this.state.amount, id:machineId , UserEmail:user})}>
                <Image source={require('./bitcoin-icon.png')} style={{height:70, width:70}}/>
            </TouchableOpacity>
            */ }

            <View style={{flexDirection:"row",justifyContent:'space-between', paddingLeft:80, paddingRight:80, marginTop:10}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('BitcoinTestPay', {text:this.state.amount, id:machineId , UserEmail:user})}>
                <Image source={require('./bitcoin-icon.png')} style={{height:70, width:70}}/>
            </TouchableOpacity>


            <Modal
                    visible={this.state.showModal}
                    onRequestClose={() => this.setState({ showModal: false })}
                >
                    <WebView
                        useWebKit={true}
                        source={{ uri: "https://17d2-160-72-138-210.ngrok.io" }}
                        onNavigationStateChange={data =>
                            this.handleResponse(data)
                        }
                        injectedJavaScript={`document.f1.submit()`}
                    />
            </Modal>

            <TouchableOpacity onPress={() => this.setState({ showModal: true }) } >
                <Image source={require('./paypal-icon.jpeg')} style={{height:70, width:80,borderRadius:300}}/>
            </TouchableOpacity>
            </View>

            <View style={{flexDirection:"row",justifyContent:'space-between', paddingLeft:80, paddingRight:80, marginTop:30}}>
            {
              Platform.OS === 'ios'?
                  <ApplePayButton type="plain" width={80} height={50} borderRadius={5} style="white" onPress={() => this.pay()}/>
              : <Image 
                onPress={()=>this.googlePay()} source={require('./googlepay-icon.png')} style={{height:50, width:80, borderRadius:5}}/>
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
                supportedNetworks: ['visa', 'mastercard', 'amex', 'discover'],
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
