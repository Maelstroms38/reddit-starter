import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  Alert
} from 'react-native';
import RoundedButton from '../components/RoundedButton';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const { width } = Dimensions.get('window');

const EDIT_POST = gql`
  mutation EditPost(
    $id: ID!
    $title: String!
    $link: String!
    $imageUrl: String!
  ) {
    editPost(id: $id, title: $title, link: $link, imageUrl: $imageUrl) {
      id
      title
      link
      imageUrl
    }
  }
`;

export default function EditForm({ route, navigation }) {
  const { params } = route;
  const { post } = params;
  const { id } = post;
  const [editPost] = useMutation(EDIT_POST);
  const [title, setTitle] = useState(post.title);
  const [link, setLink] = useState(post.link);
  const [imageUrl, setImageUrl] = useState(post.imageUrl);
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View>
          <Text>Title</Text>
          <TextInput
            onChangeText={text => setTitle(text)}
            value={title}
            placeholder="Title"
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.input}
            autoFocus
          />
        </View>
        <View>
          <Text>Link</Text>
          <TextInput
            onChangeText={text => setLink(text)}
            value={link}
            placeholder="Link"
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.input}
          />
        </View>
        <View>
          <Text>Image Url</Text>
          <TextInput
            onChangeText={text => setImageUrl(text)}
            value={imageUrl}
            placeholder="Image URL"
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.input}
          />
        </View>
      </View>
      <RoundedButton
        text="Edit Post"
        textColor="#fff"
        backgroundColor="rgb(75, 148, 214)"
        onPress={() => {
          editPost({ variables: { id, title, link, imageUrl } })
            .then(() =>
              navigation.navigate('Detail', {
                post: { id, title, link, imageUrl }
              })
            )
            .catch(err => console.log(err));
        }}
        icon={
          <Ionicons
            name="md-checkmark-circle"
            size={20}
            color="#fff"
            style={styles.saveIcon}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  inputContainer: {
    flex: 0.4,
    justifyContent: 'space-around'
  },
  saveIcon: {
    position: 'relative',
    left: 20,
    zIndex: 8
  },
  input: {
    width: width - 40,
    height: 40,
    borderBottomColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  image: {
    width,
    height: width,
    resizeMode: 'cover'
  }
});
