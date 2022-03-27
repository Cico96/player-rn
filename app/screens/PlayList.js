import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PlayList = () => {
    return(
        <View style={styles.container}>
            <Text>Playlist</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default PlayList;