import React, { Component } from 'react'
import {Image, View, StyleSheet, Text} from 'react-native'
import {Transition} from 'react-navigation-fluid-transitions'
import { DangerZone } from 'expo'
import Button from './Button'

let { Lottie } = DangerZone

class NameInfo extends Component {
  render () {
    const params = this.props.navigation.state.params || {}

    return (
      <View style={styles.container}>
        <Transition shared={`babyName_${params.baby.name}`}>
          <Image source={params.baby.gender === 'male' ? require('./boy.png') : require('./girl.png')} style={styles.image} />
        </Transition>
        <Text>{params.baby.name}</Text>
        <Button onPress={() => this.props.navigation.goBack()} label='Terug naar overzicht' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#9ee1f0',
    alignItems: 'center'
  }
})

export default NameInfo
