import axios from 'axios';
import { CircleCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    ModalContent,
    ModalActions,
    Button,
    Header,
    Icon,
    Modal,
    FormField,
    TextArea,
    Select,
    Dimmer,
    Loader,
} from 'semantic-ui-react';
const countryOptions = [
    { key: 'cancelOrder1', value: 'Hết hàng', text: 'Hết hàng' },
    { key: 'cancelOrder2', value: 'Sai sót thông tin sản phẩm', text: 'Sai sót thông tin sản phẩm' },
    { key: 'cancelOrder3', value: 'Yêu cầu của khách hàng', text: 'Yêu cầu của khách hàng' },
    { key: 'cancelOrder4', value: 'Sản phẩm bị hỏng hoặc lỗi', text: 'Sản phẩm bị hỏng hoặc lỗi' },
    { key: 'cancelOrder5', value: 'cancelOrder5', text: 'Không thể liên lạc với khách hàng' },
    {
        key: 'cancelOrder6',
        value: 'Không nhận được tiền từ khách đã thanh toán',
        text: 'Quá trình thanh toán của khách bị lỗi phát sinh, cụ thể không nhận được tiền',
    },
];
function PaymentDetailPage() {
    useEffect(() => {
        document.title = 'Chi tiết đơn hàng';
    }, []);
    const location = useLocation();
    const { dataDetail } = location.state;
    console.log(dataDetail);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [orderStatus, setOrderStatus] = useState(dataDetail.orderStatus);
    const [dataProduct, setDataProduct] = useState([]);
    const [dataFilter, setDataFilter] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [valueRassonStatus, setValueRassonStatus] = useState();
    const [showNotification, setShowNotification] = useState(false);
    const [showNotificationCancel, setShowNotificationCancel] = useState(false);

    const handleStatusChange = (event) => {
        setOrderStatus(event.target.value);
    };
    useEffect(() => {
        axios
            .get('http://localhost:5000/product')
            .then((response) => {
                setDataProduct(response.data);
                setIsLoading(true);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    useEffect(() => {
        if (dataProduct && isLoading) {
            // console.log(dataProduct);
            // console.log(dataDetail);
            const filterData = dataProduct
                .filter((data) => dataDetail.products.some((product) => product.productId === data._id))
                .map((data) => {
                    const productDetail = dataDetail.products.find((product) => product.productId === data._id);
                    return {
                        ...data,
                        quantityPayment: productDetail ? productDetail.quantity : 0,
                    };
                });

            setDataFilter(filterData);
        }
    }, [dataProduct, isLoading]);
    function formatPrice(price) {
        return price.toLocaleString('de-DE') + 'đ';
    }
    const handleShipOrder = () => {
        axios
            .patch(`http://localhost:5000/payment/${dataDetail._id}`, {
                orderStatus: dataDetail.orderStatus === 'Đã giao hàng' ? 'Giao hàng thành công' : 'Đã giao hàng',
            })
            .then((response) => {
                setShowNotification(true); // Hiển thị thông báo
                setTimeout(() => {
                    setShowNotification(false); // Ẩn thông báo sau 5 giây
                }, 5000);
                navigate('/chart');
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };
    const handleChangeCancel = (e, data) => {
        setValueRassonStatus(data.value);
    };
    const handleCancelOrder = () => {
        console.log(valueRassonStatus);
        setOpen(false);
        axios
            .patch(`http://localhost:5000/payment/${dataDetail._id}`, {
                orderStatus: 'Hủy đơn',
                reasonStatus: valueRassonStatus,
            })
            .then((response) => {
                setShowNotificationCancel(true); // Hiển thị thông báo
                setTimeout(() => {
                    setShowNotificationCancel(false);
                    window.history.back(); // Ẩn thông báo sau 5 giây
                }, 3000);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };
    return (
        <div className=" bg-white p-6 rounded-lg ">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Chi tiết đơn hàng</h2>
                {(dataDetail.orderStatus === 'Đã đặt hàng' || dataDetail.orderStatus === 'Đã thanh toán') && (
                    <Modal
                        closeIcon
                        open={open}
                        trigger={<Button color="red">Hủy đơn hàng</Button>}
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                    >
                        <Header icon="archive" content="Bạn có chắc chắn muốn hủy đơn hàng này không?" />
                        <ModalContent>
                            <p className="text-xl mb-2">Lý do hủy đơn:</p>
                            <Select
                                placeholder="Select your country"
                                options={countryOptions}
                                className="w-full"
                                onChange={handleChangeCancel}
                            />
                        </ModalContent>
                        <ModalActions>
                            <Button color="red" onClick={() => setOpen(false)}>
                                <Icon name="remove" /> Không
                            </Button>
                            <Button color="green" onClick={handleCancelOrder}>
                                <Icon name="checkmark" /> Có
                            </Button>
                        </ModalActions>
                    </Modal>
                )}
            </div>
            <div className="mb-6">
                <div className="flex items-center justify-between my-4">
                    <div className="w-1/2">
                        <strong className="text-lg text-gray-700 mr-2">Mã đơn hàng:</strong>
                        <span className="text-gray-900">{dataDetail._id}</span>
                    </div>
                    <div className="w-1/2">
                        <strong className=" text-lg text-gray-700 mr-2">Tên khách hàng:</strong>
                        <span className="text-gray-900">{dataDetail.name}</span>
                    </div>
                </div>
                <div className="flex items-center justify-between my-4">
                    <div className="w-1/2">
                        <strong className="mr-2 text-lg text-gray-700">Địa chỉ nhận hàng:</strong>
                        <span className="text-gray-900">{dataDetail.address}</span>
                    </div>
                    <div className="w-1/2">
                        <strong className="mr-2 text-lg text-gray-700">Ngày đặt hàng:</strong>
                        <span className="text-gray-900">{new Date(dataDetail.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
                <div className="flex items-center justify-between my-4">
                    <div className="w-1/2">
                        <strong className="mr-2 text-lg text-gray-700">Phương thức thanh toán:</strong>
                        <span className="text-gray-900">{dataDetail.paymentMethod}</span>
                    </div>
                    <div className="w-1/2">
                        <strong className="mr-2 text-lg text-gray-700">Trang thái đơn hàng:</strong>
                        <span className="text-gray-900">{dataDetail.orderStatus}</span>
                    </div>
                </div>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Products</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="py-2 px-10 border-b text-left">Sản phẩm</th>
                            <th className="py-2 px-4 border-b text-center">Giá</th>
                            <th className="py-2 px-4 border-b text-center">Số lượng</th>
                            <th className="py-2 px-4 border-b text-center">Tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            dataFilter.map((product, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border-b flex items-center">
                                        <img
                                            src={product.image[0]}
                                            alt={product.name}
                                            className="h-32 w-32 object-cover rounded-md mr-4"
                                        />
                                        <div>
                                            <div className="text-gray-900 font-semibold">{product.name}</div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b text-center text-gray-900">
                                        {formatPrice(product.priceDiscount ? product.priceDiscount : product.priceSell)}
                                    </td>
                                    <td className="py-2 px-4 border-b text-center text-gray-900">
                                        {product.quantityPayment}
                                    </td>
                                    <td className="py-2 px-4 border-b text-center text-green-600">
                                        {product.priceDiscount
                                            ? formatPrice(product.priceDiscount * product.quantityPayment)
                                            : formatPrice(product.priceSell * product.quantityPayment)}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <Dimmer active inverted>
                                <Loader inverted content="Loading" />
                            </Dimmer>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col items-end  mt-6">
                <div className="mb-4 ">
                    <div className="flex justify-between gap-96">
                        <span className="text-gray-700 text-xl">Tổng tiền đơn hàng:</span>
                        <span className="text-black font-semibold text-lg">
                            {formatPrice(dataDetail.totalPrice - 19000)}
                        </span>
                    </div>
                    <div className="flex justify-between mt-2 gap-96">
                        <span className="text-gray-700 text-xl">Giảm giá:</span>
                        <span className="text-black font-semibold text-lg">-19.000đ</span>
                    </div>
                    <div className="flex justify-between mt-2 gap-96">
                        <span className="text-gray-700 text-xl">Phí vận chuyển:</span>
                        <span className="text-black font-semibold text-lg">19.000đ</span>
                    </div>
                    <div className="flex justify-between mt-2 border-t pt-2 gap-96">
                        <span className="text-gray-700 text-xl">Tổng tiền thanh toán:</span>
                        <span className=" font-semibold text-2xl text-green-500">
                            {formatPrice(dataDetail.totalPrice)}
                        </span>
                    </div>
                    <div className="flex items-center justify-center mt-8">
                        <button
                            className=" bg-blue text-white min-w-[320px] px-12 py-3 text-lg rounded hover:bg-blueHover focus:outline-none "
                            onClick={handleShipOrder}
                            disabled={dataDetail.orderStatus === 'Hủy đơn'}
                        >
                            {dataDetail.orderStatus === 'Đã giao hàng' ? 'Giao hàng thành công' : 'Giao hàng'}
                        </button>
                    </div>
                </div>
            </div>

            {showNotification && (
                <div className="fixed top-4 right-4 bg-white text-black py-4 px-4 rounded shadow-2xl border-l-2 border-green-500 animate-slide-in-right ">
                    <div className="flex justify-between items-center gap-2 text-lg">
                        <CircleCheck className="text-green-500" />
                        <p>Đơn hàng đã được gửi thành công!</p>
                    </div>
                </div>
            )}

            {showNotificationCancel && (
                <div className="fixed top-4 right-4 bg-white text-black py-4 px-4 rounded shadow-2xl border-l-2 border-green-500 animate-slide-in-right ">
                    <div className="flex justify-between items-center gap-2 text-lg">
                        <CircleCheck className="text-green-500" />
                        <p>Hủy đơn thành công!</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PaymentDetailPage;
