import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Posts from '../screens/Posts';
import PostDetail from '../screens/PostDetail';
import PostForm from '../screens/PostForm';
import EditForm from '../screens/EditForm';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

// Navigation Container hosts app navigation context
// Stack Navigator hosts a collection of screens

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Posts"
          component={Posts}
          options={({ navigation }) => ({
            headerRight: props => (
              <Ionicons
                onPress={() => navigation.navigate('PostForm')}
                name="md-add"
                size={25}
                color={'#161616'}
                style={{
                  position: 'relative',
                  right: 20,
                  zIndex: 8
                }}
              />
            )
          })}
        />
        <Stack.Screen name="Detail" component={PostDetail} />
        <Stack.Screen name="PostForm" component={PostForm} />
        <Stack.Screen name="EditForm" component={EditForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
