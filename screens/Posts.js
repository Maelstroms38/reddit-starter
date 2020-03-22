import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Ionicons } from '@expo/vector-icons';
import Post from '../components/Post';

// Posts Query
const POSTS_QUERY = gql`
  query {
    posts {
      id
      title
      link
      imageUrl
    }
  }
`;
// Posts Subscription
const POSTS_SUBSCRIPTION = gql`
  subscription {
    postAdded {
      id
      title
      link
      imageUrl
    }
  }
`;

export default function Posts(props) {
  const { navigation } = props;
  const { subscribeToMore, loading, error, data } = useQuery(POSTS_QUERY, {
    variables: {}
  });

  // componentDidMount - alter the component upon initial load
  useEffect(() => {
    subscribeToMore({
      document: POSTS_SUBSCRIPTION,
      variables: {},
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const newPostData = subscriptionData.data.postAdded;
        return Object.assign({}, prev, {
          posts: [newPostData, ...prev.posts]
        });
      }
    });
  }, []);

  if (loading || error) {
    console.log(error);
    return <ActivityIndicator style={{ ...StyleSheet.absoluteFillObject }} />;
  }

  const { posts } = data;
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item, index }) => (
          <Post
            post={item}
            onPress={() => navigation.navigate('Detail', { post: item })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-around'
  }
});
