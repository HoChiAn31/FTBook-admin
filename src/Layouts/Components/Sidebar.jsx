import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBook,
    faChartLine,
    faClipboardList,
    faComment,
    faHouse,
    faPlaceOfWorship,
    faTableCellsLarge,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { faSupple } from '@fortawesome/free-brands-svg-icons';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
function SideBar() {
    const myMenuItemStyles = (active) => ({
        '.menu-anchor': {
            backgroundColor: active ? '#444' : 'initial',
            color: active ? '#eee' : '#ccc',
        },
        '.menu-anchor:hover': {
            backgroundColor: '#444',
            color: '#eee',
        },
    });
    return (
        <div className=" min-h-screen fixed top-0 bottom-0 left-0 max-w-64 z-[1000] bg-white">
            <Sidebar className="min-h-screen fixed top-0 bottom-0 left-0 max-w-64 bg-white">
                <Menu
                    className=" min-h-screen"
                    iconShape="square"
                    renderMenuItemStyles={({ active }) => myMenuItemStyles(active)}
                >
                    <MenuItem icon={<FontAwesomeIcon icon={faHouse} />} active component={<Link to="/" />}>
                        Trang chủ
                    </MenuItem>
                    <MenuItem icon={<FontAwesomeIcon icon={faComment} />} component={<Link to="/messenger" />}>
                        Chat
                    </MenuItem>
                    <MenuItem icon={<FontAwesomeIcon icon={faBook} />} component={<Link to="/book" />}>
                        Sách
                    </MenuItem>
                    <MenuItem icon={<FontAwesomeIcon icon={faChartLine} />} component={<Link to="/chart" />}>
                        Thống kê
                    </MenuItem>
                    <MenuItem icon={<FontAwesomeIcon icon={faClipboardList} />} component={<Link to="/theOrder" />}>
                        Đơn đặt hàng
                    </MenuItem>
                    <SubMenu label="Danh mục" icon={<FontAwesomeIcon icon={faTableCellsLarge} />}>
                        <MenuItem icon={<FontAwesomeIcon icon={faBook} />} component={<Link to="/bookCategory" />}>
                            Loại sách
                        </MenuItem>
                        <MenuItem
                            icon={<FontAwesomeIcon icon={faBook} />}
                            component={<Link to="/bookCategoryDetail" />}
                        >
                            Chi tiết loại sách
                        </MenuItem>
                        <MenuItem
                            icon={<FontAwesomeIcon icon={faSupple} />}
                            component={<Link to="/suppliersCategory" />}
                        >
                            Nhà cung cấp
                        </MenuItem>
                        <MenuItem
                            icon={<FontAwesomeIcon icon={faPlaceOfWorship} />}
                            component={<Link to="/publishCategory" />}
                        >
                            Nhà xuất bản
                        </MenuItem>
                    </SubMenu>
                    <MenuItem icon={<FontAwesomeIcon icon={faUser} />} component={<Link to="/user" />}>
                        Người dùng
                    </MenuItem>
                </Menu>
            </Sidebar>
        </div>
    );
}

export default SideBar;
