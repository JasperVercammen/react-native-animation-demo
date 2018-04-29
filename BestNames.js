import React, { Component } from 'react';
import {Dimensions, Image, View, StyleSheet, Text, Animated, Easing} from 'react-native' 
import {withNavigationFocus} from 'react-navigation'

const { width, height } = Dimensions.get('window');
const size = Math.min(width, height) - 1;

class BestNames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: new Animated.Value(0),
      opacity: new Animated.Value(0)
    };
  }

  componentDidUpdate() {
    if(!this.props.isFocused) {
      Animated.parallel([
        Animated.timing(this.state.scale, {
          toValue: 0,
          duration: 300,
          delay: 50,
          easing: Easing.linear
        }),
        Animated.timing(this.state.opacity, {
          toValue: 0,
          duration: 100,
          easing: Easing.linear
        })
      ]).start();
    }
  }

  componentDidMount() {
    Animated.parallel([
      Animated.timing(this.state.scale, {
        toValue: 4,
        duration: 300,
        easing: Easing.linear
      }),
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 50,
        delay: 250,
        easing: Easing.linear
      })
    ]).start();
  }

  getLeftPosition () {
    const halfSize = size / 2;
    const halfWidth = width / 2;
    let marginHorizontalTopLeft = -halfSize;
    return halfWidth;
  }

  getTopPosition () {
    const halfSize = size / 2;
    return -halfSize;
  }

  render() {
    let topPosition = this.getTopPosition();
    let leftPosition = this.getLeftPosition();
    return (
      <View style={styles.container}>
          <Animated.View style={{
            position: 'absolute',
            backgroundColor: '#9ee1f0',
            width: size,
            height: size,
            top: topPosition,
            left: leftPosition,
            borderRadius: size / 2,
            transform: [{
              scale: this.state.scale
            }]
          }} />
        <Animated.View style={{opacity: this.state.opacity}}>
          <Text style={styles.title}>Dit zijn de namen die u heeft opgeslagen</Text>
          {this.props.screenProps.names.map(baby => {
            return (<View key={baby.name} style={styles.row}>
              <Image source={baby.gender === 'male' ? require('./boy.png') : require('./girl.png')} style={styles.image} />
              <Text>{baby.name}</Text>
            </View>)
          }) }
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'transparent',
    alignItems: 'stretch',
  },
  title: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 10,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingVertical: 10,
    borderBottomColor: 'rgba(0,0,0,.2)',
    borderBottomWidth: 1
  },
  image: {
    width: 30,
    height: 30,
    paddingRight: 20,
    marginRight: 20,
  }

})

export default withNavigationFocus(BestNames);