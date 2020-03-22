import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import client from './ApolloClient';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <AppNavigator />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
