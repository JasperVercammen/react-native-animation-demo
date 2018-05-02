import React, { Component } from 'react'
import {Image, View, StyleSheet, Dimensions, Text} from 'react-native'
import {Transition} from 'react-navigation-fluid-transitions'
import { DangerZone } from 'expo'
import Button from '@components/Button'
let { Lottie } = DangerZone

const { width } = Dimensions.get('window')

class SavedNameDetailScreen extends Component {
  render () {
    const params = this.props.navigation.state.params || {}

    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Transition shared={`babyPic_${params.baby.name}`}>
            <Image source={params.baby.gender === 'male' ? require('@assets/boy.png') : require('@assets/girl.png')} style={styles.image} />
          </Transition>
        </View>
        <Transition shared={`babyName_${params.baby.name}`}>
          <Text style={styles.name}>{params.baby.name}</Text>
        </Transition>
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
    alignItems: 'center'
  },
  bottomContainer: {
    paddingBottom: 30
  }
})

export default SavedNameDetailScreen
