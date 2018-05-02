import React, { Component } from 'react'
import {Image, View, StyleSheet, Dimensions, Text} from 'react-native'
import { DangerZone } from 'expo'
import Button from '@components/Button'
let { Lottie } = DangerZone

const { width } = Dimensions.get('window')

class SavedNameDetailScreen extends Component {
  componentDidMount () {
    this.animation.reset()
    this.animation.play()
  }
  render () {
    const params = this.props.navigation.state.params || {}

    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image source={params.baby.gender === 'male' ? require('@assets/boy.png') : require('@assets/girl.png')} style={styles.image} />
        </View>
        <View style={styles.animation}>
          <Lottie
            ref={animation => {
              this.animation = animation
            }}
            style={{
              width,
              height: 200,
              backgroundColor: 'transparent'
            }}
            source={require('@assets/sheep.json')}
          />
        </View>
        <Text style={styles.name}>{params.baby.name}</Text>
        <View style={styles.bottomContainer}>
          <Button onPress={() => this.props.navigation.goBack()} label='Terug naar overzicht' />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#9ee1f0',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  bottomContainer: {
    paddingBottom: 30
  }
})

export default SavedNameDetailScreen
