import PropTypes from 'prop-types';
const Layout = ({children}) => {
    return (
        <div className='col-12 p-3'>
            {/* TODO: implement sidebar if required */}
            {children}
        </div>
    )
}
Layout.propTypes = {
    children: PropTypes.node, // Add this line to validate the children prop
};
export default Layout