import React from 'react';
import { Modal, View, Text, PanResponder, Animated, Image, StyleSheet } from 'react-native';
import { Header, Body, Right, Button, Icon, H3, Content } from 'native-base';

export default class ModalContent extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
    };
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.modalContentVisible != this.props.modalContentVisible) {
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


  render() {

    return (
      <Modal
        animationType='slide'
        transparent={true}
        visible={this.props.modalContentVisible}
        onRequestClose={() => this.props.closeModal()}>

        <Animated.View style={this.getStyle()} {...this.panResponder.panHandlers}>
          <Header
            style={styles.header}
            androidStatusBarColor='#00897B'>
            <Body>
              <Text style={styles.headerText}>Tentang Aplikasi</Text>
            </Body>
            <Right>
              <Button
                transparent
                onPress={() => this.props.closeModal()}
                style={{ width: 60 }}>
                <Icon name='close' />
              </Button>
            </Right>
          </Header>

          <Content>
            <View style={styles.versionContainer}>
              <Image
                style={styles.image}
                source={require('../../../assets/logo.png')} />
              <View style={{ flex: 1 }}>
                <Text style={styles.versionTitle}>TerbitTerbenam</Text>
                <Text>versi 1.0.0</Text>
                <Text>dibuat oleh varid68@gmail.com</Text>
              </View>
            </View>

            <View style={styles.padder}>
              <H3 style={styles.teal}>Sunrise Sunset Api</H3>
              <Text>
                Aplikasi ini menggunakan Application Progamming Interface (API) untuk
                menghitung waktu matahari terbit dan terbenam yang tersedia di situs</Text>
              <Text style={[styles.teal, styles.underline]}>
                https://sunrise-sunset.org/api.
              </Text>
            </View>

            <View style={styles.padder}>
              <H3 style={styles.teal}>Bantuan</H3>
              <Text>
                Aplikasi Terbit Terbenam adalah aplikasi sederhana yang menampilkan waktu
                matahari terbit, waktu matahari terbenam, panjang waktu matahari bersinar,
                waktu terbit dan terbenam dalam skala sipil, waktu terbit dan terbenam dalam
                skala nautikal, dan Waktu terbit terbenam dalam skala astronomi dalam format waktu 24 Jam.
                Yang mana semuanya dihitung berdasarkan letak latitude dan longitude pengguna.
              </Text>
              <Text>{'\n'}</Text>
              <Text>
                Ini adalah Aplikasi pertama yang saya buat menggunakan React-native dengan tujuan sebagai hasil
                evaluasi belajar saya dan bukan ditujukan untuk di komersilkan, secara desain telah
                ada di play store bernama TerbitTerbenam yang dibuat Kodelokus Cipta Aplikasi.{'\n'}
              </Text>

              <Text style={styles.inspired}>Inspired by Rian Yulianto W</Text>
            </View>
          </Content>
        </Animated.View>
      </Modal>
    );
  }

}

const styles = StyleSheet.create({
  teal: {
    color: '#009688'
  },
  padder: {
    padding: 10
  },

  modalcontainer: {
    flex: 1,
    backgroundColor: '#fff'
  },

  header: {
    backgroundColor: '#009688',
  },
  headerText: {
    color: '#fff',
    fontSize: 19
  },

  versionContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10
  },
  versionTitle: {
    color: '#000',
    paddingBottom: 5,
    fontSize: 18
  },

  underline: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#009688'
  },

  inspired: {
    color: 'red',
    textAlign: 'center'
  }
});