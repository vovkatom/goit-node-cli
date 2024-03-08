import { program } from "commander";

import * as contactsList from "./db/contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactsList.listContacts();
      return console.log(allContacts);

    case "get":
      const getContact = await contactsList.getContactById(id);
      return console.log(getContact);

    case "add":
      const addContact = await contactsList.addContact(name, email, phone);
      return console.log(addContact);

    case "remove":
      const removeContact = await contactsList.removeContact(id);
      return console.log(removeContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
