import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator, View, Dimensions } from 'react-native'
import { Colors, Metrics } from '../Themes'
import ExamplesRegistry from '../Services/ExamplesRegistry'
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator
  } from 'react-native-indicators';


ExamplesRegistry.addComponentExample('Custom Activity Indicator', () =>
  <CustomActivityIndicator
    fetching
  />
)

export default class CustomActivityIndicator extends Component {
  static propTypes = {
    fetching: PropTypes.bool
  }

  render () {
    if (this.props.fetching) {
      return (
        <View style={{flex: 1, justifyContent: 'center', zIndex: 1}}>
          <WaveIndicator style={{
            flexGrow:1,
            height:null,
            width:null,
            alignItems: 'center',
            justifyContent:'center'
          }} />
        </View>
      )
    } else {
      return null
    }
  }
}