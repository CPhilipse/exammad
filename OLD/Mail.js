import React, {Component} from 'react';
import {Text, Alert, TouchableOpacity} from 'react-native';
import Mailer from 'react-native-mail';

type Props = {};
export default class Mail extends Component<Props> {
    constructor(props) {
        // Required step: always call the parent class' constructor
        super(props);

    }

    handleEmail = () => {
        Mailer.mail({
            subject: 'Incident: ' + this.state.category,
            recipients: ['concierge@example.com'],
            ccRecipients: ['docent@example.com'],
            bccRecipients: ['conierge2@example.com'],
            body: 'Body: ' + this.state.body + '. \n Locatie: ' + this.state.address + ', ' + this.state.city + '. \n Categorie: ' + this.state.category + '.' + this.state.path,
            isHTML: true,
            attachment: {
                path: this.state.path,  // The absolute path of the file from which to read data. And for some reason this image is too big for attachment... **
                type: 'jpg',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
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

    render() {
        return (
                <TouchableOpacity
                    style={styles.buttonEmail}
                    onPress={this.handleEmail}>
                    <Text style={styles.buttonText}>E-mail incident</Text>
                </TouchableOpacity>
        );
    }
}