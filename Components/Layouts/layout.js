import Header from "../header.js";
import Image from "next/image";
import { Box } from "@chakra-ui/react";

function Layout({ children }) {
  return (
    <Box width="100%" position="relative" zIndex="0">
      <Box width="100%" height="100%" position="absolute" zIndex="-1">
        <Image
          src="https://eskipaper.com/images/pokemon-backgrounds-13.jpg"
          alt="background"
          layout="fill"
        />
      </Box>
      <Header />
      {children}
    </Box>
  );
}

export default Layout;
