import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
    Button,
    FormField,
    TextArea,
    Form,
    FormGroup,
    Radio,
    Header,
    ModalContent,
    ModalActions,
    Icon,
    Modal,
    Dropdown,
    Popup,
    Input,
    Loader,
} from 'semantic-ui-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import FormFieldComponent from '../../Components/FormFieldComponent';
import axios from 'axios';
import { country } from '../../services/data';
import { Email } from '@mui/icons-material';

const keyRole = [
    { key: 'admin', value: 'admin', text: 'Quản trị viên' },
    { key: 'user', value: 'user', text: 'Người dùng' },
];
const keyGender = [
    { key: 'male', value: 'male', text: 'Nam' },
    { key: 'female', value: 'female', text: 'Nữ' },
];
function UserAddPage() {
    useEffect(() => {
        document.title = 'Thêm người dùng';
    }, []);
    const [valueCity, setValueCity] = useState('');
    const [valueDistrict, setValueDistrict] = useState('');
    const [valueWard, setValueWard] = useState('');
    const [valueName, setValueName] = useState();
    const [valueEmail, setValueEmail] = useState();
    const [valuePhone, setValuePhone] = useState();
    const [valueBirthday, setValueBirthday] = useState(new Date());
    const [valueGender, setValueGender] = useState();
    const [valueRole, setValueRole] = useState();
    const [valueAddress, setValueAddress] = useState();
    const [quantity, setQuantity] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    const [showCalendar, setShowCalendar] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    const onChange = (newDate) => {
        setValueBirthday(newDate);
        setShowCalendar(false);
    };
    const handleValueEmail = (e) => {
        setValueEmail(e.target.value);
    };
    const handleValueName = (e) => {
        setValueName(e.target.value);
    };
    const handleChangeValuePhone = (e) => {
        setValuePhone(e.target.value);
    };
    const handleChangeGender = (e, { value }) => {
        setValueGender(value);
    };
    const handleUpdate = () => {
        setIsLoading(true);

        const userData = {
            fullName: valueName,
            phone: valuePhone,
            email: valueEmail,
            birthday: valueBirthday,
            gender: valueGender,
            addresses: {
                phoneNumber: valuePhone,
                ward: valueWard,
                district: valueDistrict,
                province: valueCity,
            },
            role: valueRole,
        };
        axios
            .post('http://localhost:5000/user', userData)
            .then((response) => {
                console.log('User created:', response.data);
                setIsLoading(false);

                navigate('/user');
            })
            .catch((error) => {
                console.error('Error posting data:', error);
            });
    };

    const decreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };
    const handleChangeRole = (e, { value }) => {
        setValueRole(value);
    };

    // ------------------------Address-----------------------------------

    const handleCityChange = (e, data) => {
        setValueCity(data.value);
        setValueDistrict('');
    };

    const handleDistrictChange = (e, data) => {
        setValueDistrict(data.value);
    };
    const handleWardChange = (e, data) => {
        setValueWard(data.value);
    };
    const renderCities = () => {
        return country.map((city) => ({
            key: city.codename,
            value: city.codename,
            text: city.name,
        }));
    };

    const renderDistricts = () => {
        if (!valueCity) return [];

        const city = country.find((city) => city.codename === valueCity);
        return city.districts.map((district) => ({
            key: district.codename,
            value: district.codename,
            text: district.name,
        }));
    };

    const renderWards = () => {
        if (!valueCity || !valueDistrict) return [];

        const city = country.find((city) => city.codename === valueCity);
        const district = city.districts.find((district) => district.codename === valueDistrict);

        return district.wards.map((ward) => ({
            key: ward.codename,
            value: ward.codename,
            text: ward.name,
        }));
    };
    return (
        <div className="p-5">
            <div className="flex items-center justify-between fixed top-0 left-0 right-0 bg-white z-50 py-4  pl-[18%] shadow-md  ">
                <h3 className="font-bold text-4xl">Thêm người dùng {} </h3>
                <div>
                    <Button primary onClick={handleUpdate}>
                        Thêm
                    </Button>
                    <Link to="/user">
                        <Button color="red">Hủy</Button>
                    </Link>
                </div>
            </div>
            <div className="mb-5 py-16">
                <Form size="large">
                    <FormGroup widths={2}>
                        <FormFieldComponent
                            title="Tên người dùng"
                            placeholder="Nhập tên sách"
                            required
                            value={valueName}
                            onChange={handleValueName}
                        />

                        <FormFieldComponent
                            title="Email"
                            placeholder="Nhập mô tả sản phẩm"
                            required
                            // value={dataDetail.Email}
                            value={valueEmail}
                            onChange={handleValueEmail}
                        />
                    </FormGroup>
                    <FormGroup widths={2}>
                        <FormFieldComponent
                            title="Vai trò"
                            placeholder="Chọn vai trò"
                            required
                            select
                            options={keyRole}
                            value={valueRole}
                            onChange={handleChangeRole}
                        />
                        <FormFieldComponent
                            title="Số điện thoại"
                            placeholder="Nhập số điện thoại"
                            required
                            value={valuePhone}
                            onChange={handleChangeValuePhone}
                        />
                    </FormGroup>
                    <FormGroup widths={2}>
                        <FormField>
                            <label>Ngày sinh:</label>
                            <Popup
                                on="focus"
                                pinned
                                trigger={
                                    <Input
                                        icon="calendar"
                                        iconPosition="left"
                                        value={valueBirthday.toLocaleDateString()}
                                        onFocus={toggleCalendar}
                                    />
                                }
                                open={showCalendar}
                                onClose={() => setShowCalendar(false)}
                                onOpen={() => setShowCalendar(true)}
                                position="bottom left"
                            >
                                <Calendar onChange={onChange} value={valueBirthday} onClickDay={onChange} />
                            </Popup>
                        </FormField>
                        <FormFieldComponent
                            title="Giới tính"
                            placeholder="Chọn giới tính"
                            // required
                            select
                            options={keyGender}
                            value={valueGender}
                            onChange={handleChangeGender}
                        />
                    </FormGroup>
                    <FormGroup widths={3}>
                        <FormFieldComponent
                            title="Tỉnh/Thành phố:"
                            placeholder="Chọn thành phố"
                            required
                            select
                            options={renderCities()}
                            value={valueCity}
                            onChange={handleCityChange}
                        />
                        <FormFieldComponent
                            title="Quận/Huyện:"
                            placeholder="Chọn quận/huyện"
                            required
                            select
                            options={renderDistricts()}
                            value={valueDistrict}
                            onChange={handleDistrictChange}
                        />
                        <FormFieldComponent
                            title="Xã/Phường:"
                            placeholder="Chọn xã/phường"
                            required
                            select
                            options={renderWards()}
                            value={valueWard}
                            onChange={handleWardChange}
                        />
                    </FormGroup>
                </Form>
            </div>
            {isLoading && (
                <>
                    <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-1000 "></div>
                    <div className="fixed text-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white px-8 py-4 rounded z-50 animation-fadeInOut ">
                        <Loader active inverted inline="centered">
                            Loading
                        </Loader>
                    </div>
                </>
            )}
        </div>
    );
}

export default UserAddPage;
