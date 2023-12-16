import { Client, GatewayIntentBits } from "discord.js";
import apiCall from "./api.js";
import dotenv from 'dotenv';
import dictonary from "./disctonay.js";
dotenv.config()

const localAPI = process.env.localAPI
const token = process.env.token

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});


try {
  
// Discord Client login check
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// Check for any message from discord BOT than reply to the message 
client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  message.reply({ content: "Hey!! from bot! Type /dictionary and write word I will give you the meaning of that word 🖖" });
});

// check for any intraction by discord bot and perform action
client.on("interactionCreate", async (interaction) => {
  try {
    const { commandName, options, user } = interaction;
    console.log(user.username);

    //if no any intraction command 
    if (!interaction.isCommand()) return;

    // check for intraction 
    if (commandName === "ppcreateuser") {
      //getting value from option of intraction
      const username = options.getString("discordusername");
      const email = options.getString("email");
      const password = options.getString("password");
      // creating object for creating user
      const body = {
        username: username,
        email: email,
        password: password,
      };
      //calling AOI to create user
      const res = await apiCall({
        api:localAPI,
        path: "discord/signup",
        method: "POST",
        body: body 
      });
      //reply of the intraction
      await interaction.reply(res.message);
    }

    //check for intraction
    // if (commandName === "ppcreateservice") {
    //   const serviceName = options.getString("servicename");
    //   const serviceLink = options.getString("servicelink");
    //   const monthlyFee = options.getString("monthlyfee");

    //   // only login user can create their service
    //   // getting username from intraction user detail i.e discord username

    //   const body = {
    //     username: user.username,
    //     serviceName: serviceName,
    //     serviceLink: serviceLink,
    //     monthlyFee: monthlyFee,
    //   };
    //   // API call for creating service 
    //   const res = await apiCall({
    //     path: "discord/subscriptions",
    //     method: "POST",
    //     body: body,
    //   });
    //   // reply for the intraction 
    //   await interaction.reply(res.message);
    // }


    if (commandName === "dictionary") {
      const word = options.getString("word");

      // only login user can create their service
      // getting username from intraction user detail i.e discord username

      const body = {
        username: user.username,
        word: word,
      };

      // API call for creating service 
      // const res = await apiCall({
      //   api:localAPI,
      //   path: "discord/subscriptions",
      //   method: "POST",
      //   body: body,
      // });

      const getMeaning = await dictonary(word)
      // console.log("🚀 ~ file: discordApi.js:111 ~ client.on ~ getMeḁning:", getMeaning)

      // reply for the intraction 
      await interaction.reply(getMeaning);
    }

    // check for intraction
    if (commandName === "ppgetuser") {
      // getting option from intraction
      const userName = options.getString("username");
      //API call to get all user data 
      const res = await apiCall({
        api:localAPI,
        path: `discord/users/${user.userName}`,
        method: "GET"
      });
      // reply for the intraction 
      await interaction.reply(res.message);
    }
    // else{
    // await interaction.reply("Something went wrong!! Try again")
    // }
    // error handling
  } catch (error) {
    console.log("🚀 ~ file: discordApi.js:135 ~ client.on ~ err̥or:", error)
    await interaction.reply("Something went wrong!! Try again")
  }
});

client.login(token);
} catch (error) {
  console.error(error);
  await interaction.reply("Something went wrong!! Try again")
}