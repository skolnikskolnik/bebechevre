const inquirer = require('inquirer');
const fs = require('fs');

//Function to write README file
const writeToFile = (fileName, data) => {
    console.log(fileName);
    console.log(data);
}

//Function to generate the markdown for the README
const generateMarkdown = (data) => {
    console.log(`# ${data.title}`);
    return `# ${data.title}
    `;

}

// Asks users a series of questions about their project
const promptUser = async () => {

    try {
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

        //const md = generateHTML(answers);

        //fs.writeFileSync ('samplefile.md', md);
        writeToFile("sampleName", answers);
        generateMarkdown(answers);
    } catch (err) {
        console.log(err);
    }
};

promptUser();