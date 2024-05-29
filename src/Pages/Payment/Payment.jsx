import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Book, BookType, BringToFront, ShoppingCart, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import ReactFrappeChart from 'react-frappe-charts';
import { Link } from 'react-router-dom';
import {
    TableRow,
    TableHeaderCell,
    TableHeader,
    TableCell,
    TableBody,
    Table,
    Popup,
    Icon,
    ModalActions,
    Button,
    Header,
    Modal,
    Pagination,
    Loader,
} from 'semantic-ui-react';

function TheOrderPage() {
    useEffect(() => {
        document.title = 'Loại sách';
    }, []);

    const [dataCategoryAll, setDataCategoryAll] = useState([]);
    const [deleteCategoryId, setDeleteCategoryId] = useState();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState('Tất cả');
    const [dataFilter, setDataFilter] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpenDelete = (categoryId) => {
        setDeleteCategoryId(categoryId);
        setOpen(true);
    };

    useEffect(() => {
        axios
            .get('http://localhost:5000/payment')
            .then((response) => {
                setDataCategoryAll(response.data);
                // setIsLoading(true);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const handleDelete = () => {
        axios
            .delete(`http://localhost:5000/categoryAll/${deleteCategoryId}`)
            .then((response) => {
                console.log('Category deleted successfully:', response.data);
                setOpen(false);
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                }, 800);
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error deleting category:', error);
            });
    };
    // ====================================================================
    // Số mục trên mỗi trang
    const itemsPerPage = 5;
    // Trang hiện tại
    const [currentPage, setCurrentPage] = useState(1);
    // Tính toán vị trí bắt đầu và kết thúc của mục trên trang hiện tại
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, dataCategoryAll.length);

    // Dữ liệu trên trang hiện tại
    let currentData =
        dataCategoryAll.length <= itemsPerPage ? dataCategoryAll : dataCategoryAll.slice(startIndex, endIndex);

    // Tổng số trang
    const totalPages = Math.ceil(dataCategoryAll.length / itemsPerPage);
    // if (currentPage === totalPages && currentData.length < itemsPerPage) {
    //     // Tính toán số ô trống cần hiển thị
    //     const emptyCells = itemsPerPage - currentData.length;
    //     // Tạo mảng chứa các ô trống
    //     const emptyCellsArray = Array.from({ length: emptyCells }, () => ({ empty: true }));
    //     // Kết hợp dữ liệu hiện tại với các ô trống
    //     currentData = [...currentData, ...emptyCellsArray];
    // }
    // Hàm xử lý khi chuyển trang
    const handlePaginationChange = (e, { activePage }) => {
        // Đảm bảo activePage không vượt quá totalPages
        const newCurrentPage = Math.min(activePage, totalPages);
        setCurrentPage(newCurrentPage);
    };
    useEffect(() => {
        if (filter) {
            let filterData = dataCategoryAll.filter((data) => data.orderStatus === filter);
            if (filterData.length === 0) {
                setDataFilter([]);
            }
            setDataFilter(filterData);
        }
    }, [filter]);
    function formatPrice(price) {
        return price.toLocaleString('de-DE') + 'đ';
    }
    return (
        <div className=" px-5 ">
            <div>
                <div className="my-4">
                    <div className=" py-3">
                        <p className="text-3xl font-bold">Các đơn hàng</p>
                    </div>
                    <div className="w-1/2 flex items-center mb-6">
                        <select
                            className="border border-gray-300 rounded p-2 mt-1 w-1/2"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="Tất cả">Tất cả đơn hàng</option>
                            <option value="Đã đặt hàng">Đã đặt hàng</option>
                            <option value="Đã gửi hàng">Đã gửi hàng</option>
                            <option value="Giao hàng thành công">Giao hàng thành công</option>
                            <option value="Huỷ đơn">Huỷ đơn</option>
                        </select>
                    </div>
                    {/* ================================= */}
                    <div className="mb-12">
                        <Table celled>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderCell>Mã đơn hàng</TableHeaderCell>
                                    <TableHeaderCell>Tên</TableHeaderCell>
                                    <TableHeaderCell>Địa chỉ</TableHeaderCell>
                                    <TableHeaderCell textAlign="center">Tổng tiền</TableHeaderCell>

                                    <TableHeaderCell textAlign="center">Mô tả</TableHeaderCell>
                                    <TableHeaderCell textAlign="center">Actions</TableHeaderCell>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {(filter === 'Tất cả' ? currentData : dataFilter).map((data) => (
                                    <TableRow key={data._id}>
                                        <TableCell>{data._id}</TableCell>
                                        <TableCell>{data.name}</TableCell>
                                        <TableCell>{data.address}</TableCell>
                                        <TableCell textAlign="center">{formatPrice(data.totalPrice)}</TableCell>

                                        <TableCell textAlign="center">
                                            {data._id ? (
                                                data.orderStatus === 'Đã đặt hàng' ? (
                                                    <div className=" bg-[#FFF0ED] text-[#ED7644] py-2 rounded-md font-bold">
                                                        {data.orderStatus}
                                                    </div>
                                                ) : data.orderStatus === 'Đã gửi hàng' ? (
                                                    <div className=" bg-[#F7F8FD] text-[#6481E0] py-2 rounded-md font-bold">
                                                        {data.orderStatus}
                                                    </div>
                                                ) : data.orderStatus === 'Giao hàng thành công' ? (
                                                    <div className=" bg-[#F2F7F4] text-[#53CD75] py-2 rounded-md font-bold">
                                                        {data.orderStatus}
                                                    </div>
                                                ) : data.orderStatus === 'Hủy đơn' ? (
                                                    <div className=" bg-[#F2F7F4] text-[#EB5656] py-2 rounded-md font-bold">
                                                        {data.orderStatus}
                                                    </div>
                                                ) : null
                                            ) : null}
                                        </TableCell>

                                        <TableCell
                                            textAlign="center"
                                            className="flex items-center justify-center gap-3"
                                        >
                                            {data._id ? (
                                                <Popup
                                                    position="top center"
                                                    content="Chi tiết"
                                                    trigger={
                                                        <Link to={'/paymentDetails'} state={{ dataDetail: data }}>
                                                            <FontAwesomeIcon icon={faEye} />
                                                        </Link>
                                                    }
                                                />
                                            ) : null}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <Modal open={open} onClose={() => setOpen(false)} onOpen={() => setOpen(true)}>
                                    <Header icon="archive" content="Bạn có chắc chắn muốn xóa sản phẩm không?" />
                                    <ModalActions>
                                        <Button color="green" onClick={handleDelete}>
                                            <Icon name="checkmark" /> Yes
                                        </Button>
                                        <Button color="red" onClick={() => setOpen(false)}>
                                            <Icon name="remove" /> No
                                        </Button>
                                    </ModalActions>
                                </Modal>
                            </TableBody>
                        </Table>
                        <div className=" text-center">
                            <Pagination
                                activePage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePaginationChange}
                                prevItem={false}
                                nextItem={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TheOrderPage;
