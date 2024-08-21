import CryptoJS from "crypto-js";

/*-------------------------------- Encryption ----------------------------------------*/
export function encryption(data) {
  const encode_Key =
    "ugrtc4lcQ4JfGCNtWjtaDrs16nFA6v3Z9FTMouCcIWy0jQIgdvxTkRSqDt7C";
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    encode_Key
  ).toString();
  return encryptedData;
}

/*-------------------------------- Decryption ----------------------------------------*/
export function decryption(data) {
 
  const secretKey =
    "ugrtc4lcQ4JfGCNtWjtaDrs16nFA6v3Z9FTMouCcIWy0jQIgdvxTkRSqDt7C";
  const bytes = CryptoJS.AES.decrypt(data, secretKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
}
