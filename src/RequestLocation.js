import React, {Component} from 'react';
import {PermissionsAndroid} from 'react-native';

export async function requestLocationPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Locatie',
                message:
                    'Coole App heeft uw locatie nodig, ' +
                    'op deze manier wordt je locatie automatisch laten zien.',
                buttonNeutral: 'Vraag me later',
                buttonNegative: 'Nee',
                buttonPositive: 'Is goed',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can access the location');
        } else {
            console.log('Location permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
}

