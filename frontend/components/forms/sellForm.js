import React, { useState } from 'react'
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import * as yup from 'yup';
import { Formik } from 'formik';
import { formStyles } from '../../styles/formStyle';
import DropDownPicker from 'react-native-dropdown-picker';


const initValues = {
    car: '',
    firstName: '',
    lastName: '',
    personalID: '',
    place: '',
    postalCode: '',
    street: '',
    streetNumber: '',
    phone: '',
    sellDate: ''
}

const SellForm = ({ data, cars, onSubmit }) => {
    const [value, setValue] = useState(data ? data.car : '');
    const [open, setOpen] = useState(false);
    const [carList, setCarList] = useState(cars.map((car) => {
        return {
            label: car.brand + ' ' + car.model,
            value: car._id
        }
    }))

    const reviewSchema = yup.object({
        car: yup.string()
            .required(),
        firstName: yup.string()
            .required(),
        lastName: yup.string()
            .required(),
        personalID: yup.string()
            .required(),
        place: yup.string()
            .required(),
        postalCode: yup.string()
            .required(),
        street: yup.string()
            .required(),
        streetNumber: yup.string()
            .required(),
        phone: yup.string()
            .required(),
        sellDate: yup.date()
            .required()
    });

    let initialValues = data ? data : initValues;

    const onFinish = (values) => {
        onSubmit(values)
    }

    return (
        <ScrollView>
            <Formik
                initialValues={initialValues}
                onSubmit={onFinish}
                validationSchema={reviewSchema}
            >
                {props => (
                    <View
                        style={formStyles.form}
                    >
                        <DropDownPicker
                            style={formStyles.formField}
                            onChangeValue={props.handleChange('car')}
                            open={open}
                            value={value}
                            items={carList}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setCarList}
                            placeholder='Izaberite vozilo'
                            zIndex={10}
                        />
                        <Text style={formStyles.errorText}>{props.touched.role && props.errors.role && 'Ovo polje je obavezno!'}</Text>
                        <Text style={styles.buyerTitle}>PODACI O KUPCU:</Text>
                        <TextInput
                            style={formStyles.inputField}
                            onChangeText={props.handleChange('firstName')}
                            onBlur={props.handleBlur('firstName')}
                            value={props.values.firstName}
                            placeholder='Ime kupca'
                        />
                        <Text style={formStyles.errorText}>{props.touched.firstName && props.errors.firstName && 'Ovo polje je obavezno!'}</Text>
                        <TextInput
                            style={formStyles.inputField}
                            onChangeText={props.handleChange('lastName')}
                            onBlur={props.handleBlur('lastName')}
                            value={props.values.lastName}
                            placeholder='Prezime kupca'
                        />
                        <Text style={formStyles.errorText}>{props.touched.lastName && props.errors.lastName && 'Ovo polje je obavezno!'}</Text>
                        <TextInput
                            style={formStyles.inputField}
                            onChangeText={props.handleChange('personalID')}
                            onBlur={props.handleBlur('personalID')}
                            value={props.values.personalID}
                            placeholder='JMBG kupca'
                        />
                        <Text style={formStyles.errorText}>{props.touched.personalID && props.errors.personalID && 'Ovo polje je obavezno!'}</Text>
                        <TextInput
                            style={formStyles.inputField}
                            onChangeText={props.handleChange('place')}
                            onBlur={props.handleBlur('place')}
                            value={props.values.place}
                            placeholder='Mesto boravka'
                        />
                        <Text style={formStyles.errorText}>{props.touched.place && props.errors.place && 'Ovo polje je obavezno!'}</Text>
                        <TextInput
                            style={formStyles.inputField}
                            onChangeText={props.handleChange('postalCode')}
                            onBlur={props.handleBlur('postalCode')}
                            value={props.values.postalCode}
                            placeholder='Poštanski broj'
                            keyboardType='numeric'
                        />
                        <Text style={formStyles.errorText}>{props.touched.postalCode && props.errors.postalCode && 'Ovo polje je obavezno!'}</Text>
                        <TextInput
                            style={formStyles.inputField}
                            onChangeText={props.handleChange('street')}
                            onBlur={props.handleBlur('street')}
                            value={props.values.street}
                            placeholder='Ulica'
                        />
                        <Text style={formStyles.errorText}>{props.touched.street && props.errors.street && 'Ovo polje je obavezno!'}</Text>
                        <TextInput
                            style={formStyles.inputField}
                            onChangeText={props.handleChange('streetNumber')}
                            onBlur={props.handleBlur('streetNumber')}
                            value={props.values.streetNumber}
                            placeholder='Broj kuće/zgrade'
                        />
                        <Text style={formStyles.errorText}>{props.touched.streetNumber && props.errors.streetNumber && 'Ovo polje je obavezno!'}</Text>
                        <TextInput
                            style={formStyles.inputField}
                            onChangeText={props.handleChange('phone')}
                            onBlur={props.handleBlur('phone')}
                            value={props.values.phone}
                            placeholder='Kontakt telefon'
                        />
                        <Text style={formStyles.errorText}>{props.touched.phone && props.errors.phone && 'Ovo polje je obavezno!'}</Text>
                        <Button color='#B2B5B8' onPress={props.handleSubmit} title={data ? 'IZMENI' : 'UNESI'} />
                    </View>
                )}
            </Formik>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    buyerTitle: {
        marginBottom: 10
    }
})
export default SellForm