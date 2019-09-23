import React, {Component} from 'react';

import { Root } from "native-base";

import Rommel from './categories/Rommel';
import Defect from './categories/Defect';
import Klimaat from './categories/Klimaat';
import Wifi from './categories/Wifi';
import Overig from './categories/Overig';

import Home from './src/Home';
import Camera from './src/Camera';

import {createAppContainer, createBottomTabNavigator, createStackNavigator} from "react-navigation";

const TabNavigator = createBottomTabNavigator(
    {
        Home: Home,
        Rommel: Rommel,
        Defect: Defect,
        Klimaat: Klimaat,
        Wifi: Wifi,
        Overig: Overig,
    }
);

const AppNavigator = createStackNavigator(
    {
        Camera: Camera,
        Categories: TabNavigator,
    },
    {
        initialRouteName: "Categories",
        headerMode: 'none'
    }
);


export default createAppContainer(AppNavigator, TabNavigator, <Root><AppNavigator /></Root>);