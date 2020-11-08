const inquirer = require('inquirer');
const fs = require('fs');

// Bonus using async/await and try/catch
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
      ]);
  
      //const md = generateHTML(answers);
  
      //fs.writeFileSync ('samplefile.md', md);
  
      console.log('Successfully wrote to index.html');
    } catch (err) {
      console.log(err);
    }
  };

  promptUser();