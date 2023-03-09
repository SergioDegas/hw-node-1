const fs = require("fs");
const path = require("path");
const contactsPath = path.resolve("./db/contacts.json");

function handleError(error) {
  console.error(error);
  return;
}
function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

function writeFilePromise(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

async function contactsList() {
  try {
    const data = await readFilePromise(contactsPath, "utf-8");
    console.table(JSON.parse(data));
  } catch (error) {
    handleError(error);
  }
}

async function getContactById(id) {
  try {
    const data = await readFilePromise(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contact = contacts.find((item) => item.id === id);
    console.log(contact);
  } catch (error) {
    handleError(error);
  }
}

async function removeContact(id) {
  try {
    const data = await readFilePromise(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const newContacts = contacts.filter((item) => item.id !== id);
    await fs.promises.writeFile(contactsPath, JSON.stringify(newContacts));
    console.log(`Contact with id ${id} was removed`);
  } catch (error) {
    console.error(error);
  }
}



async function addContact(name, email, phone) {
  try {
    const data = await readFilePromise(contactsPath);
    const contacts = JSON.parse(data);
    const id = Date.now().toString();
    const newContact = { id };
    if (name) {
      newContact.name = name;
    }
    if (email) {
      newContact.email = email;
    }
    if (phone) {
      newContact.phone = phone;
    }
    const updateContact = [...contacts, newContact];
    await writeFilePromise(contactsPath, JSON.stringify(updateContact));
    console.table("New contact has been added!");
  } catch (error) {
    handleError(error);
  }
}
module.exports = {
  addContact,
  removeContact,
  contactsList,
  getContactById,
};