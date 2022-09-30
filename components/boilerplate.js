const fs = require('fs');
const folderName = process.argv[2];

fs.mkdirSync(folderName);
const str = `import './${folderName}.module.css';

export default function ${folderName}(){
  return(
    <p>You are in ${folderName}</p>
  );
}
`;

fs.writeFileSync(`${folderName}/${folderName}.module.css`, "")
fs.writeFileSync(`${folderName}/${folderName}.js`, str)


