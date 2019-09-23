import React, {Component} from 'react';
import {View, TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import Camera from '../src/Camera';

export default class ReverseGeo extends Component<Props> {

    constructor(props) {
        // Required step: always call the parent class' constructor
        super(props);

        this.state = {
            isLoading: true,
            packages: [],
            address: ['']
        }
    }

    componentDidMount(){
        const key = 'FFYS2h73W7Ta3rtN2YQK3DIwK4Iig51X';
        // Current location coördinates from position object
        const latitude = global.lat;
        const longitude = global.lon;

        // Fetch reverse GeoCode API. Lat and lon is stringified, because otherwise it'll give an array of objects, which won't work. It has to be in a string for it to work, to complete this link.
        fetch('http://www.mapquestapi.com/geocoding/v1/reverse?key=' + key + '&location='+ JSON.stringify(latitude) +',' + JSON.stringify(longitude) + '&includeRoadMetadata=true&includeNearestIntersection=true')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    // Get first section in object results, than grab from the object locations the first section in the array and from there grab the street.
                    address: responseJson.results[0].locations[0].street,
                }, function(){

                });

            })
            .catch((error) =>{
                console.error(error);
            });
    }

    render() {
        // toString because the response in the address is an object, but I want to display it, so it got to be a string.
        const street = this.state.address.toString();

        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 2}}>
                    <ActivityIndicator />
                </View>
            )
        }
        global.street = street;
        return(
            <View style={{flex: 1, paddingTop:20}}>
                {/* Give state as props, so it can be reached from the Overview form. */}
                <Camera streetname={this.state.address}/>
                {/*<Text>{street}</Text>*/}
            </View>
        );
    }
}