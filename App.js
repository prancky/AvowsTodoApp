/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import FlashMessage from 'react-native-flash-message';

import AuthNavigation from './src/navigations/NavigationContainer';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store/store';

function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <AuthNavigation />
          </NavigationContainer>
          <FlashMessage position="bottom" duration={4500} icon="auto" />
        </PersistGate>
      </PaperProvider>
    </Provider>
  );
}

export default App;
