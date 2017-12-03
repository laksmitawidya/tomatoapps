import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import styles from './Styles/TomatoStyles'
import { Images, Colors } from '../Themes'
import PropTypes from 'prop-types'
import { Button, Icon, Header } from 'react-native-elements';
import  DropdownMenu from 'react-native-dropdown-menu'

export default class HeaderComponent extends Component {
  static propTypes = {
    text: PropTypes.string,
    bgColor: PropTypes.string,
    textColor:PropTypes.string,
    onPress: PropTypes.func
  }
    render () {
        return ( 
        <Header
          backgroundColor={this.props.bgColor}
          centerComponent={{ text: this.props.text, style: {fontSize: 18, color: this.props.textColor } }}
          rightComponent={<Icon onPress={this.props.onPress}  name='place' color={Colors.snow} />}
        /> 
        )
      }
      
  }
  
