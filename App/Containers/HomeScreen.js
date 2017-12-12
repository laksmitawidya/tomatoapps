import React, { Component } from 'react'
import { ImageBackground, TouchableOpacity, ScrollView, Image, View, Platform, StyleSheet, ListView} from 'react-native'
import  HeaderComponents  from '../Components/HeaderComponent'
import  FooterComponent  from '../Components/FooterComponent'
import  CustomActivityIndicator  from '../Components/CustomActivityIndicator'
import { Images, Metrics, Colors } from '../Themes'
import { Dropdown } from 'react-native-material-dropdown'
import style from '../Components/Styles/TomatoStyles'
import {connect} from 'react-redux'
import TomatoActions from '../Redux/TomatoRedux'
import { Item, Picker, Body, Container, Header, Content, Card, CardItem, Text, Icon, Right } from 'native-base';
import { Icon as IconTwo } from 'react-native-elements';
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
      dataSource: ds.cloneWithRows([]),
      selected: "280"
    }

  }

  onValueChange(value) {
    this.setState({
      selected: value
    });
    this.props.switchEntity(value)
  }


  setupCategories () {
    if (!this.props.categoriesPayload) {
      this.props.categoriesRequest()
    } else {
      this.setState({
        categories: this.props.categoriesPayload.categories,
        dataSource: this.state.dataSource.cloneWithRows(this.props.categoriesPayload.categories)
      })

      // check the entity id is changed or not from city picker list
      if(this.props.entity_id){
        this.setState({
          selected: this.props.entity_id.toString(),
        })
      }
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

  _handleCountryList (navigate) {
    //Config.current_category_id=category_id
    navigate('CountryListScreen')
  }

  _handleClick (navigate, category_id, category_name) {
    //Config.current_category_id=category_id
    navigate('CategoriesDetailScreen', {category_id:category_id, category_name:category_name})
  }

  renderRow(rowData){
    const { navigate } = this.props.navigation
    if(!rowData){
      return (
        <View>Data Not Found</View>
      )
    } else{
      return (
        <TouchableOpacity onPress={() => this._handleClick(navigate, rowData.categories.id, rowData.categories.name)}>
          <Card>
            <CardItem>
              <Icon name="restaurant" style={{fontSize: 20, color: Colors.blue}} />
              <Text>{rowData.categories.name}</Text>
             </CardItem>
           </Card>
        </TouchableOpacity>
        );
      }
  }

  // find City With id return String of the city name
  findCityWithCityId(id){
    if(id.toString() === "280"){
      return "New York"
    }else{
      return "New Jersey"
    }
  }

  render () {
    const { navigate } = this.props.navigation
    return (
    <View style={{ flex:1 }}>
      <ScrollView>
        <View>
          <HeaderComponents text="TOMATO" textColor={Colors.snow} onPress={()=>this._handleCountryList(navigate)} iconColor={Colors.snow} ></HeaderComponents>
        </View >
        <CustomActivityIndicator fetching={this.props.categoriesFetching}/>
        <View style={{margin:10}}>
          <View style={{flexDirection: 'row'}}>
            <Picker
              mode="dropdown"
              iosHeader="Select one"
              headerBackButtonText="Back"
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}>
              <Item label="New York" value="280" />
              <Item label="New Jersey" value="3959" />
            </Picker>
            <IconTwo name='caret-down'
                     type='font-awesome' color={Colors.blue} />
          </View>
          <ListView
              dataSource = { this.state.dataSource }
              renderRow = {this.renderRow.bind(this)}
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
    categoriesRequest: () => dispatch(TomatoActions.categoriesRequest()),
    switchEntity: (id) => dispatch(TomatoActions.switchEntity(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
