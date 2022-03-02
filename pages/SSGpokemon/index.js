import { Container } from "@chakra-ui/react";
import SSGPokemonList from "../../Components/SSGPokemonList";
import styles from "../../styles/Home.module.css";
import Layout from "../../Components/Layouts/layout";
import ListPokemons from "../../Components/dataFetching";

function SSGPokemon({ data }) {
  return (
    <div style={{ height: "100%" }}>
      <Container minW="full" pt={10}>
        <SSGPokemonList data={data} />
      </Container>
    </div>
  );
}

export default SSGPokemon;

SSGPokemon.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps() {
  const data = await ListPokemons();
  return {
    props: {
      data,
    },
  };
}
