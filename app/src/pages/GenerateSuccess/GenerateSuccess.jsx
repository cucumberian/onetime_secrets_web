import {Box, HStack, Link} from '@chakra-ui/react';

import { Button } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { Alert } from '@chakra-ui/react';
import { AlertIcon } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import QrCode from '../../components/QrCode/QrCode';

import { FaTelegram } from "react-icons/fa";

/* eslint-disable react/prop-types */

function GenerateSuccess({secretKey, setSecretKey}) {
    const url_string = `${window.location.origin}/${secretKey}`;
    const telegram_link = `https://telegram.me/share/url?url=${url_string}&text=Вам доступен секрет. Перейдите по ссылке, и введите секретную фразу, чтобы его просмотреть.`

    const copyToast = useToast();

    const copyButtonHandler = () => {
        navigator.clipboard.writeText(url_string);
        copyToast({
            title: 'Ссылка скопирована',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
        });
    };
    
    return <Box maxWidth={600} display='flex' flexDirection='column' justifyContent='center' alignItems='center' mx='auto' my={10}>
        <Heading as="h1" size="xl" color="green">Секрет сохранен</Heading>

        <Box my={10} display='flex' flexDirection='column' justifyContent='center' alignItems='center' flexWrap={1}>
            
            <Text as="h4" size='md' color='gray.600' fontWeight='bold' textAlign='center'>Ваш секрет доступен по ссылке</Text>
        
            <Link href={`/${secretKey}`}  fontWeight='bold' fontSize={'0.8em'} color='teal.500' rel="noreferrer" target="_blank">{url_string}</Link>

            <Button boxShadow='base' colorScheme="teal" my={2} size='sm' onClick={copyButtonHandler}>Скопировать ссылку</Button>
            <QrCode url={url_string}/>
            <HStack mt={5}>
                <Link href={telegram_link} target="_blank" rel="noreferrer" isExternal >
                    <FaTelegram size={40} color='#2AABEE' title="Поделиться в Telegram" aria-label="Поделиться в Telegram"/>
                </Link>
            </HStack>
        </Box>

        <Alert
            status="warning"
            variant="subtle"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            width='fit-content'
            mx='auto'
            my={5}   
        >
            <AlertIcon />
            Внимание! Секрет будет удален после расшифровки или истечения срока его действия.
        </Alert>

        <Alert status='info'>
            <AlertIcon />
            Если кодовая фраза будет введена неверно к существующему секрету, то появится сообщение, что секрета нет.
        </Alert>

        <Button boxShadow="md" colorScheme="blue" my={10} onClick={() => setSecretKey(null)}>Создать ещё секрет</Button>
    </Box>
}

export default GenerateSuccess;
