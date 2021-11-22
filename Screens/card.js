import React from 'react';
import { StyleSheet,Text, Image, View} from 'react-native';
import {TouchableOpacity, ScrollView} from 'react-native';
import Unorderedlist from 'react-native-unordered-list';




export default class CardPage extends React.Component {

render (){
    const x = this.props.navigation.getParam('option')
     if(x == 1)
    {
    return<>
     <View style={{flex:1, backgroundColor:"#46B2E0"}}>
    <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
    <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70, left:10}}/>
    </TouchableOpacity>
   <ScrollView>
   <Unorderedlist bulletUnicode={0x2765} marginTop = '100' alignItems = 'center'>
    <Text style={{top: 20, margin: 20, fontSize:20, textAlign: 'justify', textAlignVertical: 'top'}}>Essential Machine is an attempt at solving the problem of reducing contact in School places by manufacturing vending machines (referred to as Essential Machine) that dispense various commercial products in a more convenient manner compared to physical stores. </Text>
    </Unorderedlist>
    <Unorderedlist bulletUnicode={0x2765}>
    <Text style={{top: 20, margin: 20, fontSize:20, textAlign: 'justify', textAlignVertical: 'top'}}>The Essential Machine is more advanced & safer than the typical vending machine allowing mobile payments and a smooth and faster checkout experience without the need of physical form of currencies.Our machine seeks to minimize this issue and help the regular population to perform a transaction easily.</Text>
    </Unorderedlist>
    </ScrollView>
    </View>
    
    </>
    }

    else if(x == 2)
    {
    return<>
     <View style={{flex:1, backgroundColor:"#46B2E0"}}>
    <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
    <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70, left:10}}/>
    </TouchableOpacity>
    <ScrollView>
    <Text style={{top: 20, margin: 20, fontSize:20, textAlign: 'justify', textAlignVertical: 'top'}}>Create an Account {"\n"}
    1.)	Select the Sign Up button and tap on that.{"\n"}
    2.)	Enter your first name, last name, school, city, state, zip code and email address on the signup screen{"\n"}
    3.)	Create a password and confirm it and select create account.{"\n"}
    4.)	Select Create Account
    </Text>
    {/* <Text style={{top: 20, margin: 20, fontSize:20, textAlign: 'justify', textAlignVertical: 'top'}}>The Essential Machine is more advanced & safer than the typical vending machine allowing mobile payments and a smooth and faster checkout experience without the need of physical form of currencies.Our machine seeks to minimize this issue and help the regular population to perform a transaction easily.</Text> */}
    </ScrollView>
    </View>
    
    </>
    }

    else if(x == 3)
    {
    return<>
     <View style={{flex:1, backgroundColor:"#46B2E0"}}>
    <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
    <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70, left:10}}/>
    </TouchableOpacity>
    <ScrollView>
    <Unorderedlist bulletUnicode={0x2765}>
    <Text style={{top: 20, margin: 20, fontSize:20, textAlign: 'justify', textAlignVertical: 'top'}}>What to do if i already have an account? {"\n"} Login into existing Account {"\n"}
    1.)	Enter the email address and password to login
    </Text>
    </Unorderedlist>
    <Unorderedlist>
    <Text style={{top: 20, margin: 20, fontSize:20, textAlign: 'justify', textAlignVertical: 'top'}}>What if i forgot the password? {"\n"}

    1.) Click on forgot password in the login page, it redirects you to a new page where you can give the email address, where you can reset the password. {"\n"}
    2.)	The password reset information will be sent to the email mentioned. {"\n"}
    </Text>
    </Unorderedlist>
    </ScrollView>
    </View>
    
    </>
    }

    else if(x == 4)
    {
    return<>
     <View style={{flex:1, backgroundColor:"#46B2E0"}}>
    <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
    <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70, left:10}}/>
    </TouchableOpacity>
    <ScrollView>
    <Unorderedlist bulletUnicode={0x2765}>
    <Text style={{top: 20, margin: 20, fontSize:20, textAlign: 'justify', textAlignVertical: 'top'}}>How do i update my personal information? {"\n"}
    To update your name, email, phone number, or password for your account:{"\n"}
    1. Open the app menu and tap "Settings"{"\n"}
    2. Tap the bar that displays your name, phone number, and email{"\n"}
    3. Tap the detail you want to change and enter the updated information{"\n"}
    4. Make your updates and click "Save".
    </Text>
    </Unorderedlist>
    <Unorderedlist>
    {/* <Text style={{top: 20, margin: 20, fontSize:20, textAlign: 'justify', textAlignVertical: 'top'}}>The Essential Machine is more advanced & safer than the typical vending machine allowing mobile payments and a smooth and faster checkout experience without the need of physical form of currencies.Our machine seeks to minimize this issue and help the regular population to perform a transaction easily.</Text> */}
    </Unorderedlist>
    </ScrollView>
    </View>
    
    </>
    }

    else if(x == 5)
    {
    return<>
     <View style={{flex:1, backgroundColor:"#46B2E0"}}>
    <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
    <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70, left:10}}/>
    </TouchableOpacity>
   <ScrollView>
   <Unorderedlist bulletUnicode={0x2765}>
    <Text style={{top: 20, margin: 20, fontSize:20, textAlign: 'justify', textAlignVertical: 'top'}}>What are the payment options available?{"\n"}
    PAYMENT OPTIONS {"\n"}
●	Adding and selecting a preferred payment method will allow you to buy a product from the vending machine. {"\n"}
●	You can make a payment using PayPal, Apple Pay, Google Pay and Bitcoin.
</Text>
    </Unorderedlist>
    <Unorderedlist>
    {/* <Text style={{top: 20, margin: 20, fontSize:20, textAlign: 'justify', textAlignVertical: 'top'}}>The Essential Machine is more advanced & safer than the typical vending machine allowing mobile payments and a smooth and faster checkout experience without the need of physical form of currencies.Our machine seeks to minimize this issue and help the regular population to perform a transaction easily.</Text> */}
    </Unorderedlist>
    </ScrollView>
    </View>
    
    </>
    }


    else if(x == 6)
    {
    return<>
     <View style={{flex:1, backgroundColor:"#46B2E0"}}>
    <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
    <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70, left:10}}/>
    </TouchableOpacity>
   <ScrollView>
   <Unorderedlist bulletUnicode={0x2765}>
    <Text style={{top: 20, margin: 20, fontSize:20, textAlign: 'justify', textAlignVertical: 'top'}}>Where should we navigate to check the availability of vending machines on ub campus?{"\n"}
    The map symbol will navigate to maps which shows the availability of vending machines.
    </Text>
    </Unorderedlist>
    <Unorderedlist>
    {/* <Text style={{top: 20, margin: 20, fontSize:20, textAlign: 'justify', textAlignVertical: 'top'}}>The Essential Machine is more advanced & safer than the typical vending machine allowing mobile payments and a smooth and faster checkout experience without the need of physical form of currencies.Our machine seeks to minimize this issue and help the regular population to perform a transaction easily.</Text> */}
    </Unorderedlist>
    </ScrollView>
    </View>
    
    </>
    }


    else if(x == 7)
    {
    return<>
     <View style={{flex:1, backgroundColor:"#46B2E0"}}>
    <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
    <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70, left:10}}/>
    </TouchableOpacity>
   <ScrollView>
   <Unorderedlist bulletUnicode={0x2765}>
    <Text style={{top: 20, margin: 20, fontSize:20, textAlign: 'justify', textAlignVertical: 'top'}}>How the app works?{"\n"}
    1. Pick the product u want to buy on the machine{"\n"}
    2. Scan theQR Code (scanning the machine) generated on the app.{"\n"}
    3. Choose the mode of payment.{"\n"}
    4. Pay for the product.

    </Text>
    </Unorderedlist>
    <Unorderedlist>
    {/* <Text style={{top: 20, margin: 20, fontSize:20, textAlign: 'justify', textAlignVertical: 'top'}}>The Essential Machine is more advanced & safer than the typical vending machine allowing mobile payments and a smooth and faster checkout experience without the need of physical form of currencies.Our machine seeks to minimize this issue and help the regular population to perform a transaction easily.</Text> */}
    </Unorderedlist>
    </ScrollView>
    </View>
    
    </>
    }


    else if(x == 8)
    {
    return<>
     <View style={{flex:1, backgroundColor:"#46B2E0"}}>
    <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
    <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70, left:10}}/>
    </TouchableOpacity>
   <ScrollView>
   <Unorderedlist bulletUnicode={0x2765}>
    <Text style={{top: 20, margin: 20, fontSize:20, textAlign: 'justify', textAlignVertical: 'top'}}>Whom do i contact if i have any problem like payment fails or you were not able to take the product from the vending machine?{"\n"}
    rccrabbe@buffalo.edu
    </Text>
    </Unorderedlist>
    <Unorderedlist>
    {/* <Text style={{top: 20, margin: 20, fontSize:20, textAlign: 'justify', textAlignVertical: 'top'}}>The Essential Machine is more advanced & safer than the typical vending machine allowing mobile payments and a smooth and faster checkout experience without the need of physical form of currencies.Our machine seeks to minimize this issue and help the regular population to perform a transaction easily.</Text> */}
    </Unorderedlist>
    </ScrollView>
    </View>
    
    </>
    }

}

}