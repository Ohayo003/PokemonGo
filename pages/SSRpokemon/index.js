import { Container, List, Spinner } from "@chakra-ui/react";
import styles from "../../styles/Home.module.css";
import ListPokemons from "../../Components/dataFetching";
import SSRPokemonList from "../../Components/SSRPokemonList";
import Layout from "../../Components/Layouts/layout";
import { useRouter } from "next/router";
function SSRPokemon({ data }) {
  const router = useRouter();
  const {
    query: { loading },
  } = router;
  // const loading = router.query({ loading });
  console.log(loading);
  return (
    <div style={{ height: "100%" }}>
      <Container width="inherit" pt={10}>
        <SSRPokemonList data={data} />
      </Container>
    </div>
  );
}

export default SSRPokemon;

SSRPokemon.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps() {
  // const data = await ListPokemons();
  const pokemonData = [];

  ///Fetch the result from the endpoint
  const data = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=100&offset=300"
  );
  const jsonDataResult = await data.json();

  ///Check if the jsonDataResult has data and loop through all the result to
  ///get the url's and then fetch every single data from the url
  if (jsonDataResult) {
    for (const element of jsonDataResult.results) {
      const data = await fetch(element.url);
      const jsonData = await data.json();
      pokemonData.push(jsonData);
    }
  }
  return {
    props: {
      data: pokemonData,
    },
  };
}
