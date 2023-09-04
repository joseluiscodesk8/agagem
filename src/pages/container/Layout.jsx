import Logo from "../comnponents/Logo"

const { default: Navbar } = require("../comnponents/Navbar")

const Layout = ( {chiledre}) => {
    return (
        <>
            {chiledre}
            <Logo />
            <Navbar />
        </>
    )
}

export default Layout