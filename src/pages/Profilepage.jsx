import { Text, Container, Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";
import { Layout } from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import { db } from "../utils/init-firebase";
import { collection, query, onSnapshot, doc } from "firebase/firestore";

export default function Profilepage() {
  const { currentUser } = useAuth();
  const [data, setData] = useState();

  useEffect(() => {
    const q = query(collection(db, "onoo"));

    const unsub = onSnapshot(q, (querySnapshot) => {
      let tmpArray = [];
      querySnapshot.forEach((doc) => {
        tmpArray.push({ ...doc.data(), id: doc.id });
      });
      setData(tmpArray);
    });

    return () => {
      unsub();
    };
  }, []);

  const finalMap = data?.map((item) => {
    if (item.id === currentUser.uid) {
      return (
        <Box>
          {item.final >= 0 && item.final <= 25 && (
            <Text fontSize="2xl" fontWeight="bold">
              Таны интерфэйсийн нас:{" "}
              <Text color="green.500" display="inline">
                0-12
              </Text>
            </Text>
          )}
          {item.final > 25 && item.final <= 50 && (
            <Text fontSize="2xl" fontWeight="bold">
              Таны интерфэйсийн нас:{" "}
              <Text color="green.500" display="inline">
                12-30
              </Text>
            </Text>
          )}
          {item.final > 50 && item.final <= 75 && (
            <Text fontSize="2xl" fontWeight="bold">
              Таны интерфэйсийн нас:{" "}
              <Text display="inline" color="green.500">
                30-60
              </Text>
            </Text>
          )}
          {item.final > 75 && (
            <Text fontSize="2xl" fontWeight="bold">
              Таны интерфэйсийн нас:{" "}
              <Text display="inline" color="green.500">
                60+
              </Text>
            </Text>
          )}
        </Box>
      );
    }
  });

  return (
    <Layout>
      <Container maxW="container.lg" py={4}>
        <Text>
          Тавтай морил{" "}
          <Text fontWeight="semibold" display="inline">
            {currentUser?.email}
          </Text>
        </Text>
        <Box mt="20">{finalMap}</Box>
      </Container>
    </Layout>
  );
}
