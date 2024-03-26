import {useState} from "react";

import GenerateForm from "../../components/GenerateForm/GenerateForm";
import GenerateSuccess from "../GenerateSuccess/GenerateSuccess";

import appConfig from '../../../config';


function Generate() {
    console.log('appConfig =', appConfig);

    const [secretKey, setSecretKey] = useState(null);

    const generateSubmitHandler = async (code_phrase, secret_content) => {
        const url = `${appConfig.API_BACKEND}/generate`;
        console.log('code_phrase =', code_phrase, 'secret_content =', secret_content);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({secret_content: secret_content, code_phrase: code_phrase}),
        });
        console.log('response =', response);
        
        
        if (response.ok) {
            const secret_key = await response.json()
            console.log('secret_key =', secret_key);
            if (secret_key) {
                setSecretKey(secret_key);
            }
            console.log('secret_key is empty =', secret_key);
        }
        else {
            console.log('error =', response.status);
        }
    };

    return <>
        { !secretKey && <GenerateForm submitHandler={generateSubmitHandler}/> }
        {secretKey && <GenerateSuccess secretKey={secretKey} setSecretKey={setSecretKey}/>}
    </>
}

export default Generate;
