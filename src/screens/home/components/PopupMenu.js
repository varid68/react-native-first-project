import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { UIManager, findNodeHandle } from 'react-native';
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ICON_SIZE = 24;

export default class PopupMenu extends Component {
  static propTypes = {
    // array of strings, will be list items of Menu
    actions: PropTypes.arrayOf(PropTypes.string).isRequired,
    onPress: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      icon: null
    };
  }

  onError() {
    console.log('Popup Error');
  }

  onPress = () => {
    if (this.state.icon) {
      UIManager.showPopupMenu(
        findNodeHandle(this.state.icon),
        this.props.actions,
        this.onError,
        this.props.onPress
      )
    }
  }


  onRef = icon => {
    if (!this.state.icon) {
      this.setState({ icon });
    }
  }


  render() {
    return (
      <Button transparent onPress={this.onPress}>
        <Icon
          name='more-vert'
          size={ICON_SIZE}
          color={'#fff'}
          ref={this.onRef} />
      </Button>
    );
  }

}