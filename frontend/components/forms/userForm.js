import React, { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import { formStyles } from "../../styles/formStyle";
import DropDownPicker from 'react-native-dropdown-picker';

const UserForm = ({ data, onSubmit }) => {
    const initValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
        newPassword: '',
        confirmPassword: ''
    }
    const [value, setValue] = useState(data ? data.role : '');
    const [open, setOpen] = useState(false);
    const [roleList, setRoleList] = useState([{
        label: 'Admin', value: 'admin'
    },
    {
        label: 'Korisnik', value: 'user'
    }])

    const reviewSchema = yup.object({
        firstName: yup.string()
            .required(),
        lastName: yup.string()
            .required(),
        email: yup.string()
            .required(),
        password: !data ? yup.string()
            .required() : yup.string(),
        role: yup.string()
            .required(),
        newPassword: yup.string(),
        confirmPassword: yup.string()
    });

    let initialValues = data ? data : initValues;

    const onFinish = (values) => {
        onSubmit(values)
    }

    return (
        <View>
            <Formik
                initialValues={initialValues}
                onSubmit={onFinish}
                validationSchema={reviewSchema}
            >
                {props => (
                    <View
                        style={formStyles.form}
                    >
                        <TextInput
                            style={formStyles.inputField}
                            onChangeText={props.handleChange('firstName')}
                            onBlur={props.handleBlur('firstName')}
                            value={props.values.firstName}
                            placeholder='Ime'
                        />
                        <Text style={formStyles.errorText}>{props.touched.firstName && props.errors.firstName && 'Ovo polje je obavezno!'}</Text>
                        <TextInput
                            style={formStyles.inputField}
                            onChangeText={props.handleChange('lastName')}
                            onBlur={props.handleBlur('lastName')}
                            value={props.values.lastName}
                            placeholder='Prezime'
                        />
                        <Text style={formStyles.errorText}>{props.touched.lastName && props.errors.lastName && 'Ovo polje je obavezno!'}</Text>
                        <TextInput
                            style={formStyles.inputField}
                            onChangeText={props.handleChange('email')}
                            onBlur={props.handleBlur('email')}
                            value={props.values.email}
                            placeholder='Email'
                            keyboardType='email-address'
                        />
                        <Text style={formStyles.errorText}>{props.touched.email && props.errors.email && 'Ovo polje je obavezno!'}</Text>
                        {!data ?
                            <View>
                                <TextInput
                                    style={formStyles.inputField}
                                    onChangeText={props.handleChange('password')}
                                    onBlur={props.handleBlur('password')}
                                    value={props.values.password}
                                    placeholder='Lozinka'
                                    secureTextEntry
                                />
                                <Text style={formStyles.errorText}>{props.touched.password && props.errors.password && 'Ovo polje je obavezno!'}</Text>
                            </View>
                            : <View>
                                <TextInput
                                    style={formStyles.inputField}
                                    onChangeText={props.handleChange('newPassword')}
                                    onBlur={props.handleBlur('newPassword')}
                                    value={props.values.newPassword}
                                    placeholder='Nova lozinka'
                                    secureTextEntry
                                />
                                <TextInput
                                    style={formStyles.inputField}
                                    onChangeText={props.handleChange('confirmPassword')}
                                    onBlur={props.handleBlur('confirmPassword')}
                                    value={props.values.confirmPassword}
                                    placeholder='Potvrdi lozinku'
                                    secureTextEntry
                                />
                            </View>
                        }
                        <DropDownPicker
                            style={formStyles.formField}
                            onChangeValue={props.handleChange('role')}
                            open={open}
                            value={value}
                            items={roleList}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setRoleList}
                            placeholder='Uloga'
                            zIndex={10}
                        />
                        <Text style={formStyles.errorText}>{props.touched.role && props.errors.role && 'Ovo polje je obavezno!'}</Text>
                        <Button color='#B2B5B8' onPress={props.handleSubmit} title={data ? 'IZMENI' : 'UNESI'} />
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default UserForm;