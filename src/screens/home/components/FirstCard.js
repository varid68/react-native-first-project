import React from 'react';
import { Card, CardItem, Body, Button } from 'native-base';
import { View, Text, StyleSheet } from 'react-native';

export const FirstCard = ({ date, address, dateForApi, latitude, longitude, openPicker, getTimeFromApi }) => {

  return (
    <Card>
      <CardItem style={styles.card}>
        <Body>
          <Text>Tanggal Pengecekan Waktu</Text>
          <View style={styles.tanggalView}>
            <Text style={styles.tanggalText}>{date}</Text>
          </View>
          <Text>Lokasi tempat anda berada</Text>
          {address ? <Text style={{ color: '#000' }}>{address}</Text> : <Text>-</Text>}
          <View style={styles.lineView}>
            <Text style={styles.line}></Text>
          </View>
          <View style={styles.buttonCardTop}>
            <Button
              transparent
              onPress={() => getTimeFromApi(dateForApi, latitude, longitude)}>
              <Text style={{ color: '#FFC107' }}>CEK WAKTU</Text>
            </Button>
            <Button
              transparent
              onPress={() => openPicker()}>
              <Text style={{ color: '#FFC107' }}>SETEL TANGGAL</Text>
            </Button>
          </View>
        </Body>
      </CardItem>
    </Card>
  );
};

export default FirstCard;

const styles = StyleSheet.create({
  card: {
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10
  },

  tanggalView: {
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#f5f5f5'
  },
  tanggalText: {
    flex: 1,
    color: '#000'
  },

  buttonCardTop: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end'
  },

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