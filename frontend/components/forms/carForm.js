import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import { Formik } from "formik";

const initValues = {
    brand: '',
    model: ''
}

const CarForm = ({ data, isNew }) => {
    const [brands, setBrands] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [brandsList, setBrandsList] = useState([]);
    const [models, setModels] = useState([]);
    const [openSecond, setOpenSecond] = useState(false);
    const [valueSecond, setValueSecond] = useState('');
    const [modelsList, setModelsList] = useState([]);

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
        <View>
            <Formik
                initialValues={initialValues}
                onSubmit={onFinish}
            >
                {props => (
                    <View>
                        <DropDownPicker
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
                            zIndex={4}
                        />
                        <DropDownPicker
                            onChangeValue={props.handleChange('model')}
                            open={openSecond}
                            value={valueSecond}
                            items={modelsList}
                            setOpen={setOpenSecond}
                            setValue={setValueSecond}
                            setItems={setModelsList}
                            placeholder='Izaberite model'
                            searchable={true}
                            searchPlaceholder='Pretraga'
                            zIndex={3}
                        />
                        <Button color='#B2B5B8' onPress={props.handleSubmit} title='POTVRDI' />
                    </View>
                )}
            </Formik>
        </View>
    )
}

// const styles = StyleSheet.create({
//     dropdownBrand: {
//         position: 'absolute',
//         zIndex: 3
//     },
//     dropdownModel: {
//         position: 'absolute',
//         top: 50,
//         zIndex: 3
//     }
// })

export default CarForm;