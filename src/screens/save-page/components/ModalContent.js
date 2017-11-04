import React from 'react';
import { Modal, View, Text, PanResponder, Animated, AsyncStorage, StyleSheet } from 'react-native';
import { Header, Body, Right, Button, Icon } from 'native-base';

export default class ModalContent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      datas: []
    };
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.modalVisible != this.props.modalVisible) {
      this.state.pan.setOffset({ y: 270 });
    }

    if (nextProps.modalVisible) {
      this.setState({
        datas: this.props.datas[nextProps.indexList]
      });
    }
  }


  componentWillMount() {
    this.state.pan.setOffset({ y: 270 });
    this._animatedValueY = 0;
    this.state.pan.y.addListener((value) => {
      this._animatedValueY = value.value;
    });

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanresponderGrant: () => {
        this.state.pan.setValue({ y: 0 });
      },
      onPanResponderMove: Animated.event([
        null, { dy: this.state.pan.y },
      ]),
      onPanResponderRelease: () => {
        this.state.pan.setOffset({ y: this._animatedValueY });
        this.state.pan.setValue({ y: 0 });
      }
    });
  }


  componentWillUnmount() {
    this.state.pan.y.removeAllListeners();
  }


  getStyle() {
    return [styles.modalcontainer, {
      transform: [
        { translateY: this.state.pan.y },
      ]
    }];
  }


  async deleteItem(date) {
    let saved = await AsyncStorage.getItem('saved');
    let savedAsJson = JSON.parse(saved);
    if (savedAsJson.length == 1) AsyncStorage.removeItem('saved');
    else {
      savedAsJson.forEach((item, index) => {
        if (item.date == date) {
          savedAsJson.splice(index, 1);
          AsyncStorage.setItem('saved', JSON.stringify(savedAsJson));
        }
      });
    }
    this.props.closeModal(false, 0);
    this.props.getStorage();
  }


  displayTime(filterKey) {
    const result = Object.keys(this.state.datas).filter((key) => {
      return (key === 'time');
    }).map(() => {
      return this.state.datas.time[filterKey];
    });

    return result;
  }


  render() {
    return (
      <Modal
        animationType='slide'
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => this.props.closeModal(false, 0)}>

        <Animated.View style={this.getStyle()} {...this.panResponder.panHandlers}>
          <Header
            style={{ backgroundColor: '#009688' }}
            androidStatusBarColor='#00897B'>
            <Body>
              <Text style={{ color: '#fff', fontSize: 19 }}>Detail Waktu</Text>
            </Body>
            <Right>
              <Button
                transparent
                onPress={() => this.deleteItem(this.state.datas.date)}
                style={{ width: 60, }}>
                <Icon name='trash' />
              </Button>
              <Button
                transparent
                style={{ width: 60 }}
                onPress={() => this.props.closeModal(false, 0)}>
                <Icon name='close' />
              </Button>
            </Right>
          </Header>

          <View style={{ backgroundColor: '#fff', padding: 10 }}>
            <Text style={{ color: '#009688' }}>Waktu Terbit Terbenam</Text>
            <Text style={{ fontSize: 16 }}>{this.state.datas.date}</Text>
            <View style={styles.lineView}>
              <Text style={styles.line}></Text>
            </View>
            <Text style={{ marginTop: 20 }}>Waktu Matahari Terbit</Text>
            <Text style={{ color: '#000' }}>{this.displayTime('sunrise')}</Text>

            <Text style={{ marginTop: 15 }}>Waktu Matahari Terbenam</Text>
            <Text style={{ color: '#000' }}>{this.displayTime('sunset')}</Text>

            <Text style={{ marginTop: 15 }}>Waktu Matahari Tepat di atas (Tengah Hari)</Text>
            <Text style={{ color: '#000' }}>{this.displayTime('solar_noon')}</Text>

            <Text style={{ marginTop: 15 }}>Panjang Waktu Matahari Bersinar</Text>
            <Text style={{ color: '#000' }}>{this.displayTime('day_length')}</Text>

            <Text style={{ marginTop: 15 }}>Waktu Civil Twilight Dimulai</Text>
            <Text style={{ color: '#000' }}>{this.displayTime('civil_twilight_begin')}</Text>

            <Text style={{ marginTop: 15 }}>Waktu Civil Twilight Berakhir</Text>
            <Text style={{ color: '#000' }}>{this.displayTime('civil_twilight_end')}</Text>

            <Text style={{ marginTop: 15 }}>Waktu Nautical Twilight Dimulai</Text>
            <Text style={{ color: '#000' }}>{this.displayTime('nautical_twilight_begin')}</Text>

            <Text style={{ marginTop: 15 }}>Waktu Nautical Twilight Berakhir</Text>
            <Text style={{ color: '#000' }}>{this.displayTime('nautical_twilight_end')}</Text>

            <Text style={{ marginTop: 15 }}>Waktu Astronomical Twilight Dimulai</Text>
            <Text style={{ color: '#000' }}>{this.displayTime('astronomical_twilight_begin')}</Text>

            <Text style={{ marginTop: 15 }}>Waktu Astronomical Twilight Berakhir</Text>
            <Text style={{ color: '#000' }}>{this.displayTime('astronomical_twilight_end')}</Text>
          </View>
        </Animated.View>
      </Modal>
    );
  }

}

const styles = StyleSheet.create({
  lineView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10
  },
  line: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderStyle: 'solid'
  }
});
