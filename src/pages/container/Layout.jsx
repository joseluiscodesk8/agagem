import Logo from "../components/Logo"

const { default: Navbar } = require("../components/Navbar")

const menuItems = [
    { label: 'Inicio', path: '/' },
    'Resina',
    'Pulseras_duo',
    'Pulsera_set_x3',
    'Topos',
    'Candongas',
    'Tobilleras',
    'Anillos',
    'Cadenas',
  ];


const Layout = ( {chiledre}) => {
    return (
        <>
            {chiledre}
            <Logo />
            <Navbar  menuItems={menuItems}/>
        </>
    )
}

export default Layout