import React, { Component } from 'react'
import { ScrollView, Image, View, Platform, StyleSheet, TouchableOpacity } from 'react-native'
import  HeaderLeftComponents  from '../Components/HeaderLeftComponent'
import  FooterComponent  from '../Components/FooterComponent'
import { Images, Metrics, Colors } from '../Themes'
import { Dropdown } from 'react-native-material-dropdown'
//import { Card, SearchBar, Avatar, ListItem, Button, List} from 'react-native-elements'
import {connect} from 'react-redux'
import TomatoActions from '../Redux/TomatoRedux'
import StarRating from 'react-native-star-rating'
import { Label, Item, Badge, H3, Container, Header, Content, Text,List, ListItem, Body,Card, CardItem, Thumbnail, Button, Icon, Left,  Right } from 'native-base';


class DetailScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      restaurantDetail: [],
      category_id:null,
      category_name:null
    }
    
  }

  setupGetRestaurant () {
    const {state} = this.props.navigation;
    category_id=state.params.category_id
    category_name=state.params.category_name
    this.props.getRestaurantRequest(state.params.res_id)  
  }

  checkRestaurant (newProps) {;
      this.setState({
        restaurantDetail: newProps.getRestaurantPayload,
          // dataSource: this.state.dataSource.cloneWithRows(newProps.filterByCityPayload.restaurants)
      })
  }

 
  componentWillMount () {
    // setup initial data if Redux exist
    this.setupGetRestaurant()
  }

  componentWillReceiveProps (newProps) {
    // check new Categories after request the categories
    this.checkRestaurant(newProps)
  }

  _handleStories (navigate,category_id, category_name) {
    navigate('CategoriesDetailScreen', {category_id:category_id,category_name:category_name})
  }


  render () {
    const { navigate } = this.props.navigation
    return (
    <View style={{flex:1}}>
      <ScrollView>
        <View>
        <HeaderLeftComponents onPress={() => this._handleStories(navigate, category_id, category_name)} text={this.props.getRestaurantPayload.name} textColor={Colors.snow}></HeaderLeftComponents>
        </View>
        <View>
        <Card>
          <TouchableOpacity>
            <CardItem>
                {this.props.getRestaurantPayload.featured_image? 
                <Image source={{uri:this.props.getRestaurantPayload.featured_image}} style={{height: 200, width: null, flex: 1}}/> 
                : <Image source={Images.defaultImage} style={{height: 200, width: null, flex: 1}}/> }
            </CardItem>
          </TouchableOpacity>
          <CardItem>
            <Body>
              <Text uppercase>{this.props.getRestaurantPayload.name}</Text>
            </Body>
          </CardItem>  
          <CardItem>
            <Left>
              <Badge success>
                  <Text>{this.props.getRestaurantPayload.user_rating.aggregate_rating}</Text>
              </Badge>
              <Text uppercase note>{this.props.getRestaurantPayload.user_rating.rating_text}</Text>
            </Left>
            <Right>
              <Item>
                <Icon name='thumbs-up' />
                <Text note>{this.props.getRestaurantPayload.user_rating.votes}</Text>
              </Item>
            </Right>
          </CardItem>       
        </Card>
        <Card>
          <CardItem>
            <Body>
              <Text uppercase>Address</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text note>{this.props.getRestaurantPayload.location.address}</Text>
              <Text note>{this.props.getRestaurantPayload.location.locality}</Text>
              <Text note>{this.props.getRestaurantPayload.location.zipcode}</Text>
            </Body>
          </CardItem> 
        </Card>
        <Card>
          <CardItem>
            <Body>
              <Text uppercase>Info</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text note uppercase>Cuisines</Text>
              <Text>{this.props.getRestaurantPayload.cuisines}</Text>
              <Text note uppercase>Average Cost for Two</Text>
              <Text>{this.props.getRestaurantPayload.average_cost_for_two} {this.props.getRestaurantPayload.currency} for two (approx.)</Text>
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <Body>
              <Text uppercase>Facilities</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text note uppercase>Online Delivery</Text>
              {this.props.getRestaurantPayload.has_online_delivery===1? 
                 <Text> <Icon android='md-checkmark-circle' /> </Text>
              :  <Text> - </Text> }
              <Text note uppercase>Table Booking</Text>
              {this.props.getRestaurantPayload.has_table_booking===1? 
                 <Text> <Icon android='md-checkmark-circle' /> </Text>
              :  <Text> - </Text> }
              <Text note uppercase>Delivering Now</Text>
              {this.props.getRestaurantPayload.is_delivering_now===1? 
                 <Text> <Icon android='md-checkmark-circle' /> </Text>
              :  <Text> - </Text> }
              <Text note uppercase>Switch To Order Menu</Text>
              {this.props.getRestaurantPayload.switch_to_order_menu===1? 
                 <Text> <Icon android='md-checkmark-circle' /> </Text>
              :  <Text> - </Text> }
            </Body>
          </CardItem>
        </Card>
        </View>
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