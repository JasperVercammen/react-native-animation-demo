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
      scale: new Animated.Value(1),
      opacity: new Animated.Value(0)
    }
  }

  componentDidUpdate () {
    // if (!this.props.isFocused) {
    //   Animated.parallel([
    //     Animated.timing(this.state.scale, {
    //       toValue: 0,
    //       duration: 300,
    //       delay: 50,
    //       easing: Easing.linear
    //     }),
    //     Animated.timing(this.state.opacity, {
    //       toValue: 0,
    //       duration: 100,
    //       easing: Easing.linear
    //     })
    //   ]).start()
    // }
  }

  componentDidMount () {
    // Animated.parallel([
    //   Animated.timing(this.state.scale, {
    //     toValue: 4,
    //     duration: 300,
    //     easing: Easing.linear
    //   }),
    //   Animated.timing(this.state.opacity, {
    //     toValue: 1,
    //     duration: 50,
    //     delay: 250,
    //     easing: Easing.linear
    //   })
    // ]).start()
  }

  render () {
    const topPosition = -size / 2
    const leftPosition = width / 2
    return (
      <View style={styles.container}>
        <Animated.View style={{
          position: 'absolute',
          backgroundColor: 'red', // '#9ee1f0',
          width: size,
          height: size,
          top: 0,
          left: 0,
          borderRadius: size / 2,
          transform: [{
            scale: this.state.scale
          }]
        }} />
        <Animated.View style={{opacity: this.state.opacity, flex: 1}}>
          <SavedNamesNavigator screenProps={this.props.screenProps} />
        </Animated.View>
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
