import Header from "../header.js";
import Image from "next/image";
import { Box } from "@chakra-ui/react";
import pokeballbg from "../../public/pokemon-bg.jpg";

function Layout({ children }) {
  return (
    <Box width="100%" position="relative" zIndex="0">
      <Box width="100%" height="100%" position="absolute" zIndex="-1">
        <Image
          src={pokeballbg}
          alt="background"
          layout="fill"
          objectFit="cover"
        />
      </Box>
      <Header />
      {children}
    </Box>
  );
}

export default Layout;
