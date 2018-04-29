import React from 'react'
import { StackNavigator } from 'react-navigation'
import { Animated, Easing } from 'react-native'
import HomeScreen from './HomeScreen'
import BestNames from './BestNames'
import HeaderButton from './HeaderButton'

const transitionConfig = (props) => {
  const { scenes } = props

  if (scenes[scenes.length - 1].route.routeName === 'BestNames') {
    const bestNameIndex = scenes[scenes.length - 1].index
    return {
      transitionSpec: {
        delay: 150,
        duration: 150
      },
      containerStyle: {
        backgroundColor: 'transparent'
      },
      screenInterpolator: sceneProps => {
        const { index, scene } = sceneProps
        if (scene.index === index || scene.index + 1 === index || bestNameIndex === scene.index) return {}
        return {
          opacity: 0
        }
      }
    }
  }
  return {
    transitionSpec: {
      duration: 1750,
      easing: Easing.bezier(0, 0.12, 0.88, 1),
      timing: Animated.timing,
      useNativeDriver: true
    },
    containerStyle: {
      backgroundColor: 'transparent'
    },
    screenInterpolator: sceneProps => {
      const { position, progress, layout, scene, index } = sceneProps
      const toIndex = index
      const thisSceneIndex = scene.index
      const width = layout.initWidth

      if (toIndex !== thisSceneIndex && thisSceneIndex !== toIndex - 1 && thisSceneIndex !== toIndex + 1) return { opacity: 0 }

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.8, thisSceneIndex - 0.2, thisSceneIndex, thisSceneIndex + 0.2, thisSceneIndex + 0.8, thisSceneIndex + 1],
        outputRange: [width, width, 0, 0, 0, -width, -width]
      })

      const rotate = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.8, thisSceneIndex - 0.2, thisSceneIndex, thisSceneIndex + 0.2, thisSceneIndex + 0.8, thisSceneIndex + 1],
        outputRange: [ '-9deg', '-9deg', '0deg', '0deg', '0deg', '9deg', '9deg' ]
      })

      const scale = progress.interpolate({
        inputRange: [0, 0.1, 0.5, 0.9, 1],
        outputRange: [index !== thisSceneIndex ? 1 : 0.6, 0.6, 0.6, 0.6, index !== thisSceneIndex ? 0.6 : 1]
      })

      let translateY = 0
      if (index !== thisSceneIndex) {
        translateY = progress.interpolate({
          inputRange: [0, 0.2, 0.8, 1],
          outputRange: [0, 0, -30, -30]
        })
      }

      if (index === thisSceneIndex) {
        translateY = progress.interpolate({
          inputRange: [0, 0.2, 0.8, 1],
          outputRange: [-30, -30, 0, 0]
        })
      }

      return { transform: [{ translateX }, { translateY }, {scale}, {rotate}] }
    }
  }
}

const AppNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: (props) => {
      return {
        headerRight: (<HeaderButton onPress={() => props.navigation.navigate('BestNames')} />)
      }
    }
  },
  BestNames: {
    screen: BestNames,
    navigationOptions: props => {
      return {
        headerStyle: {
          backgroundColor: 'transparent',
          borderBottomWidth: 0
        },
        title: 'Opgeslagen namen',
        headerLeft: null,
        headerRight: (<HeaderButton onPress={() => props.navigation.goBack()} type='close' />)
      }
    }
  }
}, {
  initialRouteParams: {
    count: 0
  },
  initialRouteName: 'Home',
  headerMode: 'float',
  cardStyle: {
    backgroundColor: 'transparent'
  },
  transitionConfig
})

export default AppNavigator
