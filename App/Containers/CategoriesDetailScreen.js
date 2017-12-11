import React, { Component } from 'react'
import { TouchableOpacity, ScrollView, Image, View, Platform, Text, StyleSheet, ListView} from 'react-native'
import  HeaderLeftComponents  from '../Components/HeaderLeftComponent'
import  FooterComponent  from '../Components/FooterComponent'
import  CustomActivityIndicator  from '../Components/CustomActivityIndicator'
import { Images, Metrics, Colors } from '../Themes'
import { Dropdown } from 'react-native-material-dropdown'
import { h1, SearchBar, Avatar, Card, Button} from 'react-native-elements'
import style from '../Components/Styles/TomatoStyles'
import {connect} from 'react-redux'
import TomatoActions from '../Redux/TomatoRedux'
import { Container, Header, Content, List, ListItem, Thumbnail, Body } from 'native-base';
import Config from '../Config/AppConfig'


class CategoriesDetailScreen extends Component {
  constructor (props) {
    super(props)
    const ds = new ListView.DataSource({ 
      rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      restaurant: [],
      dataSource: ds.cloneWithRows([]) 
    }
    
  }

  setupFilterByCity () {
    const {state} = this.props.navigation;
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
  _handleClick (navigate, res_id) {
    console.log('Restaurannn hai :' +res_id);
    navigate('DetailScreen', {res_id:res_id})
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
        onPress={() => this._handleClick(navigate, rowData.restaurant.R.res_id)}
      >
        <Card
          title={rowData.restaurant.name}
          image={{uri:rowData.restaurant.featured_image}}>
          <Text>{rowData.restaurant.location.address}</Text>
          <Text>{rowData.restaurant.cuisines}</Text>
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
        <HeaderLeftComponents onPress={() => this._handleStories(navigate)} text='Restaurant' textColor={Colors.snow}></HeaderLeftComponents>        
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