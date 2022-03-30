import React from 'react';
import color from '../color';
import { AntDesign } from '@expo/vector-icons'

const PlayerButton = (props) => {

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
        <AntDesign {...props} name={getIconName(props.iconType)} color={color.FONT}></AntDesign>
    );

}

export default PlayerButton;