import { Container, List, Spinner } from "@chakra-ui/react";
import { ListPokemons } from "/Components/dataFetching";
import SSRPokemonList from "/Components/SSRPokemonList";
import Layout from "/Components/Layouts/layout";

export async function getServerSideProps() {
  const pokemonData = [];

  ///Fetch the result from the endpoint
  const data = await fetch(
    "https://pokeapi.co/api/v2/pokemon?offset=300&limit=100"
  );
  // const jsonDataResult = await data.json();
  const { results } = await data.json();

  ///Check if the jsonDataResult has data and loop through all the result to
  ///get the url's and then fetch every single data from the url
  if (results) {
    for (const element of results) {
      const data2 = await fetch(`${element.url}`);
      const jsonData = await data2.json();
      pokemonData.push(jsonData);
      console.log(element.url);
    }
  }
  return {
    props: {
      pokemonData,
    },
  };
}

function SSRPokemon({ pokemonData }) {
  return (
    <div style={{ height: "100%" }}>
      <Container width="inherit" pt={10}>
        <SSRPokemonList data={pokemonData} />
      </Container>
    </div>
  );
}

export default SSRPokemon;

SSRPokemon.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
