import {useState} from "react";

import GenerateForm from "../../components/GenerateForm/GenerateForm";
import GenerateSuccess from "../GenerateSuccess/GenerateSuccess";

import appConfig from '../../../config';


function Generate() {

    const [secretKey, setSecretKey] = useState(null);

    const generateSubmitHandler = async (code_phrase, secret_content) => {
        const url = `${appConfig.API_BACKEND}/generate`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({secret_content: secret_content, code_phrase: code_phrase}),
        });
        
        if (response.ok) {
            const secret_key = await response.json()
            if (secret_key) {
                setSecretKey(secret_key);
            }
        } else {
            console.log(`response = ${response}`);
        }
    };

    return <>
        { !secretKey && <GenerateForm submitHandler={generateSubmitHandler}/> }
        {secretKey && <GenerateSuccess secretKey={secretKey} setSecretKey={setSecretKey}/>}
    </>
}

export default Generate;
