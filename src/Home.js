import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Alert, StatusBar,} from 'react-native';
import Camera from './Camera';
import {requestLocationPermission} from "./RequestLocation";
import Geolocation, {} from "react-native-geolocation-service";

export default class Home extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount(){
        requestLocationPermission().then( () => {
                // Instead of navigator.geolocation, just use Geolocation.
                Geolocation.getCurrentPosition(
                    (position) => {
                        console.log(position);
                        // Global variables so that it can be reached from the incident to reverse code these coördinates
                        global.lon = position.coords.longitude;
                        global.lat = position.coords.latitude;
                    },
                    (error) => {
                        // See error code charts below.
                        console.log(error.code, error.message);
                    },
                    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
                );

                this.setState({
                    isLoading: false,
                }, function(){

                });
            }
        );
    }

    render() {
        // Alert for giving granted permission for external storage.
        // TODO: Don't show it anymore when click on 'Al gedaan'. | Probably external library.
        Alert.alert(
            'Zelf toegang geven.',
            'Deze app heeft toegang nodig tot uw externe opslag, wegens bepaalde redenen moet u zelf die toegang verlenen.',
            [
                {text: 'Vraag me later', onPress: () => console.log('Ask me later pressed')},
                {
                    text: 'Al gedaan',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'Zal ik doen', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
        );
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.ActionButton} onPress={() => this.props.navigation.navigate('Camera')}>
                    <Text style={styles.ActionButtonText}>Incident aangeven</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

