import {
  Container,
  SimpleGrid,
  Flex,
  Box,
  Spinner,
  Center,
} from "@chakra-ui/react";
import Image from "next/image";
import { TypeColor } from "/Components/colorTypes";
import { ListPokemons } from "/Components/dataFetching";
import Layout from "/Components/Layouts/layout";
import { useState } from "react";
import styles from "/styles/Home.module.css";
import Router from "next/router";

function SSGPokemonId({ data }) {
  const [loading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", () => {
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", () => {
    setLoading(false);
  });

  const pokemonName = data.name.charAt(0).toUpperCase() + data.name.slice(1);

  return (
    <Box height="100%" width="100%">
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
              // overflow="hidden"
            >
              <Box>
                <SimpleGrid justifyContent="space-between" columns={2}>
                  <Flex>
                    <Center>
                      <Box
                        // overflow="hidden"
                        mt="1"
                        ml={-1}
                        fontWeight="semibold"
                        border="2px"
                        background="white"
                        fontStyle="italic"
                        fontFamily="sans-serif"
                        textAlign="center"
                        borderRadius={10}
                        height={7}
                        width={50}
                        color="darkcyan"
                        lineHeight="tight"
                      >
                        <h2>Basic</h2>
                      </Box>
                    </Center>
                    <Box
                      fontStyle="italic"
                      fontSize={30}
                      ml={2}
                      letterSpacing="wide"
                      // color={TypeColor(data.types[0].type.name)}
                      color="darkcyan"
                      fontWeight="bold"
                    >
                      <h3>{pokemonName}</h3>
                    </Box>
                  </Flex>
                  <Flex align="end" justify="right">
                    <Box
                      alignContent="baseline"
                      fontSize="md"
                      fontWeight="bold"
                      mr={2}
                    >
                      <h4>HP</h4>
                    </Box>
                    <Box
                      mt="1"
                      mr={2}
                      fontWeight="bold"
                      border="2px"
                      justifySelf="right"
                      background="white"
                      textAlign="center"
                      fontSize="xl"
                      letterSpacing="wide"
                      borderRadius={10}
                      p={1}
                      width={12}
                      color="darkcyan"
                      lineHeight="tight"
                    >
                      <h6>
                        {data.stats.map((s) => {
                          if (s.stat.name === "hp") {
                            return s.base_stat;
                          }
                        })}
                      </h6>
                    </Box>
                  </Flex>
                </SimpleGrid>
              </Box>
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

                <SimpleGrid columns={2}>
                  {/* Display Section for the Basic Information */}
                  <Box>
                    <Box
                      mt="1"
                      fontWeight="bold"
                      as="h2"
                      fontSize="lg"
                      textAlign="center"
                      borderRadius="10px 10px 10px 0px"
                      color="white"
                      lineHeight="tight"
                      mr={5}
                      // background={TypeColor(data.types[0].type.name)}
                      background="darkcyan"
                      isTruncated
                    >
                      <h4>Basic Information</h4>
                    </Box>
                    <Box
                      color="black"
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="sm"
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
                  </Box>

                  {/* Display Section for the Abilities */}
                  <Box>
                    <Box
                      mt="1"
                      fontWeight="bold"
                      as="h2"
                      textAlign="center"
                      borderRadius="10px 0px 10px 10px"
                      color="white"
                      fontSize="lg"
                      ml={5}
                      // background={TypeColor(data.types[0].type.name)}
                      background="darkcyan"
                      lineHeight="tight"
                      isTruncated
                    >
                      <h4>Abilities</h4>
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
                      {data.abilities.map((skill) => {
                        return (
                          <>
                            <Box justifyItems="center">
                              {skill.ability.name}
                            </Box>
                          </>
                        );
                      })}
                    </Box>
                  </Box>
                </SimpleGrid>

                {/* Display Section for the Basic Stats */}
                <Center>
                  <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h2"
                    // background={TypeColor(data.types[0].type.name)}
                    background="darkcyan"
                    textAlign="center"
                    color="white"
                    borderRadius="0px 10px"
                    lineHeight="tight"
                    fontSize="xl"
                    width={200}
                    isTruncated
                  >
                    <h4>Basic Stats</h4>
                  </Box>
                </Center>
                <Box
                  color="black"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="inherit"
                  textAlign="center"
                  mt={2}
                  textTransform="uppercase"
                >
                  <SimpleGrid p={2} row={3} textAlign="inherit" columns={2}>
                    {data.stats.map((base) => {
                      return (
                        <>
                          <Box fontWeight="bold">{base.stat.name}</Box>
                          <Box>{base.base_stat}</Box>
                        </>
                      );
                    })}
                  </SimpleGrid>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      )}
    </Box>
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
