import PropTypes from 'prop-types';
import SideBar from './Components/Sidebar';

function DefaultLayout({ children }) {
    return (
        <div>
            <SideBar />
            <div className=" pl-72">{children}</div>
        </div>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default DefaultLayout;
