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
} from 'semantic-ui-react';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function UserPage() {
    useEffect(() => {
        document.title = 'Hồ sơ';
    }, []);

    const [dataUser, setDataUser] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [sortedColumn, setSortedColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);
    const [deleteUserId, setDeleteUserId] = useState();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleOpenDelete = (userId) => {
        setDeleteUserId(userId);
        setOpen(true);
    };

    useEffect(() => {
        axios
            .get('https://backend-book-store-two.vercel.app/user')
            .then((response) => {
                const updatedData = response.data.map((user) => ({
                    ...user,
                    fullName: user.fullName || `${user.lastName} ${user.firstName}`,
                }));
                setDataUser(updatedData);
                setIsLoading(true);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleDelete = () => {
        axios
            .delete(`https://backend-book-store-two.vercel.app/user/${deleteUserId}`)
            .then((response) => {
                console.log('User deleted successfully:', response.data);
                setOpen(false);
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                }, 800);
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error deleting user:', error);
            });
    };

    const handleSort = (columnName) => {
        const isAscending = sortedColumn === columnName && sortDirection === 'ascending';
        setSortedColumn(columnName);
        setSortDirection(isAscending ? 'descending' : 'ascending');

        // Thực hiện sắp xếp dữ liệu
        const sorted = [...(sortedData.length > 0 ? sortedData : dataUser)].sort((a, b) => {
            const nameA = a[columnName].toUpperCase(); // Chuyển tên thành chữ hoa để sắp xếp
            const nameB = b[columnName].toUpperCase();

            if (nameA < nameB) {
                return isAscending ? -1 : 1;
            }
            if (nameA > nameB) {
                return isAscending ? 1 : -1;
            }
            return 0;
        });
        setSortedData(sorted);
    };

    const filteredData = dataUser.filter((user) => {
        return (
            user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="p-8">
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-4xl">Người dùng</h3>
            </div>
            <div className="my-4 flex items-center justify-between">
                <Input
                    icon="search"
                    placeholder="Tìm kiếm theo tên hoặc email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-1/2"
                />
                <Link to="/userAdd" className=" hover:text-white">
                    <Button primary>Thêm người dùng</Button>
                </Link>
            </div>
            {!isLoading ? (
                <Dimmer active inverted>
                    <Loader inverted content="Loading" />
                </Dimmer>
            ) : (
                <div className="my-6">
                    <Table celled>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderCell onClick={() => handleSort('fullName')} className=" cursor-pointer">
                                    Tên
                                </TableHeaderCell>
                                <TableHeaderCell>Email</TableHeaderCell>
                                <TableHeaderCell>Role</TableHeaderCell>
                                <TableHeaderCell textAlign="center">Actions</TableHeaderCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {(sortedData.length > 0 ? sortedData : filteredData).map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell>{user.fullName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell textAlign="center">
                                        <div className="flex items-center justify-center gap-3">
                                            <Popup
                                                position="top center"
                                                content="Chi tiết"
                                                trigger={
                                                    <Link to={'/UserEdit'} state={{ dataDetail: user }}>
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
                                                        onClick={() => handleOpenDelete(user._id)}
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
            )}
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

export default UserPage;
