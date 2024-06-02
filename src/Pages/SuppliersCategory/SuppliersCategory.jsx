import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { CircleCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

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
    Dimmer,
    Loader,
    Input,
} from 'semantic-ui-react';

function SuppliersCategoryPage() {
    useEffect(() => {
        document.title = 'Nhà cung cấp';
    }, []);
    const [dataSupplier, setDateSupplier] = useState([]);
    const [deleteSupplierId, setDateSupplierId] = useState();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filterValue, setFilterValue] = useState('');

    const [open, setOpen] = useState(false);
    const handleOpenDelete = (categoryId) => {
        console.log(categoryId);
        setDateSupplierId(categoryId);
        setOpen(true);
    };
    useEffect(() => {
        axios
            .get('http://localhost:5000/categorySupplier')
            .then((response) => {
                setDateSupplier(response.data);
                setIsLoading(true);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const handleDelete = () => {
        axios
            .delete(`http://localhost:5000/categorySupplier/${deleteSupplierId}`)
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
    const getCategoryNameById = (categoryId) => {
        const category = dataSupplier.find((category) => category._id === categoryId);
        return category ? category.name : 'Unknown Category';
    };
    const filteredData = dataSupplier.filter(
        (category) =>
            category.name.toLowerCase().includes(filterValue.toLowerCase()) ||
            getCategoryNameById(category.categoryAll_Id).toLowerCase().includes(filterValue.toLowerCase()),
    );
    // Số mục trên mỗi trang
    const itemsPerPage = 5;
    // Trang hiện tại
    const [currentPage, setCurrentPage] = useState(1);
    // Tính toán vị trí bắt đầu và kết thúc của mục trên trang hiện tại
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);

    // Dữ liệu trên trang hiện tại
    let currentData = filteredData.length <= itemsPerPage ? filteredData : filteredData.slice(startIndex, endIndex);

    // Tổng số trang
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Hàm xử lý khi chuyển trang
    const handlePaginationChange = (e, { activePage }) => {
        // Đảm bảo activePage không vượt quá totalPages
        const newCurrentPage = Math.min(activePage, totalPages);
        setCurrentPage(newCurrentPage);
    };
    return (
        <div className="p-8">
            <title>Danh mục Nhà cung cấp</title>
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-4xl">Danh mục Nhà cung cấp</h3>
            </div>
            <div className="my-4 flex items-center justify-between">
                <Input
                    icon="search"
                    placeholder="Tìm kiếm theo tên hoặc danh mục"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    className="w-1/2"
                />
                <Link to="/suppliersCategoryAdd" className=" hover:text-white">
                    <Button primary>Thêm Nhà cung cấp</Button>
                </Link>
            </div>
            <div className="my-12">
                <Table celled>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>Tên</TableHeaderCell>

                            <TableHeaderCell>Mô tả</TableHeaderCell>
                            <TableHeaderCell textAlign="center">Actions</TableHeaderCell>
                        </TableRow>
                    </TableHeader>

                    {isLoading ? (
                        <TableBody>
                            {currentData.map((book) => (
                                <TableRow key={book._id}>
                                    <TableCell>{book.name}</TableCell>
                                    <TableCell>{book.description}</TableCell>
                                    <TableCell textAlign="center">
                                        <div className="flex items-center justify-center gap-3">
                                            <Popup
                                                position="top center"
                                                content="Chi tiết"
                                                trigger={
                                                    <Link to={'/suppliersCategoryEdit'} state={{ dataDetail: book }}>
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </Link>
                                                }
                                            />

                                            <Popup
                                                position="top center"
                                                content="Xóa sản phẩm"
                                                trigger={
                                                    <Button
                                                        icon
                                                        style={{
                                                            background: 'transparent',
                                                            border: 'none',
                                                            padding: 0,
                                                        }}
                                                        onClick={() => handleOpenDelete(book._id)}
                                                    >
                                                        <Icon name="trash" />
                                                    </Button>
                                                }
                                            />
                                        </div>
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
                    ) : (
                        <Dimmer active inverted>
                            <Loader inverted content="Loading" />
                        </Dimmer>
                    )}
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
            {isSuccess && (
                <>
                    <div className="fixed top-4 right-1 z-[100] min-w-56 bg-white text-black py-6 px-4 rounded shadow-2xl border-l-4 border-green animate-slide-in-right">
                        <div className="flex items-center gap-2 text-lg">
                            <CircleCheck style={{ color: '#68FD87' }} />
                            <p>Xóa thành công!</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default SuppliersCategoryPage;
