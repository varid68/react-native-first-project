import React from 'react';
import { Header, Body, Right, Button, Icon } from 'native-base';
import { ActivityIndicator, Dimensions, Text, View, Modal, StyleSheet } from 'react-native';
import PopupMenu from './PopupMenu';
import ModalContent from './ModalContent';

export default class HomeHeader extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modalContentVisible: false
    };
  }


  onPopupEvent = (eventName, index) => {
    if (eventName !== 'itemSelected') return;
    if (index === 0) this.tentangAplikasi();
    else this.beriBintang();
  }


  tentangAplikasi = () => {
    this.setState({
      modalContentVisible: true
    });
  }


  beriBintang = () => {
    alert('If you have any trouble while using this application, feel free to get in touch with me on email');
  }


  closeModal() {
    this.setState({
      modalContentVisible: false
    });
  }


  render() {
    return (
      <Header
        style={{ backgroundColor: '#009688' }}
        androidStatusBarColor='#00897B'>

        <Body>
          <Text style={{ color: '#fff', fontSize: 19 }}>Waktu Matahari</Text>
          <Text style={{ color: '#fff' }}>Terbit dan Terbenam</Text>
        </Body>

        <Right>
          <Button
            transparent
            onPress={() => this.props.toSavePage()}>
            <Icon name='time' />
          </Button>
          <PopupMenu
            actions={['Tentang aplikasi', 'Beri bintang 5']}
            onPress={this.onPopupEvent} />

          <ModalContent
            modalContentVisible={this.state.modalContentVisible}
            closeModal={this.closeModal.bind(this)} />
          <Modal
            animationType='fade'
            transparent={true}
            visible={this.props.modalVisible}
            onRequestClose={() => { console.log('Modal has been closed.'); }}>

            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                  <View style={{ flex: 1 }}>
                    <ActivityIndicator size='large' />
                  </View>
                  <Text style={{ flex: 2.5, color: '#555' }}>Memperbaharui waktu matahari terbit dan terbenam...</Text>
                </View>
              </View>
            </View>
          </Modal>

        </Right>
      </Header>
    );
  }

}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#00000080',
    alignItems: 'center',
  },

  modalContent: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').width * 0.25,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 3
  }
});