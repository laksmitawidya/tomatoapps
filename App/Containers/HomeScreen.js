import React, { Component } from 'react'
import { ScrollView, Image, View, Platform, Text, StyleSheet, ListView} from 'react-native'
import  HeaderComponents  from '../Components/HeaderComponent'
import  FooterComponent  from '../Components/FooterComponent'
import  CustomActivityIndicator  from '../Components/CustomActivityIndicator'
import { Images, Metrics, Colors } from '../Themes'
import { Dropdown } from 'react-native-material-dropdown'
import { SearchBar, Avatar, Card, Button} from 'react-native-elements'
import style from '../Components/Styles/TomatoStyles'
import {connect} from 'react-redux'
import TomatoActions from '../Redux/TomatoRedux'
import { Container, Header, Content, List, ListItem, Thumbnail, Body } from 'native-base';
import Config from '../Config/AppConfig'

class HomeScreen extends Component {
  constructor (props) {
    super(props)
    const ds = new ListView.DataSource({ 
      rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      categories: [],
      categoryName:'',
      categoryId: 0,
      dataSource: ds.cloneWithRows([]) 
    }
    
  }

  setupCategories () {
    if (!this.props.categoriesPayload) {
      this.props.categoriesRequest()
    } else {
      this.setState({
        categories: this.props.categoriesPayload.categories,
        dataSource: this.state.dataSource.cloneWithRows(this.props.categoriesPayload.categories)
      })
    }
  }

  checkCategories (newProps) {
    if (newProps.categoriesPayload) {
      this.setState({
        categories: newProps.categoriesPayload.categories,
        dataSource: this.state.dataSource.cloneWithRows(newProps.categoriesPayload.categories)
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
  _handleClick (navigate, category_id) {
    //Config.current_category_id=category_id
    navigate('CategoriesDetailScreen', {category_id:category_id})
      
    
  }

  renderRow(rowData){
    const { navigate } = this.props.navigation
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
            onPress={() => this._handleClick(navigate, rowData.categories.id)}
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
          <HeaderComponents onPress={() => this._handleStories(navigate)} text='TOMATO' textColor={Colors.snow} iconColor={Colors.snow} ></HeaderComponents>
            <View style={{margin : Metrics.doubleBaseMargin}}>
            <SearchBar
              lightTheme
              // onChangeText={someMethod}
              // onClearText={someMethod}
              placeholder='Type Here...' />
            </View>
        </View>
        <CustomActivityIndicator fetching={this.props.categoriesFetching}/>
        <View style={{marginLeft:20}}>
        <Text style={{fontWeight: 'bold', fontSize:20}}>
            {this.props.entity_id === 280 ? "New York" : "New Jersey"}
        </Text>
        </View>
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

HomeScreen.propTypes = {}

const mapStateToProps = (state) => {
  return {
    categoriesPayload: state.tomato.categoriesPayload,
    categoriesError: state.tomato.categoriesError,
    categoriesFetching: state.tomato.categoriesFetching,
    entity_id: state.tomato.entity_id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    categoriesRequest: () => dispatch(TomatoActions.categoriesRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)