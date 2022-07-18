import React, { useEffect, useState } from "react";
import { Button, ScrollView, Text, TextInput, View } from "react-native";
import Axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import { Formik } from "formik";
import { formStyles } from "../../styles/formStyle";
import * as yup from 'yup';
import { fuels } from "../data/fuels";
import { bodies } from "../data/carBodies";
import { seats } from "../data/seats";

const initValues = {
    brand: '',
    model: '',
    year: '',
    mileage: '',
    body: '',
    fuel: '',
    seat: '',
    cubicMeasure: '',
    price: '',
    color: '',
    importCountry: '',
}

const CarForm = ({ data, isNew }) => {
    const [brands, setBrands] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [brandsList, setBrandsList] = useState([]);
    const [models, setModels] = useState([]);
    const [openTwo, setOpenTwo] = useState(false);
    const [valueTwo, setValueTwo] = useState('');
    const [modelsList, setModelsList] = useState([]);
    const [openThree, setOpenThree] = useState(false);
    const [valueThree, setValueThree] = useState('');
    const [openFour, setOpenFour] = useState(false);
    const [valueFour, setValueFour] = useState('');
    const [openFive, setOpenFive] = useState(false);
    const [valueFive, setValueFive] = useState('');
    const [bodyList, setBodyList] = useState(bodies);
    const [fuelList, setFuelList] = useState(fuels);
    const [seatList, setSeatList] = useState(seats)

    const reviewSchema = yup.object({
        brand: yup.string()
            .required(),
        model: yup.string()
            .required(),
        year: yup.number()
            .required(),
        mileage: yup.number()
            .required(),
        body: yup.string()
            .required(),
        fuel: yup.string()
            .required(),
        seat: yup.string()
            .required(),
        cubicMeasure: yup.number()
            .required(),
        price: yup.number()
            .required(),
        color: yup.string()
            .required(),
        importCountry: yup.string()
            .required(),
    });

    let initialValues = data ? data : initValues

    const getBrands = async () => {
        const response = await Axios.get('https://www.polovniautomobili.com/json/v1/getBrands/26');
        setBrands(response.data.filter((brand) => brand.brandName !== 'Ostalo'));
    }

    useEffect(() => {
        getBrands()
    }, [])

    const getModels = async (brandId) => {
        if (brandId && brandId !== '') {
            const response = await Axios.get(`https://www.polovniautomobili.com/json/v1/getModelsByBrand/${brandId}`);
            setModels(response.data);
            setModelsList([]);
            setValueSecond('');
        }
    }

    if (brands && brands.length !== 0 && brandsList.length === 0) {
        setBrandsList(brands.map((brand) => { return { label: brand.brandName, value: brand.brandName } }))
    }

    if (models && models.length !== 0 && modelsList.length === 0) {
        setModelsList(models.map((model) => { return { label: model.modelName, value: model.modelName } }))
    }

    const onFinish = (values) => {
        console.log(values)
    }

    useEffect(() => {
        if (brands.length !== 0 && value !== '') {
            const chosenBrand = brands.filter((brand) => brand.brandName === value)
            getModels(chosenBrand[0].brandID)
        }
    }, [value])

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
                            onChangeValue={props.handleChange('brand')}
                            open={open}
                            value={value}
                            items={brandsList}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setBrandsList}
                            placeholder='Izaberite marku'
                            searchable={true}
                            searchPlaceholder='Pretraga'
                            zIndex={10}
                        />
                        <Text style={formStyles.errorText}>{props.touched.brand && props.errors.brand && 'Ovo polje je obavezno!'}</Text>
                        <DropDownPicker
                            style={formStyles.formField}
                            onChangeValue={props.handleChange('model')}
                            open={openTwo}
                            value={valueTwo}
                            items={modelsList}
                            setOpen={setOpenTwo}
                            setValue={setValueTwo}
                            setItems={setModelsList}
                            placeholder='Izaberite model'
                            searchable={true}
                            searchPlaceholder='Pretraga'
                            zIndex={9}
                        />
                        <Text style={formStyles.errorText}>{props.touched.model && props.errors.model && 'Ovo polje je obavezno!'}</Text>
                        <TextInput
                            style={formStyles.inputField}
                            keyboardType='numeric'
                            onChangeText={props.handleChange('year')}
                            onBlur={props.handleBlur('year')}
                            value={props.values.year}
                            placeholder='Godište'
                        />
                        <Text style={formStyles.errorText}>{props.touched.year && props.errors.year && 'Ovo polje je obavezno!'}</Text>
                        <TextInput
                            style={formStyles.inputField}
                            keyboardType='numeric'
                            onChangeText={props.handleChange('mileage')}
                            onBlur={props.handleBlur('mileage')}
                            value={props.values.mileage}
                            placeholder='Kilometraža'
                        />
                        <Text style={formStyles.errorText}>{props.touched.mileage && props.errors.mileage && 'Ovo polje je obavezno!'}</Text>
                        <DropDownPicker
                            style={formStyles.formField}
                            onChangeValue={props.handleChange('body')}
                            open={openThree}
                            value={valueThree}
                            items={bodyList}
                            setOpen={setOpenThree}
                            setValue={setValueThree}
                            setItems={setBodyList}
                            placeholder='Karoserija'
                            searchable={true}
                            searchPlaceholder='Pretraga'
                            zIndex={8}
                        />
                        <Text style={formStyles.errorText}>{props.touched.body && props.errors.body && 'Ovo polje je obavezno!'}</Text>
                        <DropDownPicker
                            style={formStyles.formField}
                            onChangeValue={props.handleChange('fuel')}
                            open={openFour}
                            value={valueFour}
                            items={fuelList}
                            setOpen={setOpenFour}
                            setValue={setValueFour}
                            setItems={setFuelList}
                            placeholder='Gorivo'
                            searchable={true}
                            searchPlaceholder='Pretraga'
                            zIndex={7}
                        />
                        <Text style={formStyles.errorText}>{props.touched.fuel && props.errors.fuel && 'Ovo polje je obavezno!'}</Text>
                        <DropDownPicker
                            style={formStyles.formField}
                            onChangeValue={props.handleChange('seat')}
                            open={openFive}
                            value={valueFive}
                            items={seatList}
                            setOpen={setOpenFive}
                            setValue={setValueFive}
                            setItems={setSeatList}
                            placeholder='Broj sedišta'
                            searchable={true}
                            searchPlaceholder='Pretraga'
                            zIndex={6}
                        />
                        <Text style={formStyles.errorText}>{props.touched.seat && props.errors.seat && 'Ovo polje je obavezno!'}</Text>
                        <TextInput
                            style={formStyles.inputField}
                            keyboardType='numeric'
                            onChangeText={props.handleChange('cubicMeasure')}
                            onBlur={props.handleBlur('cubicMeasure')}
                            value={props.values.cubicMeasure}
                            placeholder='Kubikaža (cm³)'
                        />
                        <Text style={formStyles.errorText}>{props.touched.cubicMeasure && props.errors.cubicMeasure && 'Ovo polje je obavezno!'}</Text>
                        <TextInput
                            style={formStyles.inputField}
                            keyboardType='numeric'
                            onChangeText={props.handleChange('price')}
                            onBlur={props.handleBlur('price')}
                            value={props.values.price}
                            placeholder='Cena (€)'
                        />
                        <Text style={formStyles.errorText}>{props.touched.price && props.errors.price && 'Ovo polje je obavezno!'}</Text>
                        <TextInput
                            style={formStyles.inputField}
                            onChangeText={props.handleChange('color')}
                            onBlur={props.handleBlur('color')}
                            value={props.values.color}
                            placeholder='Boja'
                        />
                        <Text style={formStyles.errorText}>{props.touched.color && props.errors.color && 'Ovo polje je obavezno!'}</Text>
                        <TextInput
                            style={formStyles.inputField}
                            onChangeText={props.handleChange('importCountry')}
                            onBlur={props.handleBlur('importCountry')}
                            value={props.values.importCountry}
                            placeholder='Zemlja uvoza'
                        />
                        <Text style={formStyles.errorText}>{props.touched.importCountry && props.errors.importCountry && 'Ovo polje je obavezno!'}</Text>
                        <Button color='#B2B5B8' onPress={props.handleSubmit} title='POTVRDI' />
                    </View>
                )}
            </Formik>
        </ScrollView>
    )
}

export default CarForm;