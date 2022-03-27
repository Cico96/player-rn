import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import color from '../color';
import PlayListModal from '../components/PlaylistModal';

const PlayList = () => {
    const [modalVisible, setModalVisible] = useState(false)
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity style={styles.playlists}>
                <Text>Playlists</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={{marginTop: 15}}>
                <Text style={styles.btn}>+ Add new Playlist</Text>
            </TouchableOpacity>
            <PlayListModal visible={modalVisible} onClose={() => setModalVisible(false)} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    playlists: {
        padding: 5,
        backgroundColor: 'rgba(204,204,204,03)',
        borderRadius: 5
    },
    btn: {
        color: color.ACTIVE_BG,
        letterSpacing: 1,
        fontWeight: 'bold',
        fontSize: 14,
        padding: 5
    }
});

export default PlayList;