import React, { useState } from 'react'
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import * as yup from 'yup';
import { Formik, useField, useFormik } from 'formik';
import { formStyles } from '../../styles/formStyle';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

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
    sellDate: new Date(),
    existBuyer: ''
}

const SellForm = ({ data, cars, onSubmit, buyers }) => {
    const formik = useFormik({ initialValues: initValues });
    const [value, setValue] = useState(data ? data.car._id : '');
    const [open, setOpen] = useState(false);
    const [openTwo, setOpenTwo] = useState(false);
    const [carList, setCarList] = useState(cars.map((car) => {
        return {
            label: car.brand + ' ' + car.model,
            value: car._id
        }
    }));
    const [openModal, setOpenModal] = useState(false)
    const [date, setDate] = useState(data ? new Date(data.sellDate) : new Date())
    const [buyerValue, setBuyerValue] = useState(data ? data.buyer._id : '');
    const [buyerList, setBuyerList] = useState(buyers.map((buyer) => {
        return {
            label: buyer.firstName + ' ' + buyer.lastName + ' ' + buyer.personalID,
            value: buyer._id
        }
    }));

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
            .required(),
        existBuyer: yup.string()
    });

    if (data) {
        const buyer = data.buyer;
        delete buyer._id;
        data = { ...data, ...buyer, car: data.car._id }
    }

    let initialValues = data ? data : initValues;

    const onFinish = (values) => {
        values.sellDate = date
        onSubmit(values)
    }

    const openCalendar = () => {
        setOpenModal(true);
    }

    const onChange = (value, props) => {
        if (value.nativeEvent && value.nativeEvent.timestamp) {
            setDate(new Date(value.nativeEvent.timestamp))
            setOpenModal(false);
            formik.setFieldValue('sellDate', new Date(value.nativeEvent.timestamp))
            props.handleChange('sellDate')
        }
    }

    const getBuyerData = (value, props) => {
        const selectedBuyer = buyers.filter((buyer) => buyer._id === value.value);
        props.values.firstName = selectedBuyer[0].firstName;
        props.values.lastName = selectedBuyer[0].lastName;
        props.values.personalID = selectedBuyer[0].personalID;
        props.values.place = selectedBuyer[0].place;
        props.values.postalCode = selectedBuyer[0].postalCode;
        props.values.street = selectedBuyer[0].street;
        props.values.streetNumber = selectedBuyer[0].streetNumber;
        props.values.phone = selectedBuyer[0].phone;
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
                            listMode='MODAL'
                            style={formStyles.formField}
                            onChangeValue={props.handleChange('car')}
                            open={open}
                            value={value}
                            items={carList}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setCarList}
                            placeholder='Izaberite vozilo'
                            searchable={true}
                            searchPlaceholder='Pretraga'
                            translation={{
                                NOTHING_TO_SHOW: "Nema rezultata!"
                            }}
                            zIndex={10}
                        />
                        <Text style={formStyles.errorText}>{props.touched.car && props.errors.car && 'Ovo polje je obavezno!'}</Text>
                        <DropDownPicker
                            listMode='MODAL'
                            style={formStyles.formField}
                            onChangeValue={props.handleChange('existBuyer')}
                            onSelectItem={(value) => getBuyerData(value, props)}
                            open={openTwo}
                            value={buyerValue}
                            items={buyerList}
                            setOpen={setOpenTwo}
                            setValue={setBuyerValue}
                            setItems={setBuyerList}
                            placeholder='Postojeći kupac'
                            searchable={true}
                            searchPlaceholder='Pretraga'
                            translation={{
                                NOTHING_TO_SHOW: "Nema rezultata!"
                            }}
                            zIndex={9}
                        />
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
                            keyboardType='numeric'
                        />
                        <Text style={formStyles.errorText}>{props.touched.phone && props.errors.phone && 'Ovo polje je obavezno!'}</Text>
                        <Button title='Odaberi datum' onPress={openCalendar} />
                        {openModal && <DateTimePicker
                            value={date}
                            onChange={(value) => onChange(value, props)}
                            onTouchCancel={() => setOpenModal(false)}
                            onTouchEnd={props.handleBlur('sellDate')}
                        />}
                        <Text style={formStyles.errorText}>{props.touched.sellDate && props.errors.sellDate && 'Ovo polje je obavezno!'}</Text>
                        <Button color='#B2B5B8' onPress={props.handleSubmit} title={data ? 'IZMENI' : 'UNESI'} />
                    </View>
                )}
            </Formik>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    buyerTitle: {
        marginVertical: 10
    }
})
export default SellForm