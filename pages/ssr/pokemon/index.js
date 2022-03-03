import { Container, Center, Spinner } from "@chakra-ui/react";
import SSRPokemonList from "/Components/SSRPokemonList";
import Layout from "/Components/Layouts/layout";
import { LimitDataFetch } from "Components/limitedDataFetching";
import { useState } from "react";
import Router from "next/router";

export async function getServerSideProps() {
  return {
    props: {
      data: await LimitDataFetch(),
    },
  };
}

function SSRPokemon({ data }) {
  const [loading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", () => {
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", () => {
    setLoading(false);
  });

  return (
    <div style={{ height: "100%" }}>
      <Container width="inherit" pt={10}>
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
          <SSRPokemonList data={data} />
        )}
      </Container>
    </div>
  );
}

export default SSRPokemon;

SSRPokemon.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
