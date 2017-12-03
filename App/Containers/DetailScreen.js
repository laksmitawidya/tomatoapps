import React, { Component } from 'react'
import { ScrollView, Image, View, Platform, Text, StyleSheet } from 'react-native'
import  HeaderLeftComponents  from '../Components/HeaderLeftComponent'
import  FooterComponent  from '../Components/FooterComponent'
import { Images, Metrics, Colors } from '../Themes'
import { Dropdown } from 'react-native-material-dropdown'
import { Card, SearchBar, Avatar, ListItem, Button, List} from 'react-native-elements'

const users = [
  {
    name: 'Soup',
    avatar: 'https://static.pexels.com/photos/2232/vegetables-italian-pizza-restarestaurant.jpg',
    description: 'The idea with React Native Elements is more about component structure than actual design.'
  },
  {
    name: 'Cream',
    avatar: 'https://static.pexels.com/photos/70497/pexels-photo-70497.jpeg',
    description: 'The idea with React Native Elements is more about component structure than actual design.'
  },
  {
    name: 'Coffee',
    avatar: 'https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg',
    description: 'The idea with React Native Elements is more about component structure than actual design.'
  }
]


export default class DetailScreen extends Component {
  _handleStories (navigate) {
    navigate('HomeScreen')
  }
  render () {
    const { navigate } = this.props.navigation
    return (
    <View style={{flex:1}}>
      <ScrollView>
        <View>
        <HeaderLeftComponents onPress={() => this._handleStories(navigate)} text='Hamburger' textColor={Colors.snow}></HeaderLeftComponents>
        </View>
        <View>
        <Card
          title='HELLO WORLD'
          image={{uri:users.avatar}}>
        </Card>
        </View>
        <List containerStyle={{margin: 10}}>
          {
            users.map((l, i) => (
              <ListItem
                roundAvatar
                avatar={{uri:l.avatar}}
                key={i}
                title={l.name}
                hideChevron={true}
              />
            ))
          }
        </List>
      </ScrollView>
      <View>
        <FooterComponent bgColor={Colors.maroon}></FooterComponent>
      </View>
    </View>
      )
  }
}

