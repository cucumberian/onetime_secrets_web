/* eslint-disable react/prop-types */
import { useState } from "react";

import { Textarea } from "@chakra-ui/react";

import { PinInput, PinInputField } from '@chakra-ui/react'
import {FormControl, FormLabel, FormHelperText} from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

import { HStack } from '@chakra-ui/react'
import { Heading } from "@chakra-ui/react";
import appConfig from "../../../config";


function GenerateForm({submitHandler}) {

    const [codePhraseLength, ] = useState(appConfig.CODE_PHRASE_MIN_LENGTH);

    const [codePhrase, setCodePhrase] = useState("");
    const [secretContent, setSecretContent] = useState("");

    const times = {
        "15 минут": 15 * 60,
        "1 час": 1 * 60 * 60,
        "1 день": 1 * 24 * 60 * 60,
        "7 дней": 7 * 24 * 60 * 60,
    }

    const [ttlSeconds, setTtlSeconds] = useState(times[Object.keys(times)[1]]);

    const formOnSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        submitHandler(codePhrase, secretContent, ttlSeconds);
    }

    const secretContentChangeHandler = (e) => {
        setSecretContent(e.target.value);
    };

    const codePhraseChangeHandler = (e) => {
        setCodePhrase(e);
    };

    function dec2hex (dec) {
        return dec.toString(16).padStart(2, "0");
    }
      
    // generateId :: Integer -> String
    function generateId (len) {
        var arr = new Uint8Array((len || 40) / 2);
        window.crypto.getRandomValues(arr);
        return Array.from(arr, dec2hex).join('');
    }

    const generateRandomCodePhrase = () => {
        const randomString = generateId(codePhraseLength);
        setCodePhrase(randomString);
    }

    return <Box display='flex' flexDirection='column' maxWidth={600} justifyContent='center' alignContent='center' mx={'auto'} px={4} >
        
        <Heading as='h1' size='xl' mb={10} color={'#3b78c3'}>
            Создание секрета
        </Heading>

        <Heading as='h2' size='md' mb={10}>
            Задайте секрет и кодовую фразу и мы пришлем вам одноразовую ссылку на него
        </Heading>
        
        <form 
            action=""
            method="post"
            onSubmit={formOnSubmit}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}
        >
            <FormControl id="secret_content" display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                <FormLabel fontWeight={'bold'}>Секрет</FormLabel>
            
                <Textarea value={secretContent} name="secret_content" placeholder="Ваш секретный текст" onChange={secretContentChangeHandler} size='sm'/>
                <FormHelperText>Введите текст, который надо хранить в тайне</FormHelperText>
            </FormControl>

            <FormControl display='flex' justifyContent='center' flexDirection='column' alignItems='center' >
                <FormLabel fontWeight={'bold'}>Кодовая фраза</FormLabel>

                <HStack flexWrap='wrap'>
                    <PinInput type="alphanumeric" name="code_phrase" autoFocus size="lg" onChange={codePhraseChangeHandler} value={codePhrase} >
                        {Array.from({ length: codePhraseLength }, (_, i) => <PinInputField key={i}/>)}
                    </PinInput>

                    <Button onClick={generateRandomCodePhrase}>
                        Случайно
                    </Button>
                </HStack>

                <FormHelperText>Введите кодовую фразу для шифрования секрета</FormHelperText>
            </FormControl>

            <FormControl textAlign={'center'} display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} >
                <FormLabel fontWeight={'bold'}>Срок действия секрета</FormLabel>
                
                <Select maxWidth={200} onChange={(e) => setTtlSeconds(e.target.value)} value={ttlSeconds}>
                    {Object.keys(times).map((time) => <option key={time} value={times[time]}>{time}</option>)}
                </Select>

                <FormHelperText>Секрет будет удален после истечения срока действия</FormHelperText>
            </FormControl>
            

            <Box display='flex' justifyContent='center' mt={5}>
                <Button boxShadow='base' type="submit" colorScheme="green" variant="solid" mt={0}>Сохранить секрет</Button>
            </Box>
        </form>
        
    </Box>
}

export default GenerateForm;