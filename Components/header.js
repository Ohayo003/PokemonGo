import { Container } from "@chakra-ui/react";
import Image from "next/image";

import headerImage from "/public/pokemongo.png";

function Header() {
  return (
    <>
      <Container centerContent width="100%">
        <Image src={headerImage} alt="header image" width={400} height={200} />
      </Container>
    </>
  );
}

export default Header;
