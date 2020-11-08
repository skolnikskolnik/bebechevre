const inquirer = require('inquirer');
const fs = require('fs');

let licenseURL = "";
let license = "";

//Function to generate URL for github licence
//Got image URLs from https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba
const getLicenseURL = data => {
   license = data.license;
   if (license == "MIT License"){
       licenseURL = "https://camo.githubusercontent.com/3ccf4c50a1576b0dd30b286717451fa56b783512/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c6963656e73652d4d49542d79656c6c6f772e737667";
   }
   else if (license == "GNU AGPLv3"){
       licenseURL = "https://camo.githubusercontent.com/cb1d26ec555a33e9f09fe279b5edc49996a3bb3b/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c6963656e73652d4147504c25323076332d626c75652e737667";
   }
   else if (license == "GNU GPLv3"){
       licenseURL = "https://camo.githubusercontent.com/ec385922fa349d9c349f34b7f3bf311843e35ba8/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c6963656e73652d47504c76332d626c75652e737667";
   }
   else if (license == "GNU LGPLv3"){
       licenseURL = "https://camo.githubusercontent.com/4e8beb53bf7fc54e0addd2106a833503fc81a083/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c6963656e73652d4c47504c25323076332d626c75652e737667";
   }
   else if(license == "Mozilla Public License 2.0"){
       licenseURL = "https://camo.githubusercontent.com/2974b512e1d81d7699971d454d1ad238ba6f369e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c6963656e73652d4d504c253230322e302d627269676874677265656e2e737667";
   }
   else if(license == "Apache License 2.0"){
       licenseURL = "https://camo.githubusercontent.com/5b17d82d9a87c80cdd019bacb35c23f3515d33c3/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c6963656e73652d417061636865253230322e302d79656c6c6f77677265656e2e737667";
   }
   else if(license == "Boost Software License 1.0"){
       licenseURL = "https://camo.githubusercontent.com/8cae90fcd5cdbe393fa02f755077d5ed52d928de/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c6963656e73652d426f6f7374253230312e302d6c69676874626c75652e737667";
   }
   else if(license == "The Unlicense"){
       licenseURL = "https://camo.githubusercontent.com/a9d0efa59012e4cab570a613212866ac646f9f93/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d556e6c6963656e73652d626c75652e737667";
   }
   else{
       licenseURL = "";
   }
   return licenseURL;
   return license;
}

//Function to generate the markdown for the README
const generateMarkdown = (data) => {
    getLicenseURL(data);
    //licenseURL is now a variable with the image URL for the license

    let gitHubURL = `github.com/${data.github_username}`;
    let emailAddress = data.email;

    //What is below gets recorded to the new file
    return `
# ${data.title} 

![icon for license](${licenseURL})
# Table of contents
1. [Description](#Description)
2. [Installation instructions](#Installation-instructions)
3. [Usage](#usage)
4. [Contributions](#Contributions)
5. [Testing instructions](#Testing-instructions)
6. [License](#License)
7. [Questions](#Questions)

## Description: 
${data.description}

## Installation instructions: 
${data.installation_instructions}

## Usage: 
${data.usage_information}

## Contributions: 
${data.contribution}

## Testing instructions: 
${data.test_instruction}

## License:  
This project is covered under the ${license} license.

## Questions
Visit my [github page](${gitHubURL}).  
Email me at ${emailAddress} with any additional questions you may have. I am always happy to talk to users of my product!
    `;

}

module.exports = generateMarkdown;

// Asks users a series of questions about their project, generates the readme
const promptUser = async () => {

    try {
        //Makes an answers object with the responses from the user
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of your project?',
            },
            {
                type: 'input',
                name: 'description',
                message: 'Enter a description for your project',
            },
            {
                type: 'input',
                name: 'installation_instructions',
                message: 'Enter installation instructions for your project',
            },
            {
                type: 'input',
                name: 'usage_information',
                message: 'Enter user information for your project',
            },
            {
                type: 'input',
                name: 'contribution',
                message: 'Enter contribution guidelines for your project',
            },
            {
                type: 'input',
                name: 'test_instruction',
                message: 'Enter testing instructions for your project',
            },
            {
                type: 'list',
                message: 'What type of license are you using?',
                name: 'license',
                choices: ['MIT License', 'GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'Boost Software License 1.0', 'The Unlicense'],
            },
            {
                type: 'input',
                name: 'github_username',
                message: 'Enter your GitHub username',
            },
            {
                type: 'input',
                name: 'email',
                message: 'Enter your email address',
            },
        ]);

        const fileName = `${answers.title}README.md`;
        const md = generateMarkdown(answers);

        fs.writeFileSync (fileName, md);

        console.log("Succssfully recorded your entry");
    } catch (err) {
        console.log(err);
    }
};

promptUser();