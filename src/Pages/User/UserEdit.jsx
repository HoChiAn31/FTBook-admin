import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
} from 'semantic-ui-react';
import FormFieldComponent from '../../Components/FormFieldComponent';
import axios from 'axios';
import './user.css';
import moment from 'moment/moment';
const keyRole = [
    { key: 'admin', value: 'admin', text: 'Quản trị viên' },
    { key: 'user', value: 'user', text: 'Người dùng' },
];
function UserEditPage() {
    useEffect(() => {
        document.title = 'Chi tiết người dùng';
    }, []);
    const location = useLocation();
    const { dataDetail } = location.state;
    // console.log(dataDetail);
    const [valueName, setValueName] = useState(dataDetail.fullName);
    const [valueEmail, setValueEmail] = useState(dataDetail.email);
    const [valueIsBan, setValueIsBan] = useState(dataDetail.isBan);
    const [valueIsReview, setValueIsReview] = useState(dataDetail.isReview);
    const [valuePhone, setValuePhone] = useState(dataDetail.phone);
    const [valueBirthday, setValueBirthday] = useState(dataDetail.birthday);
    const [valuePointCoin, setValuePointCoin] = useState(dataDetail.pointCoin);
    const [valueAddress, setValueAddress] = useState(dataDetail.addresses);
    const [valueGender, setValueGender] = useState(dataDetail.gender);
    const [valueRole, setValueRole] = useState(dataDetail.role);
    const [valueLimit, setValueLimit] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    const handleValueEmail = (e) => {
        setValueEmail(e.target.value);
    };
    const handleValueName = (e) => {
        setValueName(e.target.value);
    };
    const handleUpdate = () => {
        axios
            .patch(`https://backend-book-store-two.vercel.app/user/${dataDetail._id}`, {
                fullName: valueName,
                email: valueEmail,
                phone: valuePhone,
                birtday: valueBirthday,
                gender: valueGender,
                isReview: valueIsReview,
                isBan: valueIsBan,
                pointCoin: valuePointCoin,
                role: valueRole,
            })
            .then((response) => {
                navigate('/user');
            })
            .catch((error) => {
                console.error('Error posting data:', error);
            });
    };
    const handleChangeBan = (e, { value }) => {
        setValueIsBan(!value);
    };
    const handleChangeReview = (e, { value }) => {
        setValueIsReview(!value);
    };
    const handleChangeLimitReview = (e, { value }) => {
        setValueLimit(!value);
    };
    const increaseQuantity = () => {
        setQuantity(quantity + 1);
        if (quantity > 0) {
        }
        if (quantity === 2) {
            setOpenModal(true);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };
    const handleChangeRole = (e, { value }) => {
        setValueRole(value);
    };
    const handleChangePointCoin = (e, { value }) => {
        setValuePointCoin(value);
    };
    return (
        <div className="p-5">
            <div className="flex items-center justify-between fixed top-0 left-0 right-0 bg-white z-50 py-4  pl-[18%] shadow-md  ">
                <h3 className="font-bold text-4xl">Chi tiết người dùng {} </h3>
                <div>
                    <Button primary onClick={handleUpdate}>
                        Cập nhật
                    </Button>
                    <Link to="/bookCategory">
                        <Button color="red">Hủy</Button>
                    </Link>
                </div>
            </div>
            <div className="mb-5 py-16">
                <Form size="large" widths={2}>
                    <FormGroup widths={2}>
                        <FormFieldComponent
                            title="Tên người dùng"
                            placeholder="Nhập tên sách"
                            // required
                            value={valueName}
                            onChange={handleValueName}
                        />

                        <FormFieldComponent
                            title="Email"
                            placeholder="Nhập mô tả sản phẩm"
                            // required
                            // value={dataDetail.Email}
                            value={valueEmail}
                            onChange={handleValueEmail}
                        />
                    </FormGroup>
                    <FormGroup widths={2}>
                        <FormFieldComponent
                            title="Vai trò"
                            // required
                            select
                            options={keyRole}
                            value={valueRole}
                            onChange={handleChangeRole}
                        />
                        <FormFieldComponent
                            title="Số điện thoại"
                            // placeholder="Nhập tên sách"
                            // required
                            value={valuePhone}
                        />
                    </FormGroup>
                    <FormGroup widths={2}>
                        <FormFieldComponent
                            title="Ngày sinh"
                            // placeholder="Nhập mô tả sản phẩm"
                            // required
                            // value={dataDetail.Email}
                            value={moment(valueBirthday).format('YYYY-MM-DD')}
                            // onChange={handleValueEmail}
                        />
                        <FormFieldComponent
                            title="Giới tính"
                            // required
                            value={valueGender}
                        />
                    </FormGroup>
                    <FormGroup widths={2}>
                        <FormFieldComponent
                            title="Địa chỉ"
                            // placeholder="Nhập mô tả sản phẩm"
                            // required
                            // value={dataDetail.Email}

                            value={
                                valueAddress &&
                                `${valueAddress.ward}, ${valueAddress.district}, ${valueAddress.province} `
                            }
                            // onChange={handleValueEmail}
                        />
                        <FormFieldComponent
                            title="Điểm tích lũy"
                            // placeholder="Nhập tên sách"
                            // required
                            value={valuePointCoin}
                            onChange={handleChangePointCoin}
                        />
                    </FormGroup>
                    <div className="flex items-center my-5">
                        <p className={` text-lg font-bold ${valueIsBan ? `text-red` : ''}  mr-4`}>Cấm người dùng:</p>
                        <Radio toggle value={valueIsBan} onChange={handleChangeBan} />
                    </div>
                    <div className="flex gap-20">
                        <div className="flex items-center my-5">
                            <p className={` text-lg font-bold ${quantity > 0 ? `text-red` : ''}  mr-4`}>
                                Cảnh báo người dùng:
                            </p>
                            <Radio toggle value={valueIsReview} onChange={handleChangeLimitReview} />
                        </div>
                        <div className="flex items-center my-5">
                            <p className={` text-lg font-bold ${valueIsReview ? `text-red` : ''}  mr-4`}>
                                Hạn chế bình luận:
                            </p>
                            <Radio toggle value={valueIsReview} onChange={handleChangeReview} />
                        </div>
                        <div className="flex items-center my-5">
                            <p className={` text-lg font-bold   mr-4`}>Số lần cảnh báo:</p>
                            <div className="flex items-center">
                                <Button
                                    className="px-3 py-2 bg-gray-200 rounded-l-md  hover:bg-red-300 m-0 "
                                    onClick={decreaseQuantity}
                                    // className=" p-0"
                                >
                                    -
                                </Button>
                                <div className="flex justify-between items-center mx-4  px-4 py-4 h-7 bg-gray-200">
                                    <p> {quantity}</p>
                                </div>
                                <Button
                                    className="px-3 py-2 bg-gray-200  rounded-r-md hover:bg-gray-300 m-0"
                                    onClick={increaseQuantity}
                                >
                                    +
                                </Button>
                                <Modal
                                    closeIcon
                                    open={openModal}
                                    // trigger={<Button>Show Modal</Button>}
                                    onClose={() => setOpenModal(false)}
                                    onOpen={() => setOpenModal(true)}
                                >
                                    <Header icon="archive" content="Archive Old Messages" />
                                    <ModalContent>
                                        <p>Bạn có muốn hạn chế người dùng bình luận?</p>
                                    </ModalContent>
                                    <ModalActions>
                                        <Button
                                            color="red"
                                            onClick={() => {
                                                setOpenModal(false);
                                                setQuantity(2);
                                            }}
                                        >
                                            <Icon name="remove" /> Hủy
                                        </Button>
                                        <Button
                                            color="green"
                                            onClick={() => {
                                                setOpenModal(false);
                                                setValueIsReview(true);
                                            }}
                                        >
                                            <Icon name="checkmark" /> Có
                                        </Button>
                                    </ModalActions>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default UserEditPage;
