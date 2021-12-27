import React, { useEffect } from 'react'
import {
    FlatList,
    Animated,
    Dimensions,
    Platform,
    View,
    Text
} from 'react-native';

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const { width, height } = Dimensions.get('window');
const SPACING = 10; 
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.75 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;


const Carousel = () => {
    const [data, setData] = React.useState<any>([]);
    const scrollX = React.useRef(new Animated.Value(0)).current;
    useEffect(() => {
        setData([{ key: 'empty-left' }, ...arr, { key: 'empty-right' }]);
    }, [])

    return (
        <Animated.ScrollView
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            contentContainerStyle={{ alignItems: 'center'}}
            snapToInterval={ITEM_SIZE}
            horizontal
            bounces={false}
            pagingEnabled
            decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
            renderToHardwareTextureAndroid
            snapToAlignment='start'
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true }
            )}
        >
            {
                data.map((item: { key: string; }, index: number)=> {
                    if (item?.key == 'empty-left' || item?.key == 'empty-right') {
                        return <View style={{ width: EMPTY_ITEM_SIZE }} key={index.toString()}/>;
                    }

                    const inputRange = [
                        (index - 3) * ITEM_SIZE,
                        (index - 2) * ITEM_SIZE,
                        (index - 1) * ITEM_SIZE,
                        index * ITEM_SIZE,
                        (index + 1) * ITEM_SIZE,
                    ];
                    const inputRangeN = [
                        (index - 3) * ITEM_SIZE,
                        (index - 2) * ITEM_SIZE,
                        (index - 1) * ITEM_SIZE,
                        index * ITEM_SIZE,
                        (index + 1) * ITEM_SIZE,
                    ];
                    const translateY = scrollX.interpolate({
                        inputRange,
                        outputRange: [0,25, 50, 25, 0],
                        extrapolate: 'clamp',
                    });
                  
                    const translateX = scrollX.interpolate({
                        inputRange: inputRangeN,
                        outputRange: [-350,-90, 0, 90, 350],
                        extrapolate: 'clamp',
                    });
                    const inputRangeZindex = [
                        (index - 3) * ITEM_SIZE,
                        (index - 2) * ITEM_SIZE,
                        (index - 1) * ITEM_SIZE,
                        index * ITEM_SIZE,
                        (index + 1) * ITEM_SIZE,
                    ];
                    const elevation = scrollX.interpolate({
                        inputRange:inputRangeZindex,
                        outputRange: [3, 5, 10, 5,3],
                        extrapolate: 'clamp',
                    });
                    const style = Platform.select({ 
                        ios: { zIndex: elevation},
                        android: { elevation: elevation}
                    })
                    return (
                        <Animated.View 
                            style={[{ 
                                width: ITEM_SIZE, 
                                // zIndex: index == 0 ? 999 :1,
                                // // backgroundColor: 'red'
                                transform: [{ translateX, translateY, }],
                            },style]} 
                            key={index.toString()} 
                            
                        >
                            <Animated.View
                                style={{
                                    marginHorizontal: SPACING,
                                    padding: SPACING * 2,
                                    height: 470,
                                    backgroundColor: '#FAFAFA',
                                    borderRadius: 30,
                                    borderWidth: 2,
                                }}
                            >
                             <Text>{index}</Text>   
                            </Animated.View>
                        </Animated.View>
                    );
                })
            }
        </Animated.ScrollView>
    )
}

export default Carousel