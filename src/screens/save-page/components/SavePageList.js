import React from 'react';
import { List, ListItem, Left, Body } from 'native-base';
import { View, Text, StyleSheet } from 'react-native';

// IMPORT COMPONENT MODAL DETAIL TIME SAVED
import ModalContent from './ModalContent';

export default class SavePagelist extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      indexList: '',
    };
  }


  getDay(fullDate) {
    let split = fullDate.split(', ');
    let day = split[1].split(' ');
    return day[0];
  }


  getMonth(fullDate) {
    let split = fullDate.split(', ');
    let month = split[1].split(' ');
    if (month[1].length >= 5) return month[1].substring(0, 5);
    return month[1];
  }


  setModalVisible(visible, indexList) {
    this.setState({
      modalVisible: visible,
      indexList: indexList,
    });
  }


  render() {
    const { datas } = this.props;

    return (
      <View>
        <List
          dataArray={datas}
          renderRow={(data, x, index) =>
            <ListItem
              button
              avatar
              style={styles.list}
              onPress={() => this.setModalVisible(true, index)}>

              <Left>
                <View style={styles.boxColor}>
                  <Text style={styles.dateInBox}>{this.getDay(data.date)}</Text>
                  <Text style={styles.monthInBox}>{this.getMonth(data.date)}</Text>
                </View>
              </Left>
              <Body>
                <Text style={styles.titleList}>Catatan waktu untuk {data.date}</Text>
                <View style={styles.descTime}>
                  <View style={{ flex: 0 }}>
                    <Text style={{ paddingBottom: 2 }} note>waktu terbit </Text>
                    <Text note>waktu terbenam</Text>
                  </View>
                  <View style={{ flex: 0 }}>
                    <Text style={{ fontSize: 15, marginLeft: -10, color: '#333' }}>{data.time.sunrise}</Text>
                    <Text style={{ fontSize: 15, color: '#333', marginLeft: 10 }}>{data.time.sunset}</Text>
                  </View>
                </View>
              </Body>
            </ListItem>}
        />

        <ModalContent
          modalVisible={this.state.modalVisible}
          closeModal={this.setModalVisible.bind(this)}
          indexList={this.state.indexList}
          datas={datas}
          getStorage={this.props.getStorage} />

      </View>
    );
  }

}


const styles = StyleSheet.create({
  list: {
    backgroundColor: '#fafafa',
    marginLeft: 10,
    marginTop: -5,
  },

  boxColor: {
    flex: 0,
    flexDirection: 'column',
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f57f17',
    borderRadius: 3
  },
  dateInBox: {
    flex: 1.2,
    fontSize: 22,
    paddingTop: 3,
    color: '#fff'
  },
  monthInBox: {
    flex: 1,
    color: '#fff'
  },

  titleList: {
    fontSize: 14,
    color: '#000'
  },
  descTime: {
    flex: 0,
    flexDirection: 'row'
  }
});
