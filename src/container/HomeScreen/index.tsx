import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Text, View,TouchableOpacity, FlatList, StyleSheet, Alert, NativeModules } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import useStateSafe from '../../hook/useStateSafe';
import SwipeOut from '../../components/swipeout';
import { IRootState } from '../../stores';
import { HomeScreenParam } from 'screens';
import { actions } from '../../stores/Trip';
import { axiosCancelSource } from '../../network';
type Props  = HomeScreenParam & {
    
}

const HomeScreen : React.FC<Props> = (props) => {
    const dispatch = useDispatch();
    const  user = useSelector((state: IRootState) => state.auth)
    const [isDual, setDual] = useStateSafe<boolean>(false)
    useEffect(() => {
      dispatch(actions.tripStart(axiosCancelSource))
      axiosCancelSource.cancel("cancel request")
      // setTimeout(() => {
      //   dispatch(actions.tripCancel())
      // },0)
    },[])



    const checkSimInfo = async() => {
      console.log("fetch trip")
      // dispatch(actions.tripStart())
        // setDual(isDual)
    }

    const sendSms = () => {
        console.log("sms")
        // SmsModule.sendMessage()
    }

    let swipeBtns = [
        {
          text: 'Delete',
          component: (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>delete</Text>
            </View>
          ),
          backgroundColor: '#F23030',
          onPress: () => {
            let content = `Bạn muốn xoá đơn hàng 214212 khỏi danh sách?`
            Alert.alert(
              "Thông báo",
              content,
              [
                {
                  text: 'Thoát', onPress: () => {
  
                  }, style: 'cancel'
                },
                {
                  text: 'Đồng ý', onPress: () => {
        
                  }
                }
              ],
              { cancelable: false }
            );
          }
        },
        {
            text: 'edit',
            component: (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text>edit</Text>
              </View>
            ),
            backgroundColor: 'cyan',
            onPress: () => {
              let content = `Bạn muốn xoá đơn hàng 214212 khỏi danh sách?`
              Alert.alert(
                "Thông báo",
                content,
                [
                  {
                    text: 'Thoát', onPress: () => {
    
                    }, style: 'cancel'
                  },
                  {
                    text: 'Đồng ý', onPress: () => {
                      
                    }
                  }
                ],
                { cancelable: false }
              );
            }
          }
      ]
    return(
        <View>
            <Text>
                ""
            </Text>
            <TouchableOpacity onPress={checkSimInfo} style={{ marginBottom: 30}}>
                <Text style={{ fontSize: 25}}>
                checkSimInfo
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={sendSms} style={{ marginBottom: 30}}>
                <Text style={{ fontSize: 25}}>
                    smsSms
                </Text>
            </TouchableOpacity>
            <Text>
                isDual: {isDual}
            </Text>
            <SwipeOut
                isCamera={false}
                right={swipeBtns}
            >
                <View style={itemStyle.container}>
                    <Text style={[itemStyle.txtOrderCode]}>
                            K#IN($)AKAKA
                    </Text>
                    <Text style={[itemStyle.txtFee]}>
                        1000
                    </Text>
                </View>
                
            </SwipeOut>
        </View>
    )
}



HomeScreen.defaultProps = {
  
}

const itemStyle = StyleSheet.create({
	container: {
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: 'white'
    },
    viewLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    
	txtIndex: {
        fontSize: 16,
        color: '#717171',
    },
    txtOrderCode: {
        color: '#0D0D0D',
        fontSize: 14,
    },
    txtFee: {
        color: '#717171',
        fontSize: 14,
        marginTop: 2,
    }
})

export default HomeScreen;