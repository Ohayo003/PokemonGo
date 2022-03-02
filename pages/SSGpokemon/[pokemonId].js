import { Container, SimpleGrid, AspectRatio, Box } from "@chakra-ui/react";
import Image from "next/image";
import { TypeColor } from "../../Components/colorTypes";
import ListPokemons from "../../Components/dataFetching";
import Layout from "../../Components/Layouts/layout";

import styles from "../../styles/Home.module.css";
function SSGPokemonId({ data }) {
  console.log(data.types[0].type.name);
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Container mt={10} pb={10} height="inherit" width="inherit">
        <Box className={styles.cardClick} width="inherit">
          <Box
            className={styles.cardImage}
            background="#FFD631"
            // borderColor={TypeColor(data.types[0].type.name)}
            width="inherit"
            boxShadow={`0 4px 8px 0 ${TypeColor(
              data.types[0].type.name
            )}, 0 6px 20px 0 ${TypeColor(data.types[0].type.name)}`}
            borderWidth="10px"
            borderRadius="lg"
            overflow="hidden"
          >
            <SimpleGrid  justifyContent="space-between" columns={2}>
              <Box
                mt="1"
                ml={2}
                fontWeight="semibold"
                as="h2"
                border="1px"
                background="white"
                textAlign="center"
                borderRadius={10}
                p={1}
                width={120}
                color={TypeColor(data.types[0].type.name)}
                lineHeight="tight"
              >
                <h3 className={styles.subtitle}>{data.name}</h3>
              </Box>
              <Box
                mt="1"
                mr={2}
                fontWeight="semibold"
                as="h2"
                border="1px"
                justifySelf="right"
                background="white"
                textAlign="center"
                borderRadius={10}
                p={1}
                width={120}
                color={TypeColor(data.types[0].type.name)}
                lineHeight="tight"
              >
                <h6 className={styles.subtitle}>{data.types[0].type.name}</h6>
              </Box>
            </SimpleGrid>
            <Box
              m={2}
              borderColor="#CAEFFF"
              borderRadius={10}
              borderWidth="3px 3px 20px 3px"
              background={TypeColor(data.types[0].type.name)}
            >
              <Image
                src={data.sprites.other.home.front_default}
                alt={data.name}
                layout="responsive"
                width={20}
                height={20}
              />
            </Box>
            <Box width="inherit" height="inherit">
              <Box display="flex" alignItems="baseline"></Box>

              {/* Display Section for the Basic Information */}
              <Box
                mt="1"
                fontWeight="semibold"
                as="h2"
                background={TypeColor(data.types[0].type.name)}
                textAlign="center"
                color="white"
                lineHeight="tight"
                isTruncated
              >
                <h4 className={styles.subtitle}>Basic Information</h4>
              </Box>
              <Box
                color="black"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="inherit"
                textAlign="center"
                mt={2}
                textTransform="uppercase"
              >
                Height {data.height} &bull; Weight {data.weight}
                <Box>
                  <Box as="span" color="gray.600" fontSize="sm">
                    Base Experience: {data.base_experience}
                  </Box>
                </Box>
              </Box>

              {/* Display Section for the Abilities */}
              <Box
                mt="1"
                fontWeight="semibold"
                as="h2"
                background={TypeColor(data.types[0].type.name)}
                textAlign="center"
                color="white"
                lineHeight="tight"
                isTruncated
              >
                <h4 className={styles.subtitle}>Abilities</h4>
              </Box>
              <Box
                color="black"
                fontWeight="semibold"
                letterSpacing="wide"
                // fontSize={data.abilities.length > 2 ? "12.5px" : "sm"}
                fontSize="inheret"
                textAlign="center"
                mt={2}
                textTransform="uppercase"
              >
                <SimpleGrid
                  alignItems="center"
                  gap={1}
                  columns={data.abilities.length}
                >
                  {data.abilities.map((skill) => {
                    return (
                      <>
                        <Box justifyItems="center">{skill.ability.name}</Box>
                      </>
                    );
                  })}
                </SimpleGrid>
              </Box>

              {/* Display Section for the Basic Stats */}
              <Box
                mt="1"
                fontWeight="semibold"
                as="h2"
                background={TypeColor(data.types[0].type.name)}
                textAlign="center"
                color="white"
                lineHeight="tight"
                isTruncated
              >
                <h4 className={styles.subtitle}>Basic Stats</h4>
              </Box>
              <Box
                color="black"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="inherit"
                textAlign="center"
                mt={2}
                textTransform="uppercase"
              >
                <SimpleGrid row={3} columns={2}>
                  {data.stats.map((base) => {
                    return (
                      <>
                        <Box>
                          {base.stat.name} &bull; {base.base_stat}
                        </Box>
                      </>
                    );
                  })}
                </SimpleGrid>
              </Box>

              {/* Display Section for the Moves */}
              <Box
                mt="1"
                fontWeight="semibold"
                as="h2"
                background={TypeColor(data.types[0].type.name)}
                textAlign="center"
                color="white"
                lineHeight="tight"
                isTruncated
              >
                <h4 className={styles.subtitle}>Moves</h4>
              </Box>
              <Box
                color="black"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="inherit"
                textAlign="left"
                mt={2}
                textTransform="uppercase"
              >
                <SimpleGrid justifyItems="center" row={3} columns={3}>
                  {data.moves.slice(0, 18).map((m) => {
                    return (
                      <>
                        <Box textAlign="left">&bull; {m.move.name}</Box>
                      </>
                    );
                  })}
                </SimpleGrid>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default SSGPokemonId;

SSGPokemonId.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticPaths() {
  const pokemonListData = await ListPokemons();

  const paths = pokemonListData.map((pokemon) => {
    return {
      params: {
        pokemonId: `${pokemon.id}`,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${params.pokemonId}`
  );
  const data = await response.json();
  return {
    props: {
      data,
    },
  };
}
