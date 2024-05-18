import * as React from 'react';
import {I18nextProvider} from 'react-i18next';
import {StyleSheet} from 'react-native';
import getI18n from './utils/getI18n';
import RootNavigation from './navigation/RootNavigation';
import {Provider} from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={getI18n()}>
        <RootNavigation />
      </I18nextProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
