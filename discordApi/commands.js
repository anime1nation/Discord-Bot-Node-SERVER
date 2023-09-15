import { REST, Routes } from 'discord.js';
import {token,clientId} from './config.js'
// Creating commands for intraction
const commands = [
  {
    name: 'ppcreateuser', //create user
    description: 'This prompt will create a new user',
    options: [ //options for intraction
        {
          name: 'discordusername',
          description: 'Discord username of the new user',
          type: 3,
          required: true,
        },
        {
          name: 'email',
          description: 'Email of the new user',
          type: 3,
          required: true,
        },
        {
          name: 'password',
          description: 'Password for the new user',
          type: 3,
          required: true,
        },
      ]
  },
  {
    name: 'ppcreateservice', //create service
    description: 'This prompt will create a new service',
    options: [
        {
          name: 'servicename',
          description: 'serviceName for the user',
          type: 3,
          required: true,
        },
        {
          name: 'servicelink',
          description: 'serviceLink of the new service',
          type: 3,
          required: true,
        },
        {
          name: 'monthlyfee',
          description: 'monthlyFee for the new service',
          type: 3,
          required: true,
        },
      ],
  },
  {
    name: 'ppgetuser', // Get user with service
    description: 'This prompt will fetch user with subscription information',
    options: [
        {
          name: 'username',
          description: 'username for the user',
          type: 3,
          required: true,
        }
    ]
  }
];

const rest = new REST({ version: '10' }).setToken(token);

try {

  console.log(`Started refreshing application (/${commands.map(x=>x.name)}) commands.`);
  // creating all the intraction commands with option 
  await rest.put(Routes.applicationCommands(clientId), { body: commands });

  console.log(`Successfully reloaded application (/${commands.map(x=>x.name)}) commands.`);
} catch (error) {
  console.error(error);
}