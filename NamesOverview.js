import React, { Component } from 'react'
import {Image, View, TouchableOpacity, StyleSheet, Text} from 'react-native'
import {Transition} from 'react-navigation-fluid-transitions'

class NamesOverview extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Dit zijn de namen die u al leuk vond</Text>
        {this.props.screenProps.names.map(baby => {
          return (
            <View style={styles.row} key={baby.name} >
              <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('NameInfo', {baby})}>
                <View style={styles.buttonWrapper}>
                  <Transition shared={`babyPic_${baby.name}`}>
                    <Image source={baby.gender === 'male' ? require('@assets/boy.png') : require('@assets/girl.png')} style={styles.image} />
                  </Transition>
                  <Transition shared={`babyName_${baby.name}`}>
                    <Text>{baby.name}</Text>
                  </Transition>
                </View>
              </TouchableOpacity>
            </View>
          )
        }) }
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
  title: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 10,
    marginBottom: 20
  },
  buttonWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingVertical: 10
  },
  row: {
    width: '100%',
    borderBottomColor: 'rgba(0,0,0,.2)',
    borderBottomWidth: 1
  },
  image: {
    width: 30,
    height: 30,
    paddingRight: 20,
    marginRight: 20
  }
})

export default NamesOverview
