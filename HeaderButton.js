import React, { Component } from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native'

class HeaderButton extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Image source={this.props.type === 'close' ? require('./close.png') : require('./cubes.png')} style={styles.image} />
        </TouchableOpacity>
      </View>      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 30,
    height: 30,
  }
})

export default HeaderButton;