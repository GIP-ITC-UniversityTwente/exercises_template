
import { writeFileSync, readFileSync } from 'fs';
import CryptoJS from 'crypto-js';

let secret =  "U2FsdGVkX18priCtyp9HURRhvQsxfN0rSA+xnwFc8Es="

var hosts = readFileSync('./content/hosts', 'utf-8')

var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(hosts.split(',')), secret).toString();
writeFileSync('./src/hosts.cypher.js', `export const ___ = "${ciphertext}"`);
