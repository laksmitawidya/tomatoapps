import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import RoundedButton from '../Components/RoundedButton'

import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'



export default class LaunchScreen extends Component {
  _handleStories (navigate) {
    navigate('HomeScreen')
  }

  render () {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>
          <View style={styles.middlePadding}>
            <RoundedButton text="Getting Started" onPress={() => this._handleStories(navigate)} />
          </View>
        </ScrollView>
      </View>
    )
  }
}
