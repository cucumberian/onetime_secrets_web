/* eslint-disable react/prop-types */
import QRCode from "react-qr-code";
import { Box } from "@chakra-ui/react";

function QrCode({url, size}) {
    return (
        <Box maxWidth={size} width={'100%'} p={5} boxShadow={'base'} borderRadius={'xl'} bg={'white'}>
            <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={url}
                viewBox={`0 0 256 256`}
            />
        </Box>
        
    );
}

export default QrCode;
