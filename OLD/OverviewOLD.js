import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Picker, TextInput, ImageBackground} from 'react-native';
import Camera from '../src/Camera';

export default class Overview extends Component {
    constructor(props) {
        // Required step: always call the parent class' constructor
        super(props);

        this.state = {
            isLoading: true,
            uri: '',
            category: '',
            location: '',
            body: 'Omschrijving...'
        }
    }

    updateCategory = (category) => {
        this.setState({ category: category })
    };

    getValue = () => {
        const uri = this.state.uri;
        const body = this.state.body;
        const category = this.state.category;
    };

    handleSubmit = () => {
        // value = package | if the value category has rommel, get in flatlist rommel.
        const value = this.getValue();
        console.log('value: ', value);
        this.props.navigation.navigate('Home');
    };

    render() {
        // How do I retrieve the URI from Incidentnt.js so that the image taken can be shown and saved through this form.
        // Get state object which is passed as props
        // this.props.path.forEach((path) => <ImageBackground style={styles.preview} src={path} />);
        // console.log(this.props.uri.path);
        // Why doesn't it get streetname?
        console.log(this.props.streetname);
        return (
            <View>
                {/*<ImageBackground style={styles.preview} source={{ uri: this.props.uri.path }}/>*/}
                <TextInput
                    style={{width: 250, borderColor: '#858585', borderWidth: 1, marginLeft: 20, backgroundColor: '#cdb3f8'}}
                    onChangeText={(body) => this.setState({body})}
                    value={this.state.body}
                />
                <Text style={{width: 250, borderColor: '#858585', borderWidth: 1, marginLeft: 20, backgroundColor: '#cdb3f8', height: 50}}>{this.props.streetname}</Text>
                <Picker style={styles.block} selectedValue = {this.state.category} onValueChange = {this.updateCategory}>
                    <Picker.Item label = "Rommel." value = "rommel" />
                    <Picker.Item label = "Defect." value = "defect" />
                    <Picker.Item label = "Klimaat." value = "klimaat" />
                    <Picker.Item label = "Wifi." value = "wifi" />
                    <Picker.Item label = "Overig." value = "overig" />
                </Picker>
                <Text style = {styles.text}>{this.state.category}</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.handleSubmit}
                >
                    <Text style={styles.buttonText}>Verzenden</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        alignSelf: 'center',
        color: 'red'
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
        width: 300,
        height: 100,
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
        top: '30%'
    },
    preview: {
        width: 200,
        height: 200,
        marginLeft: 20,
        marginBottom: 20
    },
});