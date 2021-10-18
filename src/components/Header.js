import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title}) => {
    const onClick = () => {
        console.log('click')
    }

    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button color='green' text='Add' onClick={onClick}/>
        </header>
        )

}

// Header.defaultProps = {
//     title: 'hello'
// }
//
// Header.propTypes = {
//     title: PropTypes.string.isRequired,
// }

// const headingStyle = {
//     color: 'red',
//     background: 'black'
// }

export default Header;
