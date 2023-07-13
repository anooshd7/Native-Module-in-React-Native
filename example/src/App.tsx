import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { concat } from 'react-native-test';
// @ts-ignore
import { nacl } from 'react-native-tweetnacl';
// @ts-ignore
import {
  decodeUTF8,
  encodeUTF8,
  encodeBase64,
  decodeBase64,
} from 'tweetnacl-util';

const newNonce = () => nacl.randomBytes(nacl.secretbox.nonceLength);

export const generateKey = () =>
  encodeBase64(nacl.randomBytes(nacl.secretbox.keyLength));

export const encrypt = (json: any, key: string) => {
  const keyUint8Array = decodeBase64(key);

  const nonce = newNonce();
  const messageUint8 = decodeUTF8(JSON.stringify(json));
  const box = nacl.secretbox(messageUint8, nonce, keyUint8Array);

  const fullMessage = new Uint8Array(nonce.length + box.length);
  fullMessage.set(nonce);
  fullMessage.set(box, nonce.length);

  const base64FullMessage = encodeBase64(fullMessage);
  return base64FullMessage;
};

export const decrypt = (messageWithNonce: string, key: string) => {
  const keyUint8Array = decodeBase64(key);
  const messageWithNonceAsUint8Array = decodeBase64(messageWithNonce);
  const nonce = messageWithNonceAsUint8Array.slice(
    0,
    nacl.secretbox.nonceLength
  );
  const message = messageWithNonceAsUint8Array.slice(
    nacl.secretbox.nonceLength,
    messageWithNonce.length
  );

  const decrypted = nacl.secretbox.open(message, nonce, keyUint8Array);

  if (!decrypted) {
    throw new Error('Could not decrypt message');
  }

  const base64DecryptedMessage = encodeUTF8(decrypted);
  return JSON.parse(base64DecryptedMessage);
};

export default function App() {
  const [result, setResult] = React.useState<string | undefined>();

  React.useEffect(() => {
    concat('hello', ' world').then(setResult);
    console.log(nacl.secretbox.keyLength);
    const key = generateKey();
    const obj = { hello: 'world' };
    const encrypted = encrypt(obj, key);
    const decrypted = decrypt(encrypted, key);
    console.log(encrypted);
    console.log(decrypted);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
