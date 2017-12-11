import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity} from 'react-native'
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
          leftComponent={<TouchableOpacity onPress={this.props.onPress} ><Icon name='arrow-back' type='MaterialIcons' color={Colors.snow} /></TouchableOpacity>}
        /> 
        )
      }
      
  }
  
