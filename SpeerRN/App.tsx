/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchScreen, {UserObject} from './screens/Search';
import ProfileScreen from './screens/Profile';
import FollowScreen from './screens/Follow';
import {ThemeProvider, Icon} from '@rneui/themed';
import {colorPrimary, theme} from './utils/theme';

interface userParam {
  user: UserObject;
}

export type RootStackParamList = {
  Search: undefined;
  Profile: userParam;
  Follow: {login: string; type: string; url: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const defaultNavOptions = {
  title: 'GitHub User Search App',
  headerStyle: {
    backgroundColor: colorPrimary,
  },
  headerTitleStyle: {
    fontSize: 22,
  },
  headerBackTitleVisible: false,
  headerTintColor: 'white',
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={defaultNavOptions}>
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={({navigation}) => ({
              headerRight: () => (
                <Icon
                  size={30}
                  color="white"
                  type="material"
                  name="search"
                  onPress={() => navigation.navigate('Search')}
                />
              ),
            })}
          />
          <Stack.Screen name="Follow" component={FollowScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
