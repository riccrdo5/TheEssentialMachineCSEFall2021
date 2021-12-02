import React from 'react';  
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-player';
import {View, TextInput, TouchableOpacity, AsyncStorage, Modal} from 'react-native';

export default class Surprise extends React.Component{

    render(){
        return<>
         <View style={{flex:1, backgroundColor:"#46B2E0"}}>
            {/* <Video 
                source={require('./surprise.mp4')}  
                ref={(ref) => {
                    this.player = ref
                }}
                controls={true}                     
                style={{position: 'absolute',top: 0,left: 0,bottom: 0,right: 0,}} /> */}
            <VideoPlayer
                style={{position: 'absolute',top: 220,bottom: 0,right:0,}}
                video={require('./surprise.mp4')}
                videoWidth={1000}
                videoHeight={1000}
                autoplay={true}
                loop={true}
            />
        </View>
        </>
    }
};
