import React, {Component} from 'react';
import {Text, View, Button, ImageBackground, Alert} from 'react-native';
import Mailer from "react-native-mail";
import store from "react-native-simple-store";

export default class Overig extends Component<Props> {
    constructor(props) {
        // Required step: always call the parent class' constructor
        super(props);

        this.state = {
            isLoading: true,
            packages: [],
            overig: false,
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

    }

    renderOverig () {
        store.get('incidents')
            .then((res) =>
                this.setState({store: res})
            );
        console.log(global.ress);
        console.log('test');
        global.ress.forEach((element, index, array) => {
            // If an object has the value of overig show all the values of that object which has a value with overig.
            if (element.category === 'overig') {
                console.log('I\'M IN');
                global.ad = element.address;
                global.bo = element.body;
                global.ci = element.city;
                global.pa = element.path;
                global.cat = element.category;
                this.returnForm();
            }
            console.log(element.category, 'test1'); // values
            console.log(index, 'test2'); // 0, 1, 2
            console.log(array, 'test3'); // same myArray object 3 times
        });
    }

    returnForm () {
        console.log('This is the form function. Which doesn\'t show anything........??) BUT IT SHOWS THIS CONSOLE.LOG!?!!?');
        return(
            <View>
                <ImageBackground style={styles.previewResults} source={{ uri: global.pa }}/>
                <Text>TEST</Text>
                <Text
                    style={{width: 250, borderColor: '#858585', borderWidth: 1, marginLeft: 20, backgroundColor: '#cdb3f8'}}>
                    {global.bo}
                </Text>
                <Text style={{width: 250, borderColor: '#858585', borderWidth: 1, marginLeft: 20, backgroundColor: '#cdb3f8', height: 50}}>
                    {global.ad}, {global.ci}
                </Text>
                <Text style={{width: 250, borderColor: '#858585', borderWidth: 1, marginLeft: 20, backgroundColor: '#cdb3f8', height: 50}}>
                    {global.cat}
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

    render() {
        // const climate = global.ress.find(incident => incident.category === 'overig');
        // if (climate.category === 'overig') {
        //     this.setState({
        //         overig: true,
        //     })
        // }
        return (
            <View>
                {this.state.overig === false ? this.renderOverig() : alert('Er zijn geen overig incidenten.')}
            </View>
        );
    }
}

