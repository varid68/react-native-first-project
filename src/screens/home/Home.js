/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import { ToastAndroid, AsyncStorage, DatePickerAndroid } from 'react-native';

// IMPORT MODUL
import moment from 'moment';
import 'moment/locale/id';
import timeZone from 'moment-timezone';

// IMPORT COMPONENT CARD
import Header from './components/HomeHeader';
import FirstCard from './components/FirstCard';
import SecondCard from './components/SecondCard';

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      date: '',
      time: '',
      latitude: -6.278988,
      longitude: 107.128218,
      dateForApi: '',
      address: '',
      error: '',
      modalVisible: false
    };
  }


  static navigatorStyle = {
    navBarHidden: true
  }


  componentDidMount() {
    let now = moment().format('dddd, DD MMMM YYYY');
    this.setState({ date: now });
    this.getAddressFromLat(this.state.latitude, this.state.longitude);
    this.getTimeFromApi('today', this.state.latitude, this.state.longitude);
  }


  async getAddressFromLat(lat, long) {
    try {
      let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&location_type=ROOFTOP&result_type=street_address&key=AIzaSyDlZngBRmZCcDTQYPd9kmAYXAdWocr63cg`);
      let responseJson = await response.json();
      let array = responseJson.results[0].formatted_address.split(',');
      let y = '';
      for (let i = 0; i < array.length - 2; i++) {
        y = `${y}${array[i]},`;
      }
      let addressFinal = y.slice(0, -1);
      this.setState({ address: addressFinal });
    } catch (error) {
      console.error(error);
    }
  }


  async getTimeFromApi(dateForApi, lat, long) {
    try {
      this.setState({
        modalVisible: true
      });
      let response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}&date=${dateForApi}&formatted=0`);
      let responseJson = await response.json();

      let timeAfterConvert = () => {
        let preState = {};
        for (let key in responseJson.results) {
          if (key !== 'day_length') {
            let date = timeZone(responseJson.results[key]);
            let hasil = date.tz('Asia/Jakarta').format('HH:mm:ss');
            preState[key] = hasil;
          } else {
            let day_length = moment.utc(responseJson.results['day_length'] * 1000).format('HH:mm:ss');
            let split = day_length.split(':');
            let join = `${split[0]} jam ${split[1]} menit ${split[2]} detik`;
            preState.day_length = join;
          }
        }
        return preState;
      };
      this.setState({
        modalVisible: false,
        time: timeAfterConvert()
      });
    } catch (error) {
      console.error(error);
    }
  }


  async openPicker() {
    try {
      const { year, month, day } = await DatePickerAndroid.open({
        date: new Date()
      });
      let pickerDate = moment(`${day} ${month + 1} ${year}`, 'DD M YYYY').format('dddd, DD MMMM YYYY');
      if (pickerDate !== 'Invalid date') {
        this.setState({ date: pickerDate });
        let dateForApi = moment(`${day} ${month + 1} ${year}`, 'DD M YYYY').format('YYYY-MM-DD');
        this.setState({ dateForApi: dateForApi });
      } else {
        this.setState({ dateForApi: this.state.date });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  }


  async storeToStorage() {
    let { date, time, address } = this.state;
    let preStore = {
      date: date,
      time: time,
      address: address,
    };
    let isOnlyOne = await AsyncStorage.getItem('saved');
    if (isOnlyOne == null) {
      AsyncStorage.setItem('saved', JSON.stringify([preStore])).then(() => {
        ToastAndroid.showWithGravityAndOffset('Berhasil Menyimpan Waktu', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 100);
      });
    } else {
      let results = JSON.parse(isOnlyOne);
      let counter = 0;
      results.forEach((item) => {
        if (item.date == this.state.date) {
          ToastAndroid.showWithGravityAndOffset('Waktu ini telah tersimpan sebelumnya', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 100);
          counter++;
        }
      });

      if (counter == 0) {
        results.push(preStore);
        AsyncStorage.setItem('saved', JSON.stringify(results)).then(() => {
          ToastAndroid.showWithGravityAndOffset('Berhasil Menyimpan Waktu', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 100);
        });
      }
    }
  }


  setModalVisible(visible) {
    this.setState({
      modalVisible: visible
    });
  }


  toSavePage() {
    this.props.navigator.push({
      screen: 'page.SavePage',
      animated: true,
      animationType: 'slide-horizontal'
    });
  }


  render() {
    const { modalVisible, dateForApi, latitude, longitude, address, date, time } = this.state;

    return (
      <Container>
        <Header
          toSavePage={this.toSavePage.bind(this)}
          modalVisible={modalVisible} />

        <Content padder>
          <FirstCard
            dateForApi={dateForApi}
            latitude={latitude}
            longitude={longitude}
            address={address}
            date={date}
            getTimeFromApi={this.getTimeFromApi.bind(this)}
            openPicker={this.openPicker.bind(this)} />

          <SecondCard
            storeToStorage={this.storeToStorage.bind(this)}
            time={time}
            date={date} />
        </Content>
      </Container>
    );
  }

}
