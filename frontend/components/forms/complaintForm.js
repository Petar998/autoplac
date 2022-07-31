import { Formik, useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { formStyles } from '../../styles/formStyle';
import Axios from 'axios';
import * as yup from 'yup';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { UserContext } from '../../App';
import Checkbox from 'expo-checkbox';

const initValues = {
  buyer: '',
  car: '',
  complaintDate: new Date(),
  description: '',
  rejected: false
}

const ComplaintForm = ({ data, onSubmit, buyers }) => {
  const user = useContext(UserContext);
  const formik = useFormik({ initialValues: initValues });
  const [value, setValue] = useState(data ? data.car._id : '');
  const [open, setOpen] = useState(false);
  const [openTwo, setOpenTwo] = useState(false);
  const [carList, setCarList] = useState([]);
  const [openModal, setOpenModal] = useState(false)
  const [date, setDate] = useState(data ? new Date(data.complaintDate) : new Date())
  const [buyerValue, setBuyerValue] = useState(data ? data.buyer._id : '');
  const [buyerList, setBuyerList] = useState(buyers.map((buyer) => {
    return {
      label: buyer.firstName + ' ' + buyer.lastName + ' ' + buyer.personalID,
      value: buyer._id
    }
  }));
  const [isChecked, setChecked] = useState(data ? data.rejected : false);

  const reviewSchema = yup.object({
    buyer: yup.string()
      .required(),
    car: yup.string()
      .required(),
    complaintDate: yup.date()
      .required(),
    description: yup.string(),
  });

  if (data) {
    data = { ...data, buyer: data.buyer._id, car: data.car._id }
  }

  let initialValues = data ? data : initValues;

  const onFinish = (values) => {
    values.complaintDate = date
    values.rejected = isChecked;
    onSubmit(values)
  }

  const openCalendar = () => {
    setOpenModal(true);
  }

  const onChange = (value, props) => {
    if (value.nativeEvent && value.nativeEvent.timestamp) {
      setDate(new Date(value.nativeEvent.timestamp))
      setOpenModal(false);
      formik.setFieldValue('complaintDate', new Date(value.nativeEvent.timestamp))
      props.handleChange('complaintDate')
    }
  }

  const getBuyerCars = async (value) => {
    const filter = { buyer: value.value };
    const res = await Axios.get(`http://10.0.2.2:3333/sells?filter=${JSON.stringify(filter)}`,
      { withCredentials: false, headers: { Authorization: `Bearer ${user.data.token}` } });
    if (res && res.data && res.data.items) {
      const cars = res.data.items.map((item) => {
        return item.car;
      })
      setCarList(cars.map((car) => {
        return {
          label: car.brand + ' ' + car.model,
          value: car._id
        }
      }))
    }
  }

  if (data) {
    getBuyerCars(data.buyer);
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
            <DropDownPicker
              listMode='MODAL'
              style={formStyles.formField}
              onChangeValue={props.handleChange('buyer')}
              onSelectItem={(value) => getBuyerCars(value)}
              open={openTwo}
              value={buyerValue}
              items={buyerList}
              setOpen={setOpenTwo}
              setValue={setBuyerValue}
              setItems={setBuyerList}
              placeholder='Izaberite kupca'
              searchable={true}
              searchPlaceholder='Pretraga'
              translation={{
                NOTHING_TO_SHOW: "Nema rezultata!"
              }}
              zIndex={10}
            />
            <Text style={formStyles.errorText}>{props.touched.buyer && props.errors.buyer && 'Ovo polje je obavezno!'}</Text>
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
              zIndex={9}
            />
            <Text style={formStyles.errorText}>{props.touched.car && props.errors.car && 'Ovo polje je obavezno!'}</Text>
            <Button title='Odaberi datum' onPress={openCalendar} />
            {openModal && <DateTimePicker
              value={date}
              onChange={(value) => onChange(value, props)}
              onTouchCancel={() => setOpenModal(false)}
              onTouchEnd={props.handleBlur('complaintDate')}
            />}
            <Text style={formStyles.errorText}>{props.touched.complaintDate && props.errors.complaintDate && 'Ovo polje je obavezno!'}</Text>
            <TextInput
              style={formStyles.inputField}
              onChangeText={props.handleChange('description')}
              onBlur={props.handleBlur('description')}
              value={props.values.description}
              placeholder='Opis reklamacije'
              multiline={true}
              numberOfLines={3}
            />
            <Text style={formStyles.errorText}></Text>
            <View style={styles.checkboxField}>
              <Checkbox
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? '#2196F3' : undefined}
              />
              <Text style={styles.checkboxText}>Odbijena reklamacija</Text>
            </View>
            <Button color='#B2B5B8' onPress={props.handleSubmit} title={data ? 'IZMENI' : 'UNESI'} />
          </View>
        )
        }
      </Formik >
    </View >
  )
}

const styles = StyleSheet.create({
  checkboxField: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  checkboxText: {
    marginLeft: 5
  }
})

export default ComplaintForm