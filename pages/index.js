import { Button, Box, SimpleGrid, Spinner } from "@chakra-ui/react";
import Head from "next/head";
import pokemonGo from "../public/pngegg.png";
import Layout from "../Components/Layouts/layout";
import Link from "next/link";
import Image from "next/image";
import Router, { useRouter } from "next/router";

import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  ///This events will check if the route is changing and change complete
  ///then sets the loading
  Router.events.on("routeChangeStart", () => {
    console.log("router is changing...");
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", () => {
    console.log("router change complete...");
    setLoading(false);
  });

  console.log(router.query);
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100%",
            }}
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </div>
        ) : (
          <SimpleGrid justifyItems="center" width="inherit" row={2}>
            <Box mt={5}>
              <Image src={pokemonGo} height={400} alt="Pokemon" width={400} />
            </Box>
            <Box>
              <SimpleGrid
                width="inherit"
                maxW="inherit"
                column={2}
                mb={10}
                gap={2}
              >
                {/*Button Section For Navigating to SSR Pokemon List */}
                <Link passHref href="/SSRpokemon/">
                  <Button
                    // onClick={() => navigateToSSR()}
                    borderColor="tomato"
                    border="1px"
                    color="tomato"
                    _hover={{ color: "white", backgroundColor: "tomato" }}
                  >
                    SSR Pokemon List
                  </Button>
                </Link>

                {/*Button Section For Navigating to SSG Pokemon List */}
                <Link passHref href="/SSGpokemon/">
                  <Button
                    border="1px"
                    borderColor="tomato"
                    color="tomato"
                    _hover={{ color: "white", backgroundColor: "tomato" }}
                  >
                    SSG Pokemon List
                  </Button>
                </Link>
              </SimpleGrid>
            </Box>
          </SimpleGrid>
        )}
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
