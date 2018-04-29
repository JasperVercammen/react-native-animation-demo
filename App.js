import React from 'react'
import { ImageBackground, Image } from 'react-native'
import AppNavigator from './AppNavigator'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      names: []
    }
  }

  saveName = (name, gender) => {
    if (!this.state.names.map(baby => baby.name).includes(name)) {
      this.setState({names: [...this.state.names, {name, gender}]})
    }
  }

  render () {
    return (
      <ImageBackground source={require('@assets/background.jpg')} resizeMode='cover' style={{flex: 1, position: 'relative'}}>
        <Image source={require('@assets/rope.png')} resizeMode='contain' style={{position: 'absolute', width: '100%', top: '23%'}} />
        <AppNavigator screenProps={{saveName: this.saveName, names: this.state.names}} />
      </ImageBackground>
    )
  }
}
