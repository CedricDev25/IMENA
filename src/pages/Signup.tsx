import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Container,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFinance } from "../FinanceContext";
import { useTranslation } from "react-i18next";

export default function Signup() {
  const { t } = useTranslation();
  const { setUserEmail } = useFinance();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");

    if (!validateEmail(email)) {
      setEmailError(t("invalid_email"));
      return;
    }

    setUserEmail(email);
  };

  return (
    <Container maxW="md" centerContent py={20}>
      <Box
        p={8}
        w="full"
        bg="dark.surface"
        border="1px solid"
        borderColor="dark.border"
        borderRadius="2xl"
        shadow="xl"
      >
        <VStack spacing={6} align="stretch">
          <Box textAlign="center">
            <Heading size="lg" fontWeight="bold" color="white" mb={2}>
              {t("signup")}
            </Heading>
            <Text color="whiteAlpha.400">{t("create_account")}</Text>
          </Box>

          <form onSubmit={handleSignup}>
            <VStack spacing={4}>
              <FormControl isInvalid={!!emailError}>
                <FormLabel color="whiteAlpha.600">{t("email")}</FormLabel>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  bg="whiteAlpha.50"
                  borderColor="dark.border"
                  _hover={{ borderColor: "brand.500" }}
                  _focus={{ borderColor: "brand.500", boxShadow: "none" }}
                  required
                />
                <FormErrorMessage>{emailError}</FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                colorScheme="brand"
                w="full"
                size="lg"
                borderRadius="xl"
              >
                {t("signup")}
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Container>
  );
}
