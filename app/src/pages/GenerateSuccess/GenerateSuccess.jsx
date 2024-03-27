import { useSelector } from 'react-redux';
import {Box, HStack, Link} from '@chakra-ui/react';

import { Button } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { Alert } from '@chakra-ui/react';
import { AlertIcon } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import { Highlight } from '@chakra-ui/react';
// import QrCode from '../../components/QrCode/QrCode';


import { FaTelegram } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

import { useDispatch } from 'react-redux';
import { secretActions } from '../../store/secret';

/* eslint-disable react/prop-types */

function GenerateSuccess() {

    const dispatch = useDispatch();
    

    const secretKey = useSelector((state) => state.secret.secretKey);
    const codePhrase = useSelector((state) => state.secret.codePhrase);
    const ttlSeconds = useSelector((state) => state.secret.ttlSeconds);

    const url_string = `${window.location.origin}/${secretKey}`;
    const query_text = `?code_phrase=${codePhrase}`
    const url = `${url_string}${query_text}`
    const share_text = `Вам доступен секрет. Перейдите по ссылке, и введите секретную фразу "${codePhrase}", для его дешифровки.`
    const telegram_link = `https://telegram.me/share/url?url=${url}&text=${share_text}`

    const whatsapp_link = `whatsapp://send?text=${share_text}`

    const copyToast = useToast();

    const days = Math.floor(ttlSeconds / 86400);
    const hours = Math.floor((ttlSeconds % 86400) / 3600);
    const minutes = Math.floor((ttlSeconds % 3600) / 60);

    console.log('codePhrase =', codePhrase);

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
    
    return <Box maxWidth={600} display='flex' flexDirection='column' justifyContent='center' alignItems='center' mx='auto' my={0}>
        <Heading as="h1" size="xl" color="green">Секрет сохранен</Heading>

        <Box my={10} display='flex' flexDirection='column' justifyContent='center' alignItems='center' flexWrap={1}>
            
            <Text as="h4" size='md' color='gray.600' fontWeight='bold' textAlign='center'>Ваш секрет доступен по ссылке</Text>
        
            <Link href={`/${secretKey}?code_phrase=${codePhrase}`}  fontWeight='bold' fontSize={'0.9em'} color='teal.500' rel="noreferrer" target="_blank">{url}</Link>


            <Text fontWeight={'bold'}>
                <Highlight
                    query={codePhrase}
                    styles={{ px: '2', py: '1', rounded: 'md', bg: '#d06262', color: 'white'}}
                >
                {`Кодовое слово для расшифровки: ${codePhrase}`}
                </Highlight>
            </Text>

            <Button boxShadow='base' colorScheme="teal" my={2} size='md' onClick={copyButtonHandler}>Скопировать ссылку</Button>

            
            
            {/* <QrCode url={url} size={100}/> */}

            <HStack mt={5} gap={5}>
                <Link href={telegram_link} target="_blank" rel="noreferrer" isExternal >
                    <FaTelegram size={40} color='#2AABEE' title="Поделиться в Telegram" aria-label="Поделиться в Telegram"/>
                </Link>

                <Link href={whatsapp_link} target="_blank" rel="noreferrer" isExternal >
                    <IoLogoWhatsapp size={40} color='#4FCE5D' title="Поделиться в WhatsApp" aria-label="Поделиться в WhatsApp"/>
                </Link>
            </HStack>
        </Box>

        <Alert
                status='success'
                fontSize={'0.8rem'}
            >
                <AlertIcon />
                Секрет хранится до {new Date(Date.now() + ttlSeconds * 1000).toLocaleString('ru-RU')}, еще {days} дней, {hours} часов, {minutes}  минут.
            </Alert>

        <Alert
            fontSize={'0.8rem'}
            status="warning"
            // variant="subtle"
            // flexDirection="row"
            // justifyContent="center"
            // alignItems="center"
            // width='fit-content'
            mx='auto'
            my={5}   
        >
            <AlertIcon />
            Внимание! Секрет будет удален после расшифровки или истечения срока его действия.
        </Alert>

        <Alert 
            status='info'
            fontSize={'0.8rem'}
        >
            <AlertIcon />
            Если кодовая фраза будет введена неверно к существующему секрету, то появится сообщение, что секрета нет.
        </Alert>

        <Button boxShadow="md" colorScheme="blue" my={10} onClick={() => dispatch(secretActions.reset())}>
            Создать новый секрет
        </Button>
    </Box>
}

export default GenerateSuccess;
