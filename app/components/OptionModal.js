import React from "react";
import { View, StyleSheet, Modal, Text, TouchableWithoutFeedback } from "react-native";
import color from "../color";

const OptionModal = ({visible, currentItem, onClose, onPlayPress}) => {
    const { filename, duration } = currentItem;
    return (
            <Modal animationType="slide" trasparent visible={visible}>
                <View style={styles.modal}>
                    <Text style={styles.title} numberOfLines={2}>
                        {filename}
                    </Text>
                    <View style={styles.optionContainer}>
                        <TouchableWithoutFeedback>
                            <Text style={styles.option}>{duration}</Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={styles.modalBG}/>
                </TouchableWithoutFeedback>
            </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: color.APP_BG,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        zIndex: 1000
    },
    optionContainer: {
        padding: 20
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 20,
        paddingBottom: 0,
        color: color.FONT_MEDIUM,
    },
    option: {
        fontSize: 16,
        fontWeight: 'bold',
        color: color.FONT,
        paddingVertical: 10,
    },
    modalBG: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: color.MODAL_BG
    }
})

export default OptionModal;