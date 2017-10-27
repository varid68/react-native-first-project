import React from 'react';
import { Modal, View, Text, PanResponder, Animated, AsyncStorage, StyleSheet } from 'react-native';
import { Header, Body, Right, Button, Icon } from 'native-base';

export default class ModalContent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
    };
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.modalVisible != this.props.modalVisible) {
      this.state.pan.setOffset({ y: 270 });
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
    this.props.closeModal(false);
    this.props.getStorage();
  }


  render() {
    let { sunrise, sunset, solar_noon, day_length, civil_twilight_begin, civil_twilight_end,
      nautical_twilight_begin, nautical_twilight_end, astronomical_twilight_begin, astronomical_twilight_end } = this.props.terbit.time;

    let { date } = this.props.terbit;

    return (
      <Modal
        animationType='slide'
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => this.props.closeModal(false)}>

        <Animated.View style={this.getStyle()} {...this.panResponder.panHandlers}>
          {/* <View style={{ backgroundColor: '#fff', flex: 1 }}> */}
          <Header
            style={{ backgroundColor: '#009688' }}
            androidStatusBarColor='#00897B'>
            <Body>
              <Text style={{ color: '#fff', fontSize: 19 }}>Detail Waktu</Text>
            </Body>
            <Right>
              <Button
                transparent
                onPress={() => this.deleteItem(date)}
                style={{ width: 60, }}>
                <Icon name='trash' />
              </Button>
              <Button
                transparent
                style={{ width: 60 }}
                onPress={() => this.props.closeModal(false)}>
                <Icon name='close' />
              </Button>
            </Right>
          </Header>

          <View style={{ padding: 10, backgroundColor: '#fff' }}>
            <Text style={{ color: '#009688', fontSize: 16 }}>Tanggal Waktu Terbit Terbenam</Text>
            <Text style={{ marginBottom: 10 }}>{date}</Text>

            <Text style={{ color: '#009688', fontSize: 16 }}>Lokasi Pengecekan Waktu</Text>
            <Text style={{ marginBottom: 10 }}>{this.props.terbit.address}</Text>

            <View style={styles.lineView}>
              <Text style={styles.line}></Text>
            </View>

            <Text style={{ marginTop: 10 }}>Waktu Matahari Terbit</Text>
            <Text style={{ color: '#000' }}>{sunrise}</Text>

            <Text style={{ marginTop: 10 }}>Waktu Matahari Terbenam</Text>
            <Text style={{ color: '#000' }}>{sunset}</Text>

            <Text style={{ marginTop: 10 }}>Waktu Matahari Tepat di atas (Tengah Hari)</Text>
            <Text style={{ color: '#000' }}>{solar_noon}</Text>

            <Text style={{ marginTop: 10 }}>Panjang Waktu Matahari Bersinar</Text>
            <Text style={{ color: '#000' }}>{day_length}</Text>

            <Text style={{ marginTop: 10 }}>Waktu Civil Twilight Dimulai</Text>
            <Text style={{ color: '#000' }}>{civil_twilight_begin}</Text>

            <Text style={{ marginTop: 10 }}>Waktu Civil Twilight Berakhir</Text>
            <Text style={{ color: '#000' }}>{civil_twilight_end}</Text>

            <Text style={{ marginTop: 10 }}>Waktu Nautical Twilight Dimulai</Text>
            <Text style={{ color: '#000' }}>{nautical_twilight_begin}</Text>

            <Text style={{ marginTop: 10 }}>Waktu Nautical Twilight Berakhir</Text>
            <Text style={{ color: '#000' }}>{nautical_twilight_end}</Text>

            <Text style={{ marginTop: 10 }}>Waktu Astronomical Twilight Dimulai</Text>
            <Text style={{ color: '#000' }}>{astronomical_twilight_begin}</Text>

            <Text style={{ marginTop: 10 }}>Waktu Astronomical Twilight Berakhir</Text>
            <Text style={{ color: '#000' }}>{astronomical_twilight_end}</Text>

          </View>
          {/* </View> */}
        </Animated.View>
      </Modal>
    );
  }

}

const styles = StyleSheet.create({
  lineView: {
    flex: 1,
    flexDirection: 'row'
  },
  line: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderStyle: 'solid'
  }
});