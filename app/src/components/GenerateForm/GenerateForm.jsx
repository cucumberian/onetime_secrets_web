/* eslint-disable react/prop-types */
import { useState } from "react";

import { Textarea } from "@chakra-ui/react";

import { PinInput, PinInputField } from '@chakra-ui/react'
import {FormControl, FormLabel, FormHelperText} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

import { HStack } from '@chakra-ui/react'
import { Heading } from "@chakra-ui/react";
import appConfig from "../../../config";


function GenerateForm({submitHandler}) {

    const [codePhraseLength, setCodePhraseLength] = useState(appConfig.CODE_PHRASE_MIN_LENGTH);

    const [codePhrase, setCodePhrase] = useState("");
    const [secretContent, setSecretContent] = useState("");

    const formOnSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        submitHandler(codePhrase, secretContent);
    }

    const secretContentChangeHandler = (e) => {
        setSecretContent(e.target.value);
    };

    const codePhraseChangeHandler = (e) => {
        setCodePhrase(e);
    };

    return <Box display='flex' flexDirection='column' maxWidth={600} justifyContent='center' alignContent='center' mx={'auto'} px={4} >
        
        <Heading as='h1' size='xl' my={10} color={'#3b78c3'}>
            Создание секрета
        </Heading>

        <Heading as='h2' size='md'>Задайте секрет и кодовую фразу и мы пришлем вам одноразовую ссылку на него</Heading>

        <form action="" method="post" onSubmit={formOnSubmit}>
            <FormControl id="secret_content" display='flex' flexDirection='column' justifyContent='center' alignItems='center' my={10}>
                <FormLabel>Секрет</FormLabel>
            
                <Textarea value={secretContent} name="secret_content" placeholder="Ваш секретный текст" onChange={secretContentChangeHandler} size='sm'/>
                <FormHelperText>Введите текст, который надо хранить в тайне</FormHelperText>
            </FormControl>

            <FormControl display='flex' justifyContent='center' flexDirection='column' alignItems='center' my={10}>
                <FormLabel>Кодовая фраза</FormLabel>

                <HStack flexWrap='wrap'>
                    <PinInput type="alphanumeric" name="code_phrase" autoFocus size="lg" onChange={codePhraseChangeHandler} >
                        
                        {Array.from({ length: codePhraseLength }, (_, i) => <PinInputField key={i}/>)}
                    
                        
                    </PinInput>
                </HStack>

                <FormHelperText>Введите кодовую фразу для доступа к секретному тексту</FormHelperText>
            </FormControl>

            <Box mt={4} display='flex' justifyContent='center'>
                <Button boxShadow='base' type="submit" colorScheme="green" variant="solid" mt={4}>Сохранить секрет</Button>
            </Box>
        </form>
    </Box>
}

export default GenerateForm;