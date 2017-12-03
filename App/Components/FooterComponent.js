import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Container, Content, Footer, FooterTab, Button, Icon } from 'native-base';

export default class FooterComponent extends Component {
  static propTypes = {
    bgColor: PropTypes.string,
    onPressBtn1: PropTypes.func,
    onPressBtn2: PropTypes.func,
    onPressBtn3: PropTypes.func,
    onPressBtn4: PropTypes.func
  }
    render() {
        return (
                <Footer tabActiveBgColor={this.props.bgColor}>
                    <FooterTab>
                        <Button onPress={this.props.onPressBtn1}>
                            <Icon name='ios-apps-outline' />
                        </Button>
                        <Button onPress={this.props.onPressBtn2}>
                            <Icon name='ios-camera-outline' />
                        </Button>
                        <Button active onPress={this.props.onPressBtn2}>
                            <Icon name='ios-compass' />
                        </Button>
                        <Button onPress={this.props.onPressBtn3}>
                            <Icon name='ios-contact-outline' />
                        </Button>
                    </FooterTab>
                </Footer>
        );
    }
}