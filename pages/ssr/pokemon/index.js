import { Container, List, Spinner } from "@chakra-ui/react";
import { ListPokemons } from "/Components/dataFetching";
import SSRPokemonList from "/Components/SSRPokemonList";
import Layout from "/Components/Layouts/layout";

export async function getServerSideProps() {
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
      const data = await fetch(`${element.url}`);
      const jsonData = await data.json();
      pokemonData.push({
        name: jsonData.name,
        image: jsonData.sprites.other.home.front_default,
        weight: jsonData.weight,
        height: jsonData.height,
        base_experience: jsonData.base_experience,
        types: jsonData.types,
        id: jsonData.id,
      });
    }
  }
  return {
    props: {
      data: pokemonData,
    },
  };
}

function SSRPokemon({ data }) {
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
