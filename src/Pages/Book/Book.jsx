import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
    Loader,
    Input,
    Dimmer,
    Pagination,
} from 'semantic-ui-react';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CircleCheck } from 'lucide-react';

function BookPage() {
    const [open, setOpen] = useState(false);
    const [deleteBookId, setDeleteBookId] = useState();
    const [dataBooks, setDataBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [filterValue, setFilterValue] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:5000/product')
            .then((response) => {
                setDataBooks(response.data);
                setIsLoading(true);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        if (dataBooks) {
            const filteredData = dataBooks.filter(
                (book) =>
                    book.name.toLowerCase().includes(filterValue.toLowerCase()) ||
                    book.author.toLowerCase().includes(filterValue.toLowerCase()),
            );
            setFilteredData(filteredData);
        }
    }, [filterValue, dataBooks]);

    const handleOpenDelete = (bookId) => {
        setDeleteBookId(bookId);
        setOpen(true);
    };

    const handleDelete = () => {
        axios
            .delete(`http://localhost:5000/product/${deleteBookId}`)
            .then((response) => {
                console.log('Category deleted successfully:', response.data);
                setOpen(false);
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                }, 1200);
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error deleting category:', error);
            });
    };
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
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-4xl">Sách</h3>
            </div>

            <div className="mt-4 flex justify-between items-center">
                <Input
                    icon="search"
                    placeholder="Nhập tên sách hoặc tác giả để lọc..."
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    className="w-1/3"
                />
                <Link to="/bookAdd" className=" hover:text-white">
                    <Button primary>Thêm sách</Button>
                </Link>
            </div>

            <div className="my-6">
                {!isLoading ? (
                    <Dimmer active inverted>
                        <Loader inverted content="Loading" />
                    </Dimmer>
                ) : (
                    <div>
                        <Table celled>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderCell className="px-4">Tên</TableHeaderCell>
                                    <TableHeaderCell>Giá hiện tại</TableHeaderCell>
                                    <TableHeaderCell textAlign="center">Tác giả</TableHeaderCell>
                                    <TableHeaderCell>Mô tả</TableHeaderCell>
                                    <TableHeaderCell textAlign="center">Actions</TableHeaderCell>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {currentData.map((book) => (
                                    <TableRow key={book._id}>
                                        <TableCell className=" py-1 px-4" width={3}>
                                            {book.name}
                                        </TableCell>
                                        <TableCell>
                                            {book.priceDiscount ? book.priceDiscount : book.priceSell}
                                        </TableCell>
                                        <TableCell textAlign="center">{book.author}</TableCell>
                                        <TableCell className=" line-clamp-3 py-1">{book.description}</TableCell>
                                        <TableCell textAlign="center">
                                            <div className="flex items-center justify-between">
                                                <Popup
                                                    position="top center"
                                                    content="Chi tiết"
                                                    trigger={
                                                        <Link to="/bookEdit" state={{ dataDetailBook: book }}>
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
                )}
            </div>
            {isSuccess && (
                <>
                    <div className="fixed top-4 right-1 z-[100] min-w-56 bg-white text-black py-6 px-4 rounded shadow-2xl border-l-4 border-green animate-slide-in-right">
                        <div className="flex  items-center gap-2 text-lg">
                            <CircleCheck style={{ color: '#68FD87' }} />
                            <p>Xóa thành công!</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default BookPage;
