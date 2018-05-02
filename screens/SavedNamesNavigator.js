import React, { Component } from 'react'
import {Dimensions, View, StyleSheet, Animated, Easing} from 'react-native'
import {withNavigationFocus, StackNavigator} from 'react-navigation'
import SavedNameDetailScreen from '@screens/SavedNameDetailScreen'
import SavedNamesScreen from '@screens/SavedNamesScreen'

const { width, height } = Dimensions.get('window')
const size = Math.min(width, height) - 1

const SavedNamesNavigator = StackNavigator({
  SavedNamesOverview: { screen: SavedNamesScreen },
  SavedNameDetail: { screen: SavedNameDetailScreen }
}, {
  headerMode: 'none'
})

class SavedNamesContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      scale: new Animated.Value(0),
      opacity: new Animated.Value(0)
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <SavedNamesNavigator screenProps={this.props.screenProps} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'transparent',
    alignItems: 'stretch'
  }
})

export default withNavigationFocus(SavedNamesContainer)
