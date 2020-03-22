import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Post(props) {
  const { post, navigation, onPress } = props;
  const { title, link, imageUrl } = post;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress && onPress()}
    >
      {!!imageUrl && (
        <View style={{ flex: 2 }}>
          <Image style={styles.image} source={{ uri: imageUrl }} />
        </View>
      )}
      <View style={styles.footer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{link}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#dddddd'
  },
  image: {
    flex: 2,
    width: width,
    height: width / 2,
    resizeMode: 'cover'
  },
  footer: {
    flex: 0.5,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingVertical: 10
  },
  title: {
    color: '#161616',
    fontSize: 20
  },
  text: {
    color: '#161616',
    fontSize: 16
  }
});
