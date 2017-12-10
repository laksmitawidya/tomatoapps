import React, { Component } from 'react'
import { ScrollView, Image, View, Platform, Text, StyleSheet, ListView} from 'react-native'
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
    if (!this.props.filterByCityRequestPayload) {
        this.props.filterByCityRequest(this.props.entity_id, state.params.category_id)
      } else {
        this.setState({
          restaurant: this.props.filterByCityRequestPayload.restaurants,
          dataSource: this.state.dataSource.cloneWithRows(this.props.filterByCityPayload.restaurants)
        })
      }
  }

  checkRestaurant (newProps) {
    if (newProps.FilterByCityPayload) {
        this.setState({
          restaurant: newProps.FilterByCityPayload.restaurants,
          dataSource: this.state.dataSource.cloneWithRows(newProps.FilterByCityPayload.restaurants)
        })
      }
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
  _handleClick (navigate, rest_id) {
    navigate('DetailScreen', {rest_id:rest_id})
  }

  renderRow(rowData){
    console.log('Rowdata:'+ rowData);
    if(!rowData){
      return (
        <View>Data Not Found</View>
      )
    } else{
      return (
        <Card
          title={rowData.restaurant.name}
          image={{uri:rowData.restaurant.url}}
          >
          {/* onPress={() => this._handleClick(navigate, rowData.restaurant.id)} */}
          <Text>{rowData.restaurant.location.address}</Text>
          <Text>{rowData.restaurant.cuisines}</Text>
        </Card>
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
    filterByCityError: state.tomato.filterByCitysError,
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