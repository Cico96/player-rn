import React from 'react';
import color from '../color';
import { AntDesign } from '@expo/vector-icons'

const PlayerButton = (props) => {
    const { iconType,
            size = 40,
            onPress
    } = props;

    const getIconName = (type) => {
        switch(type) {
            case 'PLAY':
                return 'pausecircle';
            case 'PAUSE':
                return 'playcircleo';
            case 'NEXT':
                return 'forward';
            case 'PREV':
                return 'banckward';
        }
    }

    return(
        <AntDesign {...props} onPress={onPress} name={getIconName(iconType)} size={size} color={color.FONT}></AntDesign>
    );

}

export default PlayerButton;