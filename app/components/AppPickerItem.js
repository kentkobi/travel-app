import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import AppIcon from './AppIcon';
import AppText from './AppText';



function AppPickerItem({onPress, label, icon, backgroundColor}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <AppIcon name={icon} iconColor="white" backgroundColor={backgroundColor}/>
            <AppText> {label} </AppText>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container:{
        paddingHorizontal:10,
        paddingVertical: 10,
        width:"33%",
        alignItems:"center",
    }
})

export default AppPickerItem;