import { Container, Spinner, Center, Box } from "@chakra-ui/react";
import SSGPokemonList from "/Components/SSGPokemonList";
import Layout from "/Components/Layouts/layout";
import { LimitDataFetch } from "Components/limitedDataFetching";
import Router from "next/router";
import { useState } from "react";

function SSGPokemon({ data }) {
  const [loading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", () => {
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", () => {
    setLoading(false);
  });

  return (
    <Box height="100%" position="relative">
      <Container minW="full" pt={10}>
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
            <Center>
              <Spinner
                thickness="10px"
                speed="0.65s"
                emptyColor="white"
                color="blue.500"
                size="xl"
              />
            </Center>
          </div>
        ) : (
          <SSGPokemonList data={data} />
        )}
      </Container>
    </Box>
  );
}

export default SSGPokemon;

SSGPokemon.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps() {
  return {
    props: {
      data: await LimitDataFetch(),
    },
  };
}
