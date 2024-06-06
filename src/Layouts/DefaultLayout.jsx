import PropTypes from 'prop-types';
import SideBar from './Components/Sidebar';
import ThemeProvider from './Components/themeProvider';

function DefaultLayout({ children }) {
    return (
        <div>
            <ThemeProvider>
                <SideBar />
                <div className=" pl-72">{children}</div>
            </ThemeProvider>
        </div>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default DefaultLayout;
