import { Container } from "@chakra-ui/react";
import styles from "../../styles/Home.module.css";
import ListPokemons from "../../Components/dataFetching";
import SSRPokemonList from "../../Components/SSRPokemonList";
import Layout from "../../Components/Layouts/layout";

function SSRPokemon({ data }) {
  return (
    <div style={{ height: "100%" }}>
      <Container minW="inherit">
        <h2 className={styles.title}>SSG POKEMON LIST</h2>
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
  const data = await ListPokemons();
  return {
    props: {
      data,
    },
  };
}
