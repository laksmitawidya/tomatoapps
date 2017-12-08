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



let data = [{
  value: 'Banana',
}, {
  value: 'Mango',
}, {
  value: 'Pear',
}];


class HomeScreen extends Component {
  constructor (props) {
    super(props)
    const ds = new ListView.DataSource({ 
      rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      categories: [],
      categoryName:'',
      categoryId: 0,
      dataSource: ds.cloneWithRows(['row 1', 'row 2']) 
    }
    
  }

  setupCategories () {
    if (!this.props.categoriesPayload) {
      this.props.categoriesRequest()
    } else {
      this.setState({
        categories: this.props.categoriesPayload.categories,
      })
    }
  }

  checkCategories (newProps) {
    if (newProps.categoriesPayload) {
      this.setState({
        categories: newProps.categoriesPayload.categories,
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
        {/* <View>
            <ListView 
            dataSource = { this.state.dataSource } 
            renderRow = { (rowData) => 
            <Text>  
              { rowData } 
            </Text> } 
            /> 
        </View> */}
        <View>
        {
          this.state.categories.map((cat, i) => {
          return (
          <Card
            key={i}
            title={cat.categories.name}
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