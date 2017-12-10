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

  setupfilterByCity () {
    
  }

  checkCategories (newProps) {
    
  }

 
  componentWillMount () {
    // setup initial Categories if Redux exist
    this.props.filterByCityRequest(this.props.entity_id, this.props.navigation.category_id)
    
  }

  componentWillReceiveProps (newProps) {
    // check new Categories after request the categories
   
  }

  _handleStories (navigate) {
    navigate('HomeScreen')
  }
  _handleClick (navigate) {
    navigate('DetailScreen')
  }

  renderRow(rowData){
    if(!rowData){
      return (
        <View>Data Not Found</View>
      )
    } else{
      return (
        <Card
          title={rowData.categories.name}
          image={{uri:'http://lorempixel.com/400/200/food'}}>
          <Button
            onPress={() => this._handleClick(navigate)}
            icon={{name: 'restaurant'}}
            backgroundColor={Colors.blue}
            fontFamily='Lato'
            buttonStyle={style.btnHomeStyle}
            title='VIEW DETAILS' />
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
        <HeaderLeftComponents onPress={() => this._handleStories(navigate)} text='Hamburger' textColor={Colors.snow}></HeaderLeftComponents>        
        </View>
        <CustomActivityIndicator fetching={this.props.categoriesFetching}/>
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