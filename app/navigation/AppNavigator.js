import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AudioList from '../screens/AudioList';
import Player from '../screens/Player';
//import PlayList from '../screens/PlayList';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';


const tab = createBottomTabNavigator();

const AppNavigator = () => {
    return <tab.Navigator>
        <tab.Screen name='AudioList' component={AudioList} options={{
            tabBarIcon: ({color, size}) => (
                <MaterialIcons name="headset" size={size} color={color} />
            )
        }} />
        <tab.Screen name='Player' component={Player} options={{
            tabBarIcon: ({color, size}) => (
                <FontAwesome5 name="compact-disc" size={size} color={color} />
            )
        }} />
        {/* <tab.Screen name='PlayList' component={PlayList} options={{
            tabBarIcon: ({color, size}) => (
                <MaterialIcons name="library-music" size={size} color={color} />
            )
        }} /> */}
    </tab.Navigator>
}


export default AppNavigator;