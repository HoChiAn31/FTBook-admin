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
} from 'semantic-ui-react';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
            const filteredData = dataBooks.filter((book) =>
                book.name.toLowerCase().includes(filterValue.toLowerCase()) ||
                book.author.toLowerCase().includes(filterValue.toLowerCase())
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

    return (
        <div className="p-8">
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-4xl">Sách</h3>
                <Link to="/bookAdd" className=" hover:text-white">
                    <Button primary>Thêm sách</Button>
                </Link>
            </div>

            <div className="mt-4">
                <Input
                    icon="search"
                    placeholder="Nhập tên sách hoặc tác giả để lọc..."
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                />
            </div>

            <div className="my-6">
                {!isLoading ? (
                    <div className="flex items-center justify-center">
                        <Loader active inline="centered" />
                    </div>
                ) : (
                    <>
                        <Table celled>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderCell>Tên</TableHeaderCell>
                                    <TableHeaderCell>Giá hiện tại</TableHeaderCell>
                                    <TableHeaderCell textAlign="center">Tác giả</TableHeaderCell>
                                    <TableHeaderCell>Mô tả</TableHeaderCell>
                                    <TableHeaderCell textAlign="center">Actions</TableHeaderCell>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filteredData.map((book) => (
                                    <TableRow key={book._id}>
                                        <TableCell>{book.name}</TableCell>
                                        <TableCell>
                                            {book.priceDiscount ? book.priceDiscount : book.priceSell}
                                        </TableCell>
                                        <TableCell textAlign="center">{book.author}</TableCell>
                                        <TableCell>{book.description}</TableCell>
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
                    </>
                )}
            </div>
            {isSuccess && (
                <>
                    <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"></div>
                    <div className="fixed text-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-8 py-4 rounded z-50 animation-fadeInOut ">
                        <p>Đã xóa thành công</p>
                    </div>
                </>
            )}
        </div>
    );
}

export default BookPage;
