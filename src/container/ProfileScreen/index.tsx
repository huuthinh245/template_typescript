
import React, { useEffect, useState, memo } from 'react'
import { useSelector } from 'react-redux'
import {  TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileScreenPram } from 'screens';
import { IRootState } from '../../stores';
import instance from '../../network'
import { Text } from '../../components'
type Props = ProfileScreenPram & {

}
const ProfileScreen : React.FC<Props> = memo((props) => {

    return(
        <SafeAreaView style={{ flex: 1}}>
            <View  style={{ flex: 1}}>
                <Text 
                tx="welcomeScreen.helloWorld"
                />
                <TouchableOpacity onPress={() => {
            
                 
                }}>
                    <Text text="mutiple language"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate("ProfileScreen")
                 
                }}>
                    <Text text="mutiple language"/>
                </TouchableOpacity>
            </View>
         </SafeAreaView>
    )
})

export default ProfileScreen;
