import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

// import Button from '@mui/material/Button';
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
} from 'semantic-ui-react';

const dataBook = [
    {
        _id: '662523afd636426682e12ada',
        name: 'Nghệ Thuật Bán Hàng Bằng Câu Chuyện',
        categoryAllId: '661949cc343796e299686dc7',
        categoryDetailId: '66194f95343796e299686ddc',
        categorySupplierId: '66198823243a328164578cc1',
        categoryPublishId: '66198b74c9f3ef21a7378d89',
        categoryYearId: '66198bd0c9f3ef21a7378d94',
        image: [
            'https://cdn0.fahasa.com/media/flashmagazine/images/page_images/nghe_thuat_ban_hang_bang_cau_chuyen_tai_ban_2023/2023_03_21_10_28_39_1-390x510.jpg?_gl=1*1wuvo8a*_ga*MjM5MDM3ODcxLjE3MTMzNjIxMzU.*_ga_460L9JMC2G*MTcxMzcwNzM4Mi44LjEuMTcxMzcwNzYwMC42MC4wLjE0MTk5MzY0Mjc.*_gcl_au*MzUxNzI2NTczLjE3MTMzNjIxMzQ.',
            'https://cdn0.fahasa.com/media/flashmagazine/images/page_images/nghe_thuat_ban_hang_bang_cau_chuyen_tai_ban_2023/2023_03_21_10_28_39_2-390x510.jpg',
            'https://cdn0.fahasa.com/media/flashmagazine/images/page_images/nghe_thuat_ban_hang_bang_cau_chuyen_tai_ban_2023/2023_03_21_10_28_39_3-390x510.jpg',
            'https://cdn0.fahasa.com/media/flashmagazine/images/page_images/nghe_thuat_ban_hang_bang_cau_chuyen_tai_ban_2023/2023_03_21_10_28_39_4-390x510.jpg',
        ],
        priceOld: 188000,
        priceCurrent: 146000,
        author: 'Paul Smith',
        form: 'Bìa Mềm',
        language: 'Tiếng Việt',
        yearOfManufacture: 2023,
        size: '20.5 x 13 x 1 cm',
        pageQuantity: 200,
        description:
            'Câu chuyện là vũ khí bán hàng quan trọng nhất của người bán hàng. Tuy nhiên rất nhiều nhân viên quản lý kinh doanh và nhân viên bán hàng thường kể chuyện rất dở. Rất dở! Các câu chuyện của họ nhàm chán, lộn xộn, thường vô nghĩa, và hầu hết luôn hướng về bản thân.',
        rate: 4,
        ratingPoint: 100,
        numberOfVisit: 5,
    },
    {
        _id: '662523afd636426682e12ad1',
        name: 'Nghệ Thuật Bán Hàng Bằng Câu Chuyện2',
        categoryAllId: '661949cc343796e299686dc7',
        categoryDetailId: '66194f95343796e299686ddc',
        categorySupplierId: '66198823243a328164578cc1',
        categoryPublishId: '66198b74c9f3ef21a7378d89',
        categoryYearId: '66198bd0c9f3ef21a7378d94',
        image: [
            'https://cdn0.fahasa.com/media/flashmagazine/images/page_images/nghe_thuat_ban_hang_bang_cau_chuyen_tai_ban_2023/2023_03_21_10_28_39_1-390x510.jpg?_gl=1*1wuvo8a*_ga*MjM5MDM3ODcxLjE3MTMzNjIxMzU.*_ga_460L9JMC2G*MTcxMzcwNzM4Mi44LjEuMTcxMzcwNzYwMC42MC4wLjE0MTk5MzY0Mjc.*_gcl_au*MzUxNzI2NTczLjE3MTMzNjIxMzQ.',
            'https://cdn0.fahasa.com/media/flashmagazine/images/page_images/nghe_thuat_ban_hang_bang_cau_chuyen_tai_ban_2023/2023_03_21_10_28_39_2-390x510.jpg',
            'https://cdn0.fahasa.com/media/flashmagazine/images/page_images/nghe_thuat_ban_hang_bang_cau_chuyen_tai_ban_2023/2023_03_21_10_28_39_3-390x510.jpg',
            'https://cdn0.fahasa.com/media/flashmagazine/images/page_images/nghe_thuat_ban_hang_bang_cau_chuyen_tai_ban_2023/2023_03_21_10_28_39_4-390x510.jpg',
        ],
        priceOld: 198000,
        priceCurrent: 156000,
        author: 'Paul Smith',
        form: 'Bìa Mềm',
        language: 'Tiếng Việt',
        yearOfManufacture: 2023,
        size: '20.5 x 13 x 1 cm',
        pageQuantity: 200,
        description:
            'Câu chuyện là vũ khí bán hàng quan trọng nhất của người bán hàng. Tuy nhiên rất nhiều nhân viên quản lý kinh doanh và nhân viên bán hàng thường kể chuyện rất dở. Rất dở! Các câu chuyện của họ nhàm chán, lộn xộn, thường vô nghĩa, và hầu hết luôn hướng về bản thân.',
        rate: 4,
        ratingPoint: 100,
        numberOfVisit: 5,
    },
];
function BookPage() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);
    const [deleteBookId, setDeleteBookId] = useState();
    const [dataBooks, setDateBooks] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:5000/product')
            .then((response) => {
                setDateBooks(response.data);
                setIsLoading(true);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    });
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
            <div className="my-12">
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
                                {dataBooks.map((book) => (
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
