import React, { useEffect, useState } from "react";
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import { Formik } from "formik";
import { formStyles } from "../../styles/formStyle";
import * as yup from 'yup';
import { fuels } from "../data/fuels";
import { bodies } from "../data/carBodies";
import { seats } from "../data/seats";
import { years } from "../data/years";

import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from 'expo-file-system'

const initValues = {
    code: '',
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

const CarForm = ({ data, onSubmit }) => {
    const [brands, setBrands] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [brandsList, setBrandsList] = useState([]);
    const [models, setModels] = useState([]);
    const [openTwo, setOpenTwo] = useState(false);
    const [valueTwo, setValueTwo] = useState('');
    const [modelsList, setModelsList] = useState([]);
    const [openThree, setOpenThree] = useState(false);
    const [valueThree, setValueThree] = useState(data ? data.year : '');
    const [openFour, setOpenFour] = useState(false);
    const [valueFour, setValueFour] = useState(data ? data.body : '');
    const [openFive, setOpenFive] = useState(false);
    const [valueFive, setValueFive] = useState(data ? data.fuel : '');
    const [openSix, setOpenSix] = useState(false);
    const [valueSix, setValueSix] = useState(data ? data.seat : '');
    const [bodyList, setBodyList] = useState(bodies);
    const [fuelList, setFuelList] = useState(fuels);
    const [seatList, setSeatList] = useState(seats);
    const [yearList, setYearList] = useState(years);
    const [images, setImages] = useState(data && data.image ? [data.image] : []);

    const reviewSchema = yup.object({
        code: yup.string()
            .required(),
        brand: yup.string()
            .required(),
        model: yup.string()
            .required(),
        year: yup.string()
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

    let initialValues = data ? data : initValues;

    const getBrands = async () => {
        const response = await Axios.get('https://www.polovniautomobili.com/json/v1/getBrands/26');
        setBrands(response.data.filter((brand) => brand.brandName !== 'Ostalo'));
    }

    useEffect(() => {
        getBrands()
        if (data) {
            if (value === '') {
                setValue(data.brand)
            }
        }
    }, [])

    const getModels = async (brandId) => {
        if (brandId && brandId !== '') {
            const response = await Axios.get(`https://www.polovniautomobili.com/json/v1/getModelsByBrand/${brandId}`);
            setModels(response.data);
            setModelsList([]);
            if (data && valueTwo === '') {
                setValueTwo(data.model)
            } else {
                setValueTwo('');
            }
        }
    }

    if (brands && brands.length !== 0 && brandsList.length === 0) {
        setBrandsList(brands.map((brand) => { return { label: brand.brandName, value: brand.brandName } }))
    }

    if (models && models.length !== 0 && modelsList.length === 0) {
        setModelsList(models.map((model) => { return { label: model.modelName, value: model.modelName } }))
    }

    const onFinish = (values) => {
        values.insertedImage = images[0];
        onSubmit(values)
    }

    useEffect(() => {
        if (brands.length !== 0 && value !== '') {
            const chosenBrand = brands.filter((brand) => brand.brandName === value)
            getModels(chosenBrand[0].brandID)
        }
    }, [value, brands])


    const openImageLibrary = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        });

        if (result?.cancelled === false && result?.uri) {
            const fileInfo = await getFileInfo(result.uri);
            console.log('fiele', fileInfo);
            setImages([result]);
        }
    };

    const getFileInfo = async (fileURI) => {
        const fileInfo = await FileSystem.getInfoAsync(fileURI);
        return fileInfo;
    };

    return (
        <ScrollView>
            {brandsList.length !== 0 &&
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
                                onChangeText={props.handleChange('code')}
                                onBlur={props.handleBlur('code')}
                                value={props.values.code}
                                placeholder='Šifra vozila'
                            />
                            <Text style={formStyles.errorText}>{props.touched.code && props.errors.code && 'Ovo polje je obavezno!'}</Text>
                            <DropDownPicker
                                listMode='MODAL'
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
                                translation={{
                                    NOTHING_TO_SHOW: "Nema rezultata!"
                                }}
                                zIndex={10}
                            />
                            <Text style={formStyles.errorText}>{props.touched.brand && props.errors.brand && 'Ovo polje je obavezno!'}</Text>
                            <DropDownPicker
                                listMode='MODAL'
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
                                translation={{
                                    NOTHING_TO_SHOW: "Nema rezultata!"
                                }}
                                zIndex={9}
                            />
                            <Text style={formStyles.errorText}>{props.touched.model && props.errors.model && 'Ovo polje je obavezno!'}</Text>
                            <DropDownPicker
                                listMode='MODAL'
                                style={formStyles.formField}
                                onChangeValue={props.handleChange('year')}
                                open={openThree}
                                value={valueThree}
                                items={yearList}
                                setOpen={setOpenThree}
                                setValue={setValueThree}
                                setItems={setYearList}
                                placeholder='Godište'
                                zIndex={8}
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
                                listMode='MODAL'
                                style={formStyles.formField}
                                onChangeValue={props.handleChange('body')}
                                open={openFour}
                                value={valueFour}
                                items={bodyList}
                                setOpen={setOpenFour}
                                setValue={setValueFour}
                                setItems={setBodyList}
                                placeholder='Karoserija'
                                zIndex={7}
                            />
                            <Text style={formStyles.errorText}>{props.touched.body && props.errors.body && 'Ovo polje je obavezno!'}</Text>
                            <DropDownPicker
                                listMode='MODAL'
                                style={formStyles.formField}
                                onChangeValue={props.handleChange('fuel')}
                                open={openFive}
                                value={valueFive}
                                items={fuelList}
                                setOpen={setOpenFive}
                                setValue={setValueFive}
                                setItems={setFuelList}
                                placeholder='Gorivo'
                                zIndex={6}
                            />
                            <Text style={formStyles.errorText}>{props.touched.fuel && props.errors.fuel && 'Ovo polje je obavezno!'}</Text>
                            <DropDownPicker
                                listMode='MODAL'
                                style={formStyles.formField}
                                onChangeValue={props.handleChange('seat')}
                                open={openSix}
                                value={valueSix}
                                items={seatList}
                                setOpen={setOpenSix}
                                setValue={setValueSix}
                                setItems={setSeatList}
                                placeholder='Broj sedišta'
                                zIndex={5}
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
                            <Button onPress={openImageLibrary} title='ODABERI SLIKU' />
                            <View style={styles.imageContainer}>
                                {images.length !== 0 && images.map((image, index) => <Image style={styles.image} key={index} source={{ uri: image?.uri }} />)}
                                <View>
                                    {images.length !== 0 && <Button onPress={() => setImages([])} title='OBRIŠI SLIKU' />}
                                </View>
                            </View>
                            <Button color='#B2B5B8' onPress={props.handleSubmit} title={data ? 'IZMENI' : 'UNESI'} />
                        </View>
                    )}
                </Formik>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 150,
        padding: 10,
        marginBottom: 5
    },
    imageContainer: {
        marginVertical: 10
    }
})

export default CarForm;