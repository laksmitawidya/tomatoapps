import React, { Component } from 'react'
import { ScrollView, Image, View, Platform, Text, StyleSheet } from 'react-native'
import  HeaderLeftComponents  from '../Components/HeaderLeftComponent'
import  FooterComponent  from '../Components/FooterComponent'
import { Images, Metrics, Colors } from '../Themes'
import { Dropdown } from 'react-native-material-dropdown'
import { Card, SearchBar, Avatar, ListItem, Button, List} from 'react-native-elements'
import {connect} from 'react-redux'
import TomatoActions from '../Redux/TomatoRedux'

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


class DetailScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      restaurantDetail: []
    }
    
  }

  setupFilterByCity () {
    // const {state} = this.props.navigation;
    // this.props.filterByCityRequest(this.props.entity_id, state.params.category_id)
      
  }

  checkRestaurant (newProps) {
      // this.setState({
      //     restaurant: newProps.filterByCityPayload.restaurants,
      //     dataSource: this.state.dataSource.cloneWithRows(newProps.filterByCityPayload.restaurants)
      // })
  }

 
  componentWillMount () {
    // setup initial data if Redux exist
    const {state} = this.props.navigation;
    console.log('res_id: '+state.params.res_id);
    this.props.getRestaurantRequest(state.params.res_id)
    
  }

  componentWillReceiveProps (newProps) {
    // check new Categories after request the categories
    // this.checkRestaurant(newProps)
  }

  _handleStories (navigate) {
    navigate('CategoriesDetailScreen')
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

DetailScreen.propTypes = {}

const mapStateToProps = (state) => {
  return {
    getRestaurantPayload: state.tomato.getRestaurantPayload,
    getRestaurantError: state.tomato.getRestaurantError,
    getRestaurantFetching: state.tomato.getRestaurantFetching,

    res_id: state.tomato.res_id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRestaurantRequest: (res_id) => dispatch(TomatoActions.getRestaurantRequest(res_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailScreen)