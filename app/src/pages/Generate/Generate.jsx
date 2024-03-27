import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import GenerateForm from "../../components/GenerateForm/GenerateForm";
import GenerateSuccess from "../GenerateSuccess/GenerateSuccess";

import appConfig from '../../../config';

import { secretActions } from "../../store/secret";

function Generate() {

    const dispatch = useDispatch();
    const secretKey = useSelector((state) => state.secret.secretKey)

    const generateSubmitHandler = async (code_phrase, secret_content, ttl_seconds) => {
        const url = `${appConfig.API_BACKEND}/generate`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                secret_content: secret_content,
                code_phrase: code_phrase,
                ttl_seconds: ttl_seconds
            }),
        });
        
        if (response.ok) {
            const json = await response.json();

            if (json.secret_key &&  json.ttl_seconds) {
                dispatch(secretActions.setSecretKey(
                    {secretKey: json.secret_key}
                ));
                dispatch(secretActions.setTtlSeconds({ttlSeconds: json.ttl_seconds}));
                dispatch(secretActions.setCodePhrase({codePhrase: code_phrase}));
            }
            
        } else {
            console.log(`response = ${response}`);
        }
    };

    return <>
        { !secretKey && <GenerateForm submitHandler={generateSubmitHandler}/> }
        {secretKey && <GenerateSuccess/>}
    </>
}

export default Generate;
