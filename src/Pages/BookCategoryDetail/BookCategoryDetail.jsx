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
    Input,
} from 'semantic-ui-react';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function BookCategoryDetailPage() {
    useEffect(() => {
        document.title = 'Danh mục chi tiết';
    }, []);

    const [dataCategoryAll, setDataCategoryAll] = useState([]);
    const [dataCategoryDetail, setCategoryDetail] = useState([]);
    const [deleteCategoryId, setDeleteCategoryId] = useState();
    const [isSuccess, setIsSuccess] = useState(false);
    const [nameCategory, setNameCategory] = useState();
    const [open, setOpen] = useState(false);
    const [filterValue, setFilterValue] = useState('');

    const handleOpenDelete = (categoryId) => {
        setDeleteCategoryId(categoryId);
        setOpen(true);
    };

    useEffect(() => {
        axios
            .get('http://localhost:5000/categoryDetail')
            .then((response) => {
                setCategoryDetail(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        axios
            .get('http://localhost:5000/categoryAll')
            .then((response) => {
                setDataCategoryAll(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const getCategoryNameById = (categoryId) => {
        const category = dataCategoryAll.find((category) => category._id === categoryId);
        return category ? category.name : 'Unknown Category';
    };

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

    const filteredData = dataCategoryDetail.filter(
        (category) =>
            category.name.toLowerCase().includes(filterValue.toLowerCase()) ||
            getCategoryNameById(category.categoryAll_Id).toLowerCase().includes(filterValue.toLowerCase())
    );

    return (
        <div className="p-8">
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-4xl">Danh mục chi tiết</h3>
                <Link to="/bookCategoryDetailAdd" className="hover:text-white">
                    <Button primary>Thêm danh mục sách</Button>
                </Link>
            </div>
            <div className="my-4">
                <Input
                    icon="search"
                    placeholder="Tìm kiếm theo tên hoặc danh mục"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                />
            </div>
            <Table celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Tên</TableHeaderCell>
                        <TableHeaderCell>Danh mục</TableHeaderCell>
                        <TableHeaderCell textAlign="center">Actions</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredData.map((category) => (
                        <TableRow key={category._id}>
                            <TableCell>{category.name}</TableCell>
                            <TableCell>{getCategoryNameById(category.categoryAll_Id)}</TableCell>
                            <TableCell textAlign="center">
                                <div className="flex items-center justify-center gap-3">
                                    <Popup
                                        position="top center"
                                        content="Chi tiết"
                                        trigger={
                                            <Link to={'/bookCategoryDetailEdit'} state={{ dataDetail: category }}>
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
                                                onClick={() => handleOpenDelete(category._id)}
                                            >
                                                <Icon name="trash" />
                                            </Button>
                                        }
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
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

export default BookCategoryDetailPage;
