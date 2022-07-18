import React, { useContext } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { UserContext } from "../App";
import { Formik } from "formik";
import * as yup from 'yup';
import Header from "../components/header";

const initialValues = {
    email: '',
    password: '',
}

const Login = () => {

    const user = useContext(UserContext);
    // const [verifyMessage, setVerifyMessage] = useState(false);

    const reviewSchema = yup.object({
        email: yup.string()
            .required(),
        password: yup.string()
            .required(),
    });

    // useEffect(() => {
    //     const checkForVerification = window.location.href.split('/');
    //     if (checkForVerification && checkForVerification[checkForVerification.length - 1].includes('email-verified')) {
    //         setVerifyMessage('Email verified, please log in.');
    //         console.log(checkForVerification);
    //     }
    // }, []);

    const onFinish = (values) => {
        user.handleLogin(values);
    };

    return (
        <View style={styles.loginContainer}>
            <Header title='Autoplac' />
            <Formik
                initialValues={initialValues}
                onSubmit={onFinish}
                validationSchema={reviewSchema}
            >
                {props => (
                    <View style={styles.loginForm}>
                        <TextInput
                            placeholder="Email"
                            onChangeText={props.handleChange('email')}
                            onBlur={props.handleBlur('email')}
                            value={props.values.email}
                            style={styles.inputField}
                        />
                        <Text style={styles.errorText}>{props.touched.email && props.errors.email && 'Ovo polje je obavezno!'}</Text>

                        <TextInput
                            placeholder="Password"
                            onChangeText={props.handleChange('password')}
                            onBlur={props.handleBlur('password')}
                            value={props.values.password}
                            secureTextEntry
                            style={styles.inputField}
                        />
                        <Text style={styles.errorText}>{props.touched.password && props.errors.password && 'Ovo polje je obavezno!'}</Text>
                        <Button color='#B2B5B8' onPress={props.handleSubmit} title='Prijavi se' />
                    </View>
                )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    loginContainer: {
        height: '100%',
    },
    loginForm: {
        height: '100%',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    inputField: {
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        marginBottom: 2,
        paddingLeft: 5
    },
    errorText: {
        marginBottom: 5,
        color: '#ff0000'
    }
})
export default Login;