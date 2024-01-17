'use client'

import { Stack, HStack, Text, Heading, chakra } from "@chakra-ui/react";
import React from "react";
import { GoTasklist } from "react-icons/go";

export default function Notifications() {
  return (
    <Stack w="full" h="full"  >
      <Heading m="auto" mt="2rem">Notifications</Heading>
      <Stack bg="gray.100" mt="8rem" mx="1rem" h="4rem" borderRadius={`md`} shadow="md">
        <HStack m="auto" w="full" px="3rem">  <GoTasklist /><Text w="full" textAlign={`left`}>
          <chakra.span fontWeight={`bold`}>New Task : </chakra.span>Study</Text></HStack>
      </Stack>
    </Stack>
  );
}