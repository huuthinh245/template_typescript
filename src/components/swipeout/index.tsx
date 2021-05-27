import React, { Component, ReactNode, useCallback, useRef } from 'react';
import { Animated, StyleSheet, Text, View, I18nManager } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';

import Swipeable from 'react-native-gesture-handler/Swipeable';

type Item = {
    text: string, 
    backgroundColor: string, 
    onPress: () => void,
    component: ReactNode | null
}
type Props = {
    children?: ReactNode,
    isCamera: boolean,
    right: Array<Item>
}

const AppleStyleSwipeableRow : React.FC<Props> = (props) => {
    let _swipeableRow = useRef<Swipeable | null>(null);
    const renderRightActions = useCallback((
        progress: Animated.AnimatedInterpolation,
        _dragAnimatedValue: Animated.AnimatedInterpolation
    ) => {
        const size = props.right.length
        return (
          <View
            style={{
              width: 100,
              flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
            }}>
            {props.right.map((item, index) =>
              renderRightAction(item.text, item.backgroundColor, index == 0 ? 32 * size : 32 * index, progress, item.onPress, item.component))
            }
          </View>
        )
    },[])

const renderRightAction = (
    text: string, 
    color: string, 
    x: number, 
    progress:Animated.AnimatedInterpolation, 
    onPress:() => void,
    component: ReactNode | null) => {
        const trans = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [x, 0],
        });
        const pressHandler = () => {
          close();
          onPress()
        };
        return (
          <Animated.View key={Math.random().toString()} style={{ flex: 1, transform: [{ translateX: trans }], borderRadius: 8 }}>
            <RectButton
              style={[styles.rightAction, { backgroundColor: color }]}
              onPress={pressHandler}>
              {component ? component : <Text>{text}</Text>}
            </RectButton>
          </Animated.View>
        );
};

    const updateRef = (ref: Swipeable) => {
        _swipeableRow.current = ref
    };

    const close = () => {
        _swipeableRow.current?.close()
    }

    return (
        <Swipeable
          containerStyle={{ borderRadius: 8, marginBottom: 8 }}
          ref={updateRef}
          friction={1}
          useNativeAnimations

          enableTrackpadTwoFingerGesture
          leftThreshold={30}
          rightThreshold={40}
          // renderLeftActions={this.renderLeftActions}
          renderRightActions={renderRightActions}>
          {props.children}
        </Swipeable>
      );
}

AppleStyleSwipeableRow.defaultProps = {
    isCamera: false,
    right: []
}


const styles = StyleSheet.create({
    leftAction: {
      flex: 1,
      backgroundColor: '#497AFC',
      justifyContent: 'center',
    },
    actionText: {
      color: 'white',
      fontSize: 16,
      backgroundColor: 'transparent',
      padding: 10,
    },
    rightAction: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
  });
export default AppleStyleSwipeableRow;