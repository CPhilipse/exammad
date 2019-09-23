/**
 * @format
 */

import {AppRegistry, StyleSheet} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

// Style. Cleanes up other files.
export default styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    ActionButton: {
        flex: 1,
        backgroundColor: '#cdb3f8',
    },
    ActionButtonText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 25,
        position: 'relative',
        top: '45%'
    },
    capture: {
        flex: 0,
        backgroundColor: '#cdb3f8',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    cancel: {
        position: 'absolute',
        right: 20,
        top: 20,
        backgroundColor: 'transparent',
        color: '#cdb3f8',
        fontWeight: '600',
        fontSize: 17,
        zIndex: 10
    },
    text: {
        fontSize: 10,
        alignSelf: 'center',
        color: '#000'
    },
    block:  {
        backgroundColor: '#cdb3f8',
        width: 250,
        marginLeft: 20,
        borderWidth: 1,
        borderColor: '#858585'
    },
    button: {
        // flex: 1,
        backgroundColor: '#cdb3f8',
        width: 200,
        height: 80,
        position: 'relative',
        top: '5%',
        borderWidth: 1,
        borderColor: '#858585',
        marginLeft: 20
    },
    buttonText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 25,
        position: 'relative',
        top: 20
    },
    buttonEmail: {
        backgroundColor: '#cdb3f8',
        width: 200,
        height: 80,
        position: 'relative',
        top: '10%',
        borderWidth: 1,
        borderColor: '#858585',
        marginLeft: 20
    },
    preview: {
        width: 370,
        height: 300,
        marginLeft: 20,
        marginBottom: 10,
        marginTop: 80
    },
    previewResults: {
        width: 250,
        height: 250,
        marginLeft: 20,
        marginBottom: 10,
        marginTop: 10,
        transform: [{rotate: '90deg'}],
    },
    MailContainer: {
        flex: 1,
        paddingTop: 50,
    },
    header: {
        flex: 0.2,
        backgroundColor: '#000000',

    },
    content: {
        flex: 1,
        marginTop: 5,
        backgroundColor: '#e1e1e1',
    },
    MailText: {
        fontWeight: "400",
        fontSize: 20,
    },
    footer: {
        flex: 0.1,
        marginTop: 5,
        backgroundColor: '#000000',
    },
});
