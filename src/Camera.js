import React, {Component} from 'react';
import {
    ImageBackground,
    ToastAndroid,
    Text,
    View,
    TouchableOpacity,
    CameraRoll,
    TextInput,
    Picker,
    ActivityIndicator,
    AsyncStorage,
    Alert
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Mailer from "react-native-mail";
import store from 'react-native-simple-store';
// NOTE** I know it's not clean, ugly even, I should work with more components called from different modules/files/classes.
// Since I'm quite late with realizing and don't want to break anything I'll keep it this way. (just so you know that I'm aware :))

export default class Camera extends Component<Props> {

    constructor(props) {
        // Required step: always call the parent class' constructor
        super(props);

        this.state = {
            isLoading: true,
            path: null,
            category: '',
            body: '',
            address: [''],
            city: ['']
        }
    }

    // Get location.
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
                    city: responseJson.results[0].locations[0].adminArea5,
                }, function(){

                });

            })
            .catch((error) =>{
                console.error(error);
            });
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

    // Open camera after having the permission granted. Flashlight off, perhaps make a button where the student can choose whether it should be on or off.
    renderCamera() {
        return (
            <View>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    androidCameraPermissionOptions={{
                        title: 'Permissie om camera te gebruiken.',
                        message: 'We hebben uw permissie nodig om uw camera te gebruiken.',
                        buttonPositive: 'Is goed.',
                        buttonNegative: 'Nee.',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permissie om uw audio te gebruiken.',
                        message: 'We hebben uw permissie nodig om uw audio te gebruiken.',
                        buttonPositive: 'Is goed.',
                        buttonNegative: 'Nee.',
                    }}
                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                        console.log(barcodes);
                    }}
                />
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                        <Text style={{ fontSize: 14 }}> SNAP </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // Take picture and save it in gallery. Also save URI in state.
    takePicture = async() => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options).then(data => {
                ToastAndroid.show('Wauw, goeie foto!', ToastAndroid.LONG);
                CameraRoll.saveToCameraRoll(data.uri);
                // Saves pictures in gallery under directory DCIM.
                this.setState({ path: data.uri });
                // console.log(this.state.path, 'path');
                global.uri = data.uri;
            });
        }
    };

    // updateCategory will be triggered when a category is picked.
    updateCategory = (category) => {
        this.setState({ category: category })
    };

    // Save the state in the store when handleSubmit is called upon.
    handleSubmit = () => {
        const uri = this.state.path;
        const body = this.state.body;
        const address = this.state.address;
        const city = this.state.city;
        const category = this.state.category;
        console.log('uri :', uri, '| body: ', body, '| adres: ', address, '| city: ', city, '| category: ', category);

        const incident = {
            path: uri,
            body: body,
            address: address,
            city: city,
            category: category
        };

        store.push('incidents', incident); // Creates a new array, and inserts this object into it.
        // Retrieve new array.
        // Loop (forEach) through objects, check value, if value is category then show object information.
        store.get('incidents')
            .then((res) =>
                console.log(res)
            );

        // Optional future feature: option to delete certain or all incidents.
        // store.delete('incidents')

        this.props.navigation.navigate('Home');
    };

    // Render image in the form and with the form.
    renderForm() {
        // toString because the response in the address is an object, but I want to display it, so it got to be a string.
        const street = this.state.address.toString();
        const city = this.state.city.toString();

        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 2}}>
                    <ActivityIndicator />
                </View>
            )
        }

        return (
            <View>
                <Text
                    style={styles.cancel}
                    onPress={() => this.setState({ path: null, body: '', category: '' })}
                >X
                </Text>
                <ImageBackground style={styles.previewResults} source={{ uri: this.state.path }}/>

                <TextInput
                    style={{width: 250, borderColor: '#858585', borderWidth: 1, marginLeft: 20, backgroundColor: '#cdb3f8'}}
                    onChangeText={(body) => this.setState({body})}
                    placeholder={'Naam en omschrijving'}
                    value={this.state.body}
                />
                <Text style={{width: 250, borderColor: '#858585', borderWidth: 1, marginLeft: 20, backgroundColor: '#cdb3f8', height: 50}}>{street}, {city}</Text>
                <Picker style={styles.block} selectedValue = {this.state.category} onValueChange = {this.updateCategory}>
                    <Picker.Item label = "Selecteren." value = "" />
                    <Picker.Item label = "Rommel." value = "rommel" />
                    <Picker.Item label = "Defect." value = "defect" />
                    <Picker.Item label = "Klimaat." value = "klimaat" />
                    <Picker.Item label = "Wifi." value = "wifi" />
                    <Picker.Item label = "Overig." value = "overig" />
                </Picker>
                <Text style = {styles.text}>Catergorie: {this.state.category}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.handleSubmit}
                >
                    <Text style={styles.buttonText}>Verzenden</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonEmail}
                    onPress={this.handleEmail}>
                    <Text style={styles.buttonText}>E-mail incident</Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        // If data.uri (path of picture) exists, render image, if not than go back to the camera.
        return (
            <View>
                {this.state.path ? this.renderForm() : this.renderCamera()}
            </View>
        );
    }
}
