/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { FormControl } from "@chakra-ui/react";
import { FormHelperText } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { InputGroup } from "@chakra-ui/react";
import { InputRightElement } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { Stack } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Highlight } from "@chakra-ui/react";

import { useSearchParams } from "react-router-dom";

function SecretForm( {formSubmitHandler, secret_key} ) {

    const [searchParams, ] = useSearchParams();
    
    useEffect(() => {
        if (searchParams.get('code_phrase')) {
            setCodePhrase(searchParams.get('code_phrase'));
        }
    }, [searchParams]);

    const [codePhrase, setCodePhrase] = useState("");

    const formSubmit = (event) => {
        event.preventDefault();
        formSubmitHandler(codePhrase);
    };
    
    const codePhraseChangeHandler = (event) => {
        setCodePhrase(event.target.value);
    };


    return <Box maxWidth={600} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignContent={'center'}>
        <Text>
            <Highlight query={`${secret_key}`} styles={{ bg: 'blue.100', px: '2', py: '0.5' }}>
                {`Доступ к секрету ${secret_key}`}
            </Highlight>
        </Text>

        <Box mt={3} mb={10}>
            <form action="" method="POST" onSubmit={formSubmit}>
            <Stack spacing={4}>
                <FormControl isRequired mb={2}>
                    <InputGroup>
                    <Input minLength={6} value={codePhrase} type="text" name="code_phrase" placeholder="ваша кодовая фраза" onChange={codePhraseChangeHandler} />
                        <InputRightElement>
                        <CheckIcon color={codePhrase.length >= 6 ? 'green.500' :'gray.100'} />
                        </InputRightElement>
                    </InputGroup>
                    
                    <FormHelperText>Введите кодовую фразу для расшифровки секрета</FormHelperText>
                </FormControl>
            </Stack>
                <Button my={5} boxShadow='base' colorScheme="green" mt={4} mb={4} onClick={formSubmit} >Получить секрет</Button>
            </form>
        </Box>

        <Alert status='warning' variant='subtle' my={'auto'}>
            <AlertIcon />
            После успешного получения секрета он будет удален из хранилища.
        </Alert>
    </Box>
}

export default SecretForm;