import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Button, Toast, Text, Label } from 'native-base';
import * as firebase from 'react-native-firebase';

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            email: "",
            password: "",
        };
    }

    /* Handle firebase code */
    SignUp = (email, password) => {
        try {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(user => {
                    console.log(user);
                });
        } catch (error) {
            console.log(error.toString(error));
        }
    };

    render() {

        return (
            <Container>
                <Content padder>
                    <Form>
                        <Item floatingLabel>
                            <Input placeholder="Naam" autoCapitalize="none" autoCorrect={false} />
                        </Item>
                        <Item floatingLabel>
                            <Input
                                placeholder="E-mail"
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={email => this.setState({ email })}
                            />
                        </Item>
                        <Item floatingLabel>
                            <Input
                                placeholder="Wachtwoord"
                                secureTextEntry={true}
                                autoCapitalize="none"
                                autoCorrect={false}
                                /*Save the typed password in the state*/
                                onChangeText={password => this.setState({ password })}
                            />
                        </Item>
                        /* Set the typed e-mail and password as parameters for the database e-mail and parameter */
                        <Button style={{ marginTop: 20 }} full success onPress={() => this.SignUp(this.state.email, this.state.password)}>
                            <Text>Registreren</Text>
                        </Button>

                        <Button full success style={{ marginTop: 50 }} onPress={() => this.props.navigation.navigate('Login')}>
                            <Text>Inloggen</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}