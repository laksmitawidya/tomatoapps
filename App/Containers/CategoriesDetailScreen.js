import React, { Component } from 'react'
import { TouchableOpacity, ScrollView, Image, View, Platform, StyleSheet, ListView} from 'react-native'
import  HeaderLeftComponents  from '../Components/HeaderLeftComponent'
import  FooterComponent  from '../Components/FooterComponent'
import  CustomActivityIndicator  from '../Components/CustomActivityIndicator'
import { Images, Metrics, Colors } from '../Themes'
import { Dropdown } from 'react-native-material-dropdown'
//import { h1, SearchBar, Avatar, Card, Button} from 'react-native-elements'
import style from '../Components/Styles/TomatoStyles'
import {connect} from 'react-redux'
import TomatoActions from '../Redux/TomatoRedux'
import { Badge, H3, Container, Header, Content, Text,List, ListItem, Body,Card, CardItem, Thumbnail, Button, Icon, Left,  Right } from 'native-base';
import Config from '../Config/AppConfig'


class CategoriesDetailScreen extends Component {
  constructor (props) {
    super(props)
    const ds = new ListView.DataSource({ 
      rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      restaurant: [],
      dataSource: ds.cloneWithRows([]),
      category_id: null, 
      category_name:null
    }
    
  }

  setupFilterByCity () {
    const {state} = this.props.navigation;
    category_id=state.params.category_id
    category_name=state.params.category_name
    this.props.filterByCityRequest(this.props.entity_id, state.params.category_id)
    
  }

  checkRestaurant (newProps) {
      this.setState({
          restaurant: newProps.filterByCityPayload.restaurants,
          dataSource: this.state.dataSource.cloneWithRows(newProps.filterByCityPayload.restaurants)
      })
  }

 
  componentWillMount () {
    // setup initial data if Redux exist
    this.setupFilterByCity()
    
  }

  componentWillReceiveProps (newProps) {
    // check new Categories after request the categories
    this.checkRestaurant(newProps)
  }

  _handleStories (navigate) {
    navigate('HomeScreen')
  }
  _handleClick (navigate, res_id, category_id, category_name) {
    navigate('DetailScreen', {res_id:res_id, category_id:category_id,category_name:category_name})
  }

  renderRow(rowData){
    const { navigate } = this.props.navigation
    if(!rowData){
      return (
        <View>Data Not Found</View>
      )
    } else{
      return (
      <TouchableOpacity
        onPress={() => this._handleClick(navigate, rowData.restaurant.R.res_id, category_id, category_name)}
      >
        <Card>
            <CardItem>
              <Left>
                <Body>
                  <Text>{rowData.restaurant.name}</Text>
                  <Text note>{rowData.restaurant.cuisines}</Text>
                </Body>
              </Left>
              <Right>
                <Badge success>
                  <Text>{rowData.restaurant.user_rating.aggregate_rating}</Text>
                </Badge>
                <Text note>{rowData.restaurant.user_rating.rating_text}</Text>
              </Right>
            </CardItem>
            <CardItem cardBody>
              {rowData.restaurant.featured_image ? 
              <Image source={{uri:rowData.restaurant.featured_image}} style={{height: 200, width: null, flex: 1}}/> 
              : <Image source={Images.defaultImage} style={{height: 200, width: null, flex: 1}}/> }
            </CardItem>
            <CardItem>
                <Text note>{rowData.restaurant.location.address}</Text>
            </CardItem>
        </Card>
      </TouchableOpacity>
      );
      }
  }

  render () {
    const { navigate } = this.props.navigation
    return (
    <View style={{ flex:1 }}>
      <ScrollView>
        <View>
        <HeaderLeftComponents onPress={() => this._handleStories(navigate)} text={category_name} textColor={Colors.snow}></HeaderLeftComponents>        
        </View>
        <CustomActivityIndicator fetching={this.props.filterByCityFetching}/>
        <View>
            <ListView 
            dataSource = { this.state.dataSource } 
            renderRow = { this.renderRow.bind(this) }
            enableEmptySections ={true}
            /> 
        </View>
        </ScrollView>
        <View>
            <FooterComponent bgColor={Colors.maroon}></FooterComponent>
        </View>
      </View>

      )
  }
}

CategoriesDetailScreen.propTypes = {}

const mapStateToProps = (state) => {
  return {
    filterByCityPayload: state.tomato.filterByCityPayload,
    filterByCityError: state.tomato.filterByCityError,
    filterByCityFetching: state.tomato.filterByCityFetching,

    entity_id: state.tomato.entity_id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    filterByCityRequest: (entity_id, category_id) => dispatch(TomatoActions.filterByCityRequest(entity_id, category_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesDetailScreen)