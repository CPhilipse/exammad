import React, {Component} from 'react';
import {FlatList, ActivityIndicator, Text, View, Button, ImageBackground, Alert} from 'react-native';
import Mailer from "react-native-mail";
import store from "react-native-simple-store";

export default class Wifi extends Component<Props> {
    constructor(props) {
        // Required step: always call the parent class' constructor
        super(props);

        this.state = {
            isLoading: true,
            wifi: false,
            store: ['']
        }
    }

    handleEmail = () => {
        Mailer.mail({
            subject: 'Email incident',
            recipients: ['concierge@example.com'],
            ccRecipients: ['supportCC@example.com'],
            bccRecipients: ['supportBCC@example.com'],
            body: '<b>A Bold Body</b>',
            isHTML: true,
            attachment: {
                path: '',  // The absolute path of the file from which to read data.
                type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
                name: '',   // Optional: Custom filename for attachment
            }
        }, (error, event) => {
            Alert.alert(
                error,
                event,
                [
                    {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
                    {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
                ],
                { cancelable: true }
            )
        });
    };

    componentDidMount(){


        // const climate = global.ress.find(incident => incident.category === 'wifi');
        // if (climate.category === 'wifi') {
        //     this.setState({
        //         wifi: true,
        //     })
        // }
    }

    renderWifi = () => {
        store.get('incidents')
            .then((res) =>
                    this.setState({store: res})
            );
        // console.log(this.state.store);
        console.log('OUTER WIFI');
        this.state.store.forEach((element, index, array) => {
            // If an object has the value of wifi show all the values of that object which has a value with wifi.
            if (element.category === 'wifi') {
                console.log('WIFI, ERROR, why?');
                return(
                    <View>
                        <ImageBackground style={styles.previewResults} source={{ uri: element.path }}/>
                        <Text>TEST</Text>
                        <Text
                            style={{width: 250, borderColor: '#858585', borderWidth: 1, marginLeft: 20, backgroundColor: '#cdb3f8'}}>
                            {element.body}
                        </Text>
                        <Text style={{width: 250, borderColor: '#858585', borderWidth: 1, marginLeft: 20, backgroundColor: '#cdb3f8', height: 50}}>
                            {element.address}, {element.city}
                        </Text>
                        <Text style={{width: 250, borderColor: '#858585', borderWidth: 1, marginLeft: 20, backgroundColor: '#cdb3f8', height: 50}}>
                            {element.category}
                        </Text>
                        <Button
                            onPress={this.handleEmail}
                            title="Email incident"
                            color="#841584"
                            accessabilityLabel="Purple Email Me Button"
                        />
                    </View>
                )
            }
        });
    }

    render() {
        return (
            <View>
                {this.state.wifi === false ? this.renderWifi : alert('Er zijn geen wifi incidenten.')}
            </View>
        );
    }
}



