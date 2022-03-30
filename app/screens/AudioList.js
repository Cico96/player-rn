import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AudioListItem from '../components/AudioListItem';
import OptionModal from '../components/OptionModal';
import { AudioContext } from '../context/AudioProvider';
import { Audio } from 'expo-av';
import {pause, play, playNext, resume, storeAudio} from '../audioController'

export class AudioList extends Component {
    static contextType = AudioContext;

    constructor(props) {
        super(props);
        this.state = {
            optionModalVisible: false,
        };

        this.currentItem = {};
    }

    onPlaybackStatusUpdate = async (playbackStatus) => {
        if(playbackStatus.isLoaded && playbackStatus.isPlaying){
            this.context.updateState(this.context, {
                playbackPosition: playbackStatus.positionMillis,
                playbackDuration: playbackStatus.durationMillis,
            });
        }

        if(playbackStatus.didJustFinish) {
            const nextAudioIndex = this.context.currentAudioIndex + 1;
            if(nextAudioIndex >= this.context.totalCount) {
                this.context.playback.unloadAsync();
                this.context.updateState(this.context, {
                    sound: null,
                    currentAudio: this.context.audioFiles[0],
                    isPlaying: false,
                    currentAudioIndex: 0,
                    playbackPosition: null,
                    playbackPosition: null
                });
                return await storeAudio(this.context.audioFiles[0], 0);
            }
            const audio = this.context.audioFiles[nextAudioIndex];
            const status = await playNext(this.context.playback, audio.uri);
            this.context.updateState(this.context, {
                sound: status,
                currentAudio: audio,
                isPlaying: true,
                currentAudioIndex: nextAudioIndex
            });
            await storeAudio(audio, nextAudioIndex);
        }
    }

    handleAudioPress = async (audio) => {
        const { sound, playback, currentAudio, updateState, audioFiles } = this.context;
       //controllo se è la prima volta che viene avviato l'audio premendo sull'item
        if(sound === null) {
            const playback = new Audio.Sound();
            const soundStatus = await play(playback, audio.uri);

            //dentro index abbaimo l'audio index ejctato che vogliamo mettere in play
            const index = audioFiles.indexOf(audio);

            updateState(this.context, {
                playback: playback, 
                sound: soundStatus, 
                currentAudio: audio, 
                isPlaying: true, 
                currentAudioIndex: index
            });
            playback.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
            return storeAudio(audio, index);
        }

        //metto in pausa l'audio premendo sull'item
        if (sound.isLoaded && sound.isPlaying && currentAudio.id == audio.id){
            const soundStatus = await pause(playback);
            return updateState(this.context, {sound: soundStatus, isPlaying: false});
        }

        //rimetto in play l'audio precedente
        if(sound.isLoaded && !sound.isPlaying && currentAudio.id == audio.id) {
            const soundStatus = await resume(playback);
            return updateState(this.context, {sound: soundStatus, isPlaying: true});
        }

        //seleziono un audio diverso dal precedente
        if(sound.isLoaded && currentAudio.id !== audio.id) {
            const soundStatus = await playNext(playback, audio.uri);
            const index = audioFiles.indexOf(audio);
            updateState(this.context, { 
                sound: soundStatus, 
                currentAudio: audio, 
                isPlaying: true, 
                currentAudioIndex: index 
            });
            return storeAudio();
        }
    }

    componentDidMount() {
        this.context.loadStoreAudio();
    }

    modalView = () => {
        this.setState({...this.state, optionModalVisible: true});
    }

    render() {
        return(
           <View>
               <ScrollView>
                    {this.context.audioFiles.map((item, index) => (
                        <AudioListItem key={index} title={item.filename} duration={item.duration} 
                        onAudioPress = {() => this.handleAudioPress(item)}
                        isPlaying = {this.context.isPlaying}
                        activeItem={this.context.currentAudioIndex === index}
                        onOptionPress={() => {
                            this.currentItem = item
                            this.setState({...this.state, optionModalVisible: true});
                        } }/>
                    ))}
                </ScrollView>
                <OptionModal
                    currentItem = {this.currentItem}
                    onClose={() => {
                    this.setState({...this.state, optionModalVisible: false})
                    }} visible={this.state.optionModalVisible} 
                />
           </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default AudioList;