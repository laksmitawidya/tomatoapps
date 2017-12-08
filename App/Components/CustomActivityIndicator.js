import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator, View } from 'react-native'
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

// Note that this file (App/Components/RoundedButton) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
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
          <MaterialIndicator />
      )
    } else {
      return null
    }
  }
}