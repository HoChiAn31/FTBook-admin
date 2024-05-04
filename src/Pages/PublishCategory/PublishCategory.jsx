import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
const dataPublish = [
    {
        _id: '66198b74c9f3ef21a7378d88',
        name: 'Tân Văn',
        description: 'Chuyên về sách văn học, sách thiếu nhi và sách văn hóa - lịch sử.',
    },
    {
        _id: '66198b74c9f3ef21a7378d85',
        name: 'Văn Học',
        description: 'Tập trung vào xuất bản các tác phẩm văn học, tiểu thuyết, truyện ngắn và thơ.',
    },
    {
        _id: '66198b74c9f3ef21a7378d8a',
        name: 'Văn Nghệ',
        description: 'Tập trung vào việc xuất bản các tác phẩm văn học, nghệ thuật và văn hóa.',
    },
    {
        _id: '66198b74c9f3ef21a7378d86',
        name: 'Thanh Niên',
        description:
            'Chuyên về sách dành cho thanh thiếu niên và người trẻ, bao gồm cả sách giáo trình và sách văn học.',
    },
    {
        _id: '66198b74c9f3ef21a7378d89',
        name: 'Thế Giới',
        description: 'Tập trung vào việc xuất bản sách về nhiều chủ đề khác nhau, từ văn học đến khoa học tự nhiên.',
    },
    {
        _id: '66198b74c9f3ef21a7378d87',
        name: 'Hồng Đức',
        description: 'Nổi tiếng với việc xuất bản sách giáo khoa và tài liệu giáo trình cho các trường học.',
    },
];
function PublishCategoryPage() {
    useEffect(() => {
        document.title = 'Loại sách';
    }, []);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);
    return (
        <div className="p-8">
            <title>Danh mục Nhà xuất bản</title>
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-4xl">Danh mục Nhà xuất bản</h3>
                <Link to="/publishCategoryAdd" className=" hover:text-white">
                    <Button primary>Thêm Nhà xuất bản</Button>
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
                        {dataPublish.map((book) => (
                            <TableRow key={book._id}>
                                <TableCell>{book.name}</TableCell>

                                <TableCell>{book.description}</TableCell>
                                <TableCell textAlign="center">
                                    <div className="flex items-center justify-center gap-3">
                                        <Popup
                                            position="top center"
                                            content="Chi tiết"
                                            trigger={
                                                <Link to={'/publishCategoryEdit'} state={{ bookDetail: book }}>
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
                                                    onClick={handleOpen}
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
                                <Button color="green" onClick={() => setOpen(false)}>
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
        </div>
    );
}

export default PublishCategoryPage;
