import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Home } from '../screens';
import { HOME } from './routes';

const Drawer = createDrawerNavigator();

const HomeStack: React.FC = () => (
  <Drawer.Navigator>
    <Drawer.Screen name={HOME} component={Home} />
  </Drawer.Navigator>
);

export default HomeStack;
