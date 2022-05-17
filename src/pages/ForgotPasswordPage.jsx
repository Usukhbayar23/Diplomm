import {
  Button,
  Center,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card } from "../components/Card";
import DividerWithText from "../components/DividerWithText";
import { Layout } from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";

export default function ForgotPasswordPage() {
  const history = useHistory();
  const { forgotPassword } = useAuth();
  const toast = useToast();

  const [email, setEmail] = useState("");

  return (
    <Layout>
      <Heading textAlign="center" my={12}>
        Нууц үг мартсан
      </Heading>
      <Card maxW="md" mx="auto" mt={4}>
        <chakra.form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await forgotPassword(email);
              toast({
                description: ` ${email} хаяг руу майл илгээлээ.`,
                status: "success",
                duration: 9000,
                isClosable: true,
              });
            } catch (error) {
              console.log(error.message);
              toast({
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            }
          }}
        >
          <Stack spacing="6">
            <FormControl id="email">
              <FormLabel>Цахим шуудан</FormLabel>
              <Input
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="green" size="lg" fontSize="md">
              Нууц үг солих
            </Button>
          </Stack>
        </chakra.form>
        <DividerWithText my={6}>Эсвэл</DividerWithText>
        <Center>
          <Button variant="link" onClick={() => history.push("/login")}>
            Нэвтрэх
          </Button>
        </Center>
      </Card>
    </Layout>
  );
}