/* eslint-disable react/prop-types */
import { Button } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { Code } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/react";

function ShowSecret({ secret }) {

    const toast = useToast();

const copySecret = () => {
    navigator.clipboard.writeText(secret);

  toast({
    title: "Секрет скопирован в буфер обмена",
    status: "success",
    duration: 5000,
    isClosable: true,
  });
};

  return (
    <Box display={'flex'} flexDirection={'column'}>
        <Box>
            <Heading as='h2' size='md' color="green">Секрет расшифрован:</Heading>

            <Code width={'100%'} maxWidth={600} my={10} p={3} onClick={copySecret} cursor={ 'pointer'} title="Скопировать в буфер обмена">
              <pre style={ { whiteSpace: 'pre-wrap' }}>{secret}</pre>
            </Code>
            

            <Alert status='warning' my={2}>
                <AlertIcon />
                Данные секрет удален. Пожалуйста сохраните его в надежном месте.
            </Alert>


            <Button my={3} colorScheme="blue" size='sm' onClick={copySecret}>
                Скопировать секрет в буфер обмена
            </Button>
        </Box>

        <Link to='/' mt={10}>
            <Button my={3} size='sm'  colorScheme='red'>
                На главную
            </Button>
        </Link>
    </Box>
  );
  }

export default ShowSecret;