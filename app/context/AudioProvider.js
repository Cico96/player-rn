import React from "react";
import { Component, createContext } from "react";
import * as MediaLibrary from 'expo-media-library';
import { Alert, View, Text } from "react-native";
import { Audio } from "expo-av";

export const AudioContext = createContext();
export class AudioProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audioFiles: [],
            playback: null,
            sound: null,
            currentAudio: {},
            isPlaying: false,
            currentAudioIndex: null,
            playbackPosition: null,
            playbackDuration: null
        };
        this.totalCount = 0;
    }

    permissionAlert = () => {
        Alert.alert('Permission required', 'this app required to read audio files', [{
            text: 'I am ready',
            onPress: () => this.getPermission()
        }, {
            text: 'cancle',
            onPress: () => this.permissionAlert()
        }])
    }

    getAudioFiles = async () => {
        let media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio'
        });
        media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
            first: media.totalCount,
        });
        this.totalCount = media.totalCount;
        console.log(this.totalCount)
        this.setState({...this.state, audioFiles: media.assets});
    }

    getPermission = async () => {
        const permission = await MediaLibrary.getPermissionsAsync();
        if(permission.granted) {
            //we want to get all the audiofiles
            this.getAudioFiles();
        }

        if(!permission.granted && permission.canAskAgain) {
            const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync();
            if(status === 'denied' && canAskAgain) {
                //we are going to display alert that user must allow this permission
                this.permissionAlert();
            }

            if(status === 'granted') {
                //we want all the audio files
                this.getAudioFiles();
            }
            
        }
    }

    componentDidMount() {
        this.getPermission()
        if(this.state.playback === null) {
            this.setState({...this.state, playback: new Audio.Sound()})
        }
    }

    updateState = (state, newState={}) => {
        this.setState({...state, ...newState})
    }

    render() {
        return <AudioContext.Provider value={{
            audioFiles: this.state.audioFiles, 
            playback: this.state.playback, 
            sound: this.state.sound,
            currentAudio: this.state.currentAudio,
            isPlaying: this.state.isPlaying,
            currentAudioIndex: this.state.currentAudioIndex,
            playbackPosition: this.state.playbackPosition,
            playbackDuration: this.state.playbackDuration,
            updateState: this.updateState}}
            >
            {this.props.children}
        </AudioContext.Provider>
    }





}