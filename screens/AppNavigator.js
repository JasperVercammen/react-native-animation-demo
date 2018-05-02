import { StackNavigator } from 'react-navigation'
import { Animated, Easing } from 'react-native'
import HomeScreen from '@screens/HomeScreen'

const transitionConfig = (props) => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.bezier(0, 0.12, 0.88, 1),
      timing: Animated.timing,
      useNativeDriver: true
    },
    containerStyle: {
      backgroundColor: 'transparent'
    },
    screenInterpolator: sceneProps => {
      const { position, progress, layout, scene, index } = sceneProps
      const thisSceneIndex = scene.index
      const width = layout.initWidth

      // go from right of the screen to the left
      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.8, thisSceneIndex - 0.2, thisSceneIndex + 0.2, thisSceneIndex + 0.8, thisSceneIndex + 1],
        outputRange: [width, width, 0, 0, -width, -width]
      })

      // Rotate a bit ("swing" effect)
      const rotate = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.8, thisSceneIndex - 0.2, thisSceneIndex + 0.2, thisSceneIndex + 0.8, thisSceneIndex + 1],
        outputRange: [ '-9deg', '-9deg', '0deg', '0deg', '9deg', '9deg' ]
      })

      // Zoom out, do the translateX and zoom in again
      const scale = progress.interpolate({
        inputRange: [0, 0.1, 0.5, 0.9, 1],
        outputRange: [index !== thisSceneIndex ? 1 : 0.6, 0.6, 0.6, 0.6, index !== thisSceneIndex ? 0.6 : 1]
      })

      // Set a translateY according to
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

      return { transform: [{ translateX }, { translateY: 0 }, {scale: 1}, {rotate: '0deg'}] }
    }
  }
}

const AppNavigator = StackNavigator({
  Home: {
    screen: HomeScreen
  }
}, {
  initialRouteParams: {
    count: 0
  },
  initialRouteName: 'Home',
  headerMode: 'float',
  transitionConfig
})

export default AppNavigator
