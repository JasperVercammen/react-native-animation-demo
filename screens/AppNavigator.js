import { StackNavigator } from 'react-navigation'
import HomeScreen from '@screens/HomeScreen'

const AppNavigator = StackNavigator({
  Home: {
    screen: HomeScreen
  }
}, {
  initialRouteParams: {
    count: 0
  },
  initialRouteName: 'Home',
  headerMode: 'float'
})

export default AppNavigator
