import React from 'react'
import {Text, TouchableOpacity, StyleSheet} from 'react-native'

const Button = (props) => {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#e40909',
    borderRadius: 25
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
})

export default Button
