import dotenv from "dotenv";
dotenv.config();

function required(key, defaultValue=undefined){
    const value = process.env[key] || defaultValue;     // 앞 값이 존재한다면 앞 값이, 아니라면  뒷 값이 들어가는 문법!
    if (value == null){
        throw new Error(`Key ${key} is undefined`);
    }
    return value;
}

export const config = {
    host: {
        port: parseInt(required("HOST_PORT", 9090))
    },
    db: {
        host: required("DB_HOST")
        // user: required("DB_USER"),
        // database: required("DB_DATABASE"),
        // password: required("DB_PASSWORD")
    }
}