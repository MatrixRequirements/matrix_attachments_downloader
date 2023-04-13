const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require('fs');
const path = require('path');

const main = async (baseUrl, project, token) => {
  if (!baseUrl || !project || !token) {
    console.log('Usage: node app.js <BASE_URL> <PROJECT> <TOKEN>');
    process.exit(1);
  }
 const headers =  {
   'Authorization': `Token ${token}`
 }
  //Getting the project linked files 
  const url = `${baseUrl}/rest/1/${project}/file`;
  const response = await fetch(url, {
    headers:headers
  });

  if (!response.ok) {
    console.log(`Error: ${response.statusText}`);
    process.exit(1);
  }

  const data = await response.json();
  
  const projectFiles = data.projectFile;
  if (!fs.existsSync(project)) {
    fs.mkdirSync(project);
  }

  ///Let's download each file
  for (const file of projectFiles) {
    const fileUrl = `${baseUrl}/rest/1/${project}/file/${file.fileId}?key=${file.key}`;
    const fileResponse = await fetch(fileUrl, {
      headers: headers
    });

    if (!fileResponse.ok) {
      console.log(`Error downloading file ${file.localName}: ${fileResponse.statusText}`);
      continue;
    }
    
    const filePath = path.join(project,file.fileId + "_" + file.localName);
    const fileStream = fs.createWriteStream(filePath);
    fileResponse.body.pipe(fileStream);
    console.log(`Downloading ${file.fileId + "_" +file.localName}...`);
    await new Promise((resolve, reject) => {
      fileStream.on('finish', resolve);
      fileStream.on('error', reject);
    });
    console.log(`Downloaded ${file.fileId + "_" +file.localName}`);
  }
};

const [_, __, baseUrl, project, token] = process.argv;
main(baseUrl, project, token).catch(err => {
  console.error(err);
  process.exit(1);
});

