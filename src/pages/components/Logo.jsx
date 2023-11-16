import Image from "next/image";

const Logo = () => {
  return (
    <>
      <picture>
        <Image
          className="logoAgagem"
          src="/agagem2.webP"
          alt="agagem"
          width={230}
          height={140}
        />
      </picture>
    </>
  );
};

export default Logo;
