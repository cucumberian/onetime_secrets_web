import { useState } from "react";
import { useParams } from "react-router-dom";
import SecretForm from "../../components/SecretForm/SecretForm";

import { Box } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react';

import ShowSecret from "../../components/ShowSecret/ShowSecret";
import appConfig from "../../../config";



function Secret() {

    const [secret, setSecret] = useState(undefined);
    const secret_key = useParams().secret_key;

    const toast = useToast();

    const formSubmitHandler = async (code_phrase) => {
        const url = `${appConfig.API_BACKEND}/secrets/${secret_key}`

        const data = {'code_phrase': code_phrase};

        console.log(`sending data = ${data}`);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        console.log(`response = ${response}`)

        if (response.ok) {
            const data = await response.json();
            toast({
                title: 'секрет расшифрован',
                description: data.secret,
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
            setSecret(data);
        }
        else {
            console.log(`response = ${response}`)
            if (response.status === 404) {
                toast({
                    title: 'Ошибка',
                    description: 'Секрет для данного ключа не найден или неверная кодовая фраза',
                    status: 'error',
                    duration: 10000,
                    isClosable: true,
                });
            }
            else {
                toast({
                    title: 'Ошибка',
                    description: 'Неизвестная ошибка',
                    status: 'error',
                    duration: 10000,
                    isClosable: true,
                });
            
                setSecret(null);
            }
        }
    }


    return <Box mx={'auto'}maxWidth={600} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
        <Heading as='h1' color='#3a3a3a' my={10}>Секрет</Heading>

        {(secret === undefined || secret === null) ? <SecretForm formSubmitHandler={formSubmitHandler} secret_key={secret_key}/> : <ShowSecret secret={secret} />}
        
    </Box>
}

export default Secret;
