import React, {useContext, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import color from "../color";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import PlayerButton from '../components/PlayerButton';
import { AudioContext } from '../context/AudioProvider'
import { pause, play, playNext, resume, storeAudio } from '../audioController';


const { width } = Dimensions.get('window');

const Player = () => {
    const context = useContext(AudioContext);
    const { playbackPosition, playbackDuration } = context;
    
    const calculateSeekbar = () => {
        if(playbackPosition !== null && playbackDuration !== null ) {
            return playbackPosition / playbackDuration;
        }
        return 0;
    }

    useEffect(() => {
        context.loadStoreAudio();
    }, []);

    const handlePlayPause = async () => {

        if(context.sound === null) {
            const audio = context.currentAudio;
            const status = await play(context.playback, audio.uri);
            return context.updateState(context, {
                sound: status,
                currentAudio: audio,
                isPlaying: true,
                currentAudioIndex: context.currentAudioIndex
            });
        }

        if(context.sound && context.sound.isPlaying) {
            const status = await pause(context.playback);
            return context.updateState(context, {
                sound: status,
                isPlaying: false
            });
        }

        if(context.sound && !context.sound.isPlaying) {
            const status = await resume(context.playback);
            return context.updateState(context, {
                sound: status,
                isPlaying: true
            });
        }
    }

    const handleNext = async () => {
        const {isLoaded} = await context.playback.getStatusAsync();
        const isLastAudio = context.currentAudioIndex + 1 === context.totalCount;
        let audio = context.audioFiles[context.currentAudioIndex + 1]
        let index;
        let status;

        if(!isLoaded && !isLastAudio) {
            index = context.currentAudioIndex + 1;
            status = await play(context.playback, audio.uri);
        }
        if(isLoaded && !isLastAudio) {
            index = context.currentAudioIndex + 1;
            status = await playNext(context.playback, audio.uri);
        }
        if(isLastAudio) {
            index = 0;
            audio = context.audioFiles[index];
            if(isLoaded) {
                status = await playNext(context.playback, audio.uri);
            } else {
                status = await play(context.playback, audio.uri);
            }
           
        }
        context.updateState(context, {
            currentAudio: audio,
            playback: context.playback,
            sound: status,
            isPlaying: true,
            currentAudioIndex: index
        });
        storeAudio(audio, index);
    }

    const handlePrev = async () => {
        const {isLoaded} = await context.playback.getStatusAsync();
        const isFirstAudio = context.currentAudioIndex <= 0;
        let audio = context.audioFiles[context.currentAudioIndex - 1]
        let index;
        let status;

        if(!isLoaded && !isFirstAudio) {
            index = context.currentAudioIndex -1;
            status = await play(context.playback, audio.uri);
        }
        if(isLoaded && !isFirstAudio) {
            index = context.currentAudioIndex - 1;
            status = await playNext(context.playback, audio.uri);
        }
        if(isFirstAudio) {
            //console.log(context.totalCount, 'tot')
            index = context.totalCount - 1;
            //console.log(index);
            audio = context.audioFiles[index];
            //console.log(audio);
            status = await playNext(context.playback, audio.uri);
        }
        context.updateState(context, {
            currentAudio: audio,
            playback: context.playback,
            sound: status,
            isPlaying: true,
            currentAudioIndex: index
        })
    }

    if(!context.currentAudio) return null;

    return <View style={styles.container}>
        <View style={styles.midContainer}>
        <MaterialCommunityIcons name="music-circle" size={300} color={color.ACTIVE_BG} />
        </View>
        <View style={styles.audioPlayerContainer}>
            <Text numberOfLines={1} style={styles.audioTitle}>{context.currentAudio.filename}</Text>
            <Slider
                style={{width: width, height: 40}}
                minimumValue={0}
                maximumValue={1}
                value={calculateSeekbar()}
                minimumTrackTintColor={color.FONT_MEDIUM}
                maximumTrackTintColor={color.ACTIVE_BG}
            />
            <View style={styles.audioController}>
                <PlayerButton iconType='PREV' onPress={handlePrev}/>
                <PlayerButton 
                onPress={handlePlayPause} 
                style={{marginHorizontal: 25}} 
                iconType={context.isPlaying ? 'PLAY' : 'PAUSE'} />
                <PlayerButton iconType='NEXT' onPress={handleNext} />
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    audioCount: {
        textAlign: 'right',
        padding: 15,
        color: color.FONT_LIGHT,
        fontSize: 14
    },
    midContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    audioTitle: {
        fontSize: 16,
        color: color.FONT,
        padding: 15
    },
    audioController: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20
    }
});

export default Player;