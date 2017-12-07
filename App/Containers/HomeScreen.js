import React, { Component } from 'react'
import {ActivityIndicator, ScrollView, Image, View, Platform, Text, StyleSheet } from 'react-native'
import  HeaderComponents  from '../Components/HeaderComponent'
import  FooterComponent  from '../Components/FooterComponent'
import { Images, Metrics, Colors } from '../Themes'
import { Dropdown } from 'react-native-material-dropdown'
import { SearchBar, Avatar, ListItem, Card, Button, List} from 'react-native-elements'
import style from '../Components/Styles/TomatoStyles'
import {connect} from 'react-redux'
import TomatoActions from '../Redux/TomatoRedux'

let data = [{
  value: 'Banana',
}, {
  value: 'Mango',
}, {
  value: 'Pear',
}];
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


class HomeScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      categoryName:null,
      categoryId: 0
    }
  }

  setupCategories () {
    if (!this.props.categoriesPayload) {
      this.props.categoriesRequest()
    } else {
      this.setState({
        categoryName: this.props.categoriesPayload.category_name,
        categoryId: this.props.categoriesPayload.category_id
      })
    }
  }

  checkCategories (newProps) {
    if (newProps.categoriesPayload) {
      this.setState({
        categoryName: newProps.categoriesPayload.category_name,
        categoryId: newProps.categoriesPayload.category_id
      })
    }
  }

  componentWillMount () {
    // setup initial Categories if Redux exist
    this.setupCategories()
  }

  componentWillReceiveProps (newProps) {
    // check new Categories after request the categories
    this.checkCategories(newProps)
  }

  _handleStories (navigate) {
    navigate('CountryListScreen')
  }
  _handleClick (navigate) {
    navigate('DetailScreen')
  }
  render () {
    const { navigate } = this.props.navigation
    buttonsListArr = [];
    return (
    <View style={{ flex:1 }}>
      <ScrollView>
        <View>
          <HeaderComponents onPress={() => this._handleStories(navigate)} text='TOMATO' textColor={Colors.snow} iconColor={Colors.snow} ></HeaderComponents>
            <View style={{margin : Metrics.doubleBaseMargin}}>
            <SearchBar
              lightTheme
              // onChangeText={someMethod}
              // onClearText={someMethod}
              placeholder='Type Here...' />
            </View> 
        </View>
        <View>
        {
          users.map((user, i) => {
          return (
          <Card
            key={i}
            title={user.name}
            image={{uri:user.avatar}}>
            <Text style={{marginBottom: 10}}>
              {this.state.categoryName}
            </Text> 
            <ActivityIndicator fetching={this.props.categoriesFetching} />
            <Button
              onPress={() => this._handleClick(navigate)}
              icon={{name: 'restaurant'}}
              backgroundColor={Colors.blue}
              fontFamily='Lato'
              buttonStyle={style.btnHomeStyle}
              title='VIEW DETAILS' />
          </Card>
          );
          })
        }
        </View>
        </ScrollView>
        <View>
            <FooterComponent bgColor={Colors.maroon}></FooterComponent>
        </View>
      </View>

      )
  }
}

HomeScreen.propTypes = {}

const mapStateToProps = (state) => {
  return {
    categoriesPayload: state.tomato.categoriesPayload,
    categoriesError: state.tomato.categoriesError,
    categoriesFetching: state.tomato.categoriesFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    categoriesRequest: () => dispatch(TomatoActions.categoriesRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
