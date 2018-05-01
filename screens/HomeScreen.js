import React, { PureComponent } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Button from '@components/Button'

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
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.state.name}</Text>
        <Button label='Liever een andere naam' onPress={this.navigateNext} />
        <Text>{'\n'}</Text>
        <Button label='Reset' onPress={this.reset} />
      </View>
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 40,
    paddingTop: 10,
    paddingBottom: 30
  }
})

export default HomeScreen
