import { existsSync, readFileSync, writeFileSync, mkdirSync, appendFileSync } from 'fs';
import { eachLine } from 'line-reader';

let section = process.argv.slice(2)[0];
let section_id = (section.replace(/ /g, '_')).toLowerCase();
let section_name = (section.replace(/_/g, ' ')).toLowerCase();

if (!existsSync(`./content/${section_id}.pug`) && !existsSync(`./content/${section_id}`)){

  let content = readFileSync('./src/templates/_section.pug', 'utf-8');

  const words = section_name.split(" ");
  for (let idx in words) {
      words[idx] = words[idx][0].toUpperCase() + words[idx].substr(1);
  }
  section_name = words.join(" ");
  content = content.replaceAll('${section}', section_name);

  let path = process.cwd();
  let folder = path.substring(path.lastIndexOf("/")+1);
  content = content.replace('${folder_name}', folder);

  writeFileSync(`./content/${section_id}.pug`, content);
  mkdirSync(`./content/${section_id}`);
  mkdirSync(`./content/${section_id}/images`);
  mkdirSync(`./content/${section_id}/listings`);

  let exists = false;
  eachLine('./content/page_items.pug', (item, last)=>{
    if (item.trim() != ''){
      if (item.includes(`./${section_id}`)){
        exists = true;
      }
    }
    if (last){
      if (!exists){
        appendFileSync('./content/page_items.pug', `include ./${section_id}\r\n`);
      }
    }
  });

  console.log(`\x1b[32m Section "${section_id}" created succesfully...\r\n \x1b[0m`);

} else {
  console.log(`\x1b[31m No action taken, section "${section_id}" file or folder already exists!!!\r\n \x1b[0m`);
}