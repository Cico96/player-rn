import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback } from "react-native"
import { Entypo } from '@expo/vector-icons';
import color from "../color";


const getThumbnail = filename => filename[0];

const playPauseIcon = isPlaying => {
    if(isPlaying) return <Entypo name="controller-paus" size={24} color="black" />
    return <Entypo name="controller-play" size={24} color="black" />
}

const AudioListItem = ({title, duration, onOptionPress, onAudioPress, isPlaying, activeItem}) => {
    return(
        <>
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={onAudioPress}>
            <View style={styles.leftContainer}>
                <View style={styles.thumbnail}>
                    <Text style={styles.thumbnailText}>
                        {activeItem ? playPauseIcon(isPlaying) : getThumbnail(title)}
                    </Text>
                </View>
                <View style={styles.titleContainer}>
                    <Text numberOfLines={1} style={styles.title}>{title}</Text>
                    <Text style={styles.time}>{duration}</Text>
                </View>
            </View>
            </TouchableWithoutFeedback>
            <View style={styles.rightContainer}>
                <Entypo
                onPress={onOptionPress}
                name="dots-three-vertical" 
                size={20} 
                color={color.FONT_MEDIUM}
                style={{padding: 10}} />
            </View>
        </View>
        <View style={styles.separator} />
        </>
    )
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 50,
        alignSelf: 'center',
        width: width - 80,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    rightContainer: {
        flexBasis: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    thumbnail: {
        height: 50,
        backgroundColor: color.FONT_LIGHT,
        flexBasis: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },
    thumbnailText: {
        fontSize: 22,
        fontWeight:  'bold',
        color: color.FONT
    },
    titleContainer: {
        width: width - 180,
        paddingLeft: 10
    },
    title: {
        fontSize: 16,
        color: color.FONT
    },
    separator: {
        width: width - 80,
        backgroundColor: '#333',
        opacity: 0.3,
        height: 0.5,
        alignSelf: 'center',
        marginTop: 10,
    },
    time: {
        fontSize: 14,
        color: color.FONT_LIGHT,
    }
})

export default AudioListItem;