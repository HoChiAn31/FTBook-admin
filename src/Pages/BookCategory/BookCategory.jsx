import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
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
} from 'semantic-ui-react';
function BookCategoryPage() {
    useEffect(() => {
        document.title = 'Loại sách';
    }, []);

    const [dataCategoryAll, setDataCategoryAll] = useState([]);
    const [deleteCategoryId, setDeleteCategoryId] = useState();
    const [isSuccess, setIsSuccess] = useState(false);

    const [open, setOpen] = useState(false);
    const handleOpenDelete = (categoryId) => {
        setDeleteCategoryId(categoryId);
        setOpen(true);
    };

    useEffect(() => {
        axios
            .get('http://localhost:5000/categoryAll')
            .then((response) => {
                setDataCategoryAll(response.data);
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
    return (
        <div className="p-8">
            <title>Loại sách</title>
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-4xl">Loại sách</h3>
                <Link to="/bookCategoryAdd" className=" hover:text-white">
                    <Button primary>Thêm loại sách</Button>
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

                    <TableBody>
                        {dataCategoryAll.map((book) => (
                            <TableRow key={book._id}>
                                <TableCell>{book.name}</TableCell>

                                <TableCell>{book.description}</TableCell>
                                <TableCell textAlign="center">
                                    <div className="flex items-center justify-center gap-3">
                                        <Popup
                                            position="top center"
                                            content="Chi tiết"
                                            trigger={
                                                <Link to={'/bookCategoryEdit'} state={{ dataDetail: book }}>
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
                                                    style={{ background: 'transparent', border: 'none', padding: 0 }}
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

export default BookCategoryPage;
