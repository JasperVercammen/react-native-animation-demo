import React from 'react'
import { StackNavigator } from 'react-navigation'
import HomeScreen from '@screens/HomeScreen'
import HeaderButton from '@components/HeaderButton'

const AppNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: (props) => {
      return {
        headerRight: (<HeaderButton onPress={() => props.navigation.navigate('SavedNames')} />)
      }
    }
  }
}, {
  initialRouteParams: {
    count: 0
  },
  initialRouteName: 'Home',
  headerMode: 'float'
})

export default AppNavigator
