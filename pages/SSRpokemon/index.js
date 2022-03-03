import { Container, List, Spinner } from "@chakra-ui/react";
import styles from "../../styles/Home.module.css";
import { ListPokemons } from "../../Components/dataFetching";
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
  return {
    props: {
      data: await ListPokemons(),
    },
  };
}
