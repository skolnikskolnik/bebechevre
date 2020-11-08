const inquirer = require('inquirer');
const fs = require('fs');

//Function to generate the markdown for the README
const generateMarkdown = (data, fileName) => {
    //What is below gets recorded to the new file
    return `
    # ${data.title} 

    # Table of contents
    1. [Description](#desc)
    2. [Installation instructions](#install)
    3. [Usage](#usage)
    4. [Contributions](#contr)
    5. [Testing instructions](#testing)
    6. [License](#lic)
    7. [Questions](#quest)

    <a name="desc"></a>
    ## Description: ${data.description}

    <a name="install"></a>
    ## Installation instructions: ${data.installation_instructions}

    <a name="usage"></a>
    ## Usage: ${data.usage_information}

    <a name="contr"></a>
    ## Contributions: ${data.contribution}

    <a name="testint"></a>
    ## Testing instructions: ${data.test_instruction}

    <a name="lic"></a>
    ## License

    <a name="quest"></a>
    ## Questions
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
        const md = generateMarkdown(answers, fileName);

        fs.writeFileSync (fileName, md);

        console.log("Succssfully recorded your entry");
    } catch (err) {
        console.log(err);
    }
};

promptUser();