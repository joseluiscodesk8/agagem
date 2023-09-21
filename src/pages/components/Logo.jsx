import Image from "next/image";


 const Logo = () => {
    return (
        <>
            <picture>
                <Image src='/agagem2.jpg' alt='agagem'   width={230} height={140} property="true" loading="eager"/>
            </picture>
        </>
    )
}

export default Logo;