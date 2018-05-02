import React from 'react'
import {View} from 'react-native'
import AppNavigator from '@screens/AppNavigator'

export default class App extends React.Component {
  render () {
    return (
      // <View style={{flex: 1, transform: [{scale: 0.3}]}}>
      <AppNavigator />
      // </View>
    )
  }
}
