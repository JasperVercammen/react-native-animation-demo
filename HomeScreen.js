import React, { PureComponent } from 'react'
import { StyleSheet, TouchableOpacity, Image, ImageBackground, Text } from 'react-native'
import Button from './Button'

class HomeScreen extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      gender: ''
    }
    this.getRandomName()
  }

  getRandomName = () => {
    fetch('https://uinames.com/api/?region=belgium')
      .then((response) => response.json())
      .then((result) => {
        const name = result.name.split(' ')[0]
        this.setState({name, gender: result.gender})
      })
  }

  navigateNext = () => {
    const params = this.props.navigation.state.params || {}
    this.props.navigation.navigate({routeName: 'Home', params: {count: params.count + 1}})
  }

  reset = () => {
    this.props.navigation.popToTop()
  }

  render () {
    const saveName = this.props.screenProps.saveName
    return (
      <ImageBackground source={require('./slab.png')} resizeMode='stretch' style={styles.container}>
        <TouchableOpacity onPress={() => saveName(this.state.name, this.state.gender)}>
          {this.state.gender === 'male' && <Image resizeMode='contain' source={require('./boy.png')} style={styles.image} />}
          {this.state.gender === 'female' && <Image source={require('./girl.png')} style={styles.image} />}
        </TouchableOpacity>
        <Text style={styles.title}>{this.state.name}</Text>
        <Button label='Liever een andere naam' onPress={this.navigateNext} />
      </ImageBackground>
    )
  }
}

HomeScreen.navigationOptions = ({navigation}) => {
  const params = navigation.state.params || {}
  return {
    title: `Naam ${params.count}`
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 60
  },
  image: {
    width: 75,
    height: 75
  },
  title: {
    fontSize: 40,
    paddingTop: 10,
    paddingBottom: 30
  },
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

export default HomeScreen
