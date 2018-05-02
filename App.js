import React from 'react'
import { Button, Dimensions, Easing, View, Animated, ImageBackground, StyleSheet } from 'react-native'
import { StackNavigator } from 'react-navigation'
import Navigator1 from '@screens/Navigator1'
import Navigator2 from '@screens/Navigator2'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    position: 'relative'
  },
  navigatorWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  title: {
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
    position: 'absolute',
    top: 65,
    width: '100%',
    textAlign: 'center'
  }
})

class MyHomeScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      inSwitchMode: false,
      banking: true,
      scaleBanking: new Animated.Value(1),
      scaleInvesting: new Animated.Value(1),
      translateXBanking: new Animated.Value(0),
      translateXInvesting: new Animated.Value(0),
      opacityTitle: new Animated.Value(0),
      translateYTitle: new Animated.Value(-40)
    }
  }

  play = () => {
    if (this.state.inSwitchMode) {
      this.gotoFullMode()
    } else {
      this.gotoSwitchMode()
    }
  };

  gotoSwitchMode = () => {
    this.setState({ inSwitchMode: true })
    Animated.parallel([
      Animated.timing(this.state.scaleBanking, {
        toValue: 0.6,
        easing: Easing.easeOut,
        duration: 350,
        useNativeDriver: true
      }),
      Animated.timing(this.state.translateXBanking, {
        toValue: -Dimensions.get('window').width / 2,
        easing: Easing.easeOut,
        duration: 350,
        useNativeDriver: true
      }),
      Animated.timing(this.state.scaleInvesting, {
        toValue: 0.6,
        easing: Easing.easeOut,
        duration: 350,
        useNativeDriver: true
      }),
      Animated.timing(this.state.translateXInvesting, {
        toValue: -Dimensions.get('window').width - 30,
        easing: Easing.easeOut,
        duration: 350,
        useNativeDriver: true
      }),
      Animated.timing(this.state.opacityTitle, {
        toValue: 1,
        easing: Easing.easeOut,
        duration: 350,
        useNativeDriver: true
      }),
      Animated.timing(this.state.translateYTitle, {
        toValue: 0,
        easing: Easing.easeOut,
        duration: 350,
        useNativeDriver: true
      })
    ]).start(_ => {})
  };

  gotoFullMode = () => {
    Animated.parallel([
      Animated.timing(this.state.scaleBanking, {
        toValue: 1,
        easing: Easing.easeOut,
        duration: 350,
        useNativeDriver: true
      }),
      Animated.timing(this.state.translateXBanking, {
        toValue: this.state.banking ? -Dimensions.get('window').width : 0,
        easing: Easing.easeOut,
        duration: 350,
        useNativeDriver: true
      }),
      Animated.timing(this.state.scaleInvesting, {
        toValue: 1,
        easing: Easing.easeOut,
        duration: 350,
        useNativeDriver: true
      }),
      Animated.timing(this.state.translateXInvesting, {
        toValue: this.state.banking ? -Dimensions.get('window').width : 0,
        easing: Easing.easeOut,
        duration: 350,
        useNativeDriver: true
      }),
      Animated.timing(this.state.opacityTitle, {
        toValue: 0,
        easing: Easing.easeOut,
        duration: 350,
        useNativeDriver: true
      }),
      Animated.timing(this.state.translateYTitle, {
        toValue: -40,
        easing: Easing.easeOut,
        duration: 350,
        useNativeDriver: true
      })
    ]).start(_ => {
      this.setState({ inSwitchMode: false, banking: !this.state.banking })
    })
  };

  render () {
    return (
      <ImageBackground style={styles.container} resizeMode='stretch' source={require('@assets/rectangle12.png')}>
        {/* <Button onPress={this.play} title='toggle View' /> */}
        {this.state.inSwitchMode && (
          <Animated.Text
            style={[
              styles.title,
              {
                opacity: this.state.opacityTitle,
                transform: [ { translateY: this.state.translateYTitle } ]
              }
            ]}>
            Select your environment
          </Animated.Text>
        )}
        <View style={styles.navigatorWrapper}>
          <Animated.View
            style={{
              width: Dimensions.get('window').width,
              transform: [ { scale: this.state.scaleBanking }, { translateX: this.state.translateXBanking } ]
            }}>
            <Navigator1 />
          </Animated.View>
          <Animated.View
            style={{
              width: Dimensions.get('window').width,
              transform: [ { scale: this.state.scaleInvesting }, { translateX: this.state.translateXInvesting } ]
            }}>
            <Navigator2 />
          </Animated.View>
        </View>
      </ImageBackground>
    )
  }
}

MyHomeScreen.navigationOptions = {
  title: 'Welcome',
  header: null
}

const SimpleStack = StackNavigator({
  Home: {
    screen: MyHomeScreen
  }
})

export default SimpleStack
