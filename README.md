## Quickbase task - CLI program retrieving github user info

Tech Stack - Javascript, Node.js
Editor used - VS Code

After downloading/cloning the project and opening it with the editor you can start the terminal (Ctrl + ` in VS Code). Then in the terminal type "npm install" to install all the packages provided.

There are two functions:
- node app.js make:contact -g GITHUB_NAME -f FRESHDESK_SUBDOMAIN (Starting the function which makes a contact in freshdesk)
- node app.js update:contact -f FRESHDESK_SUBDOMAIN -i CONTACT_ID -p NEW_PHONE_NUMBER (Updates an already existing user's contact info - phone number)

A .env example file is provided for the names of variables (.env.example)
Sql file for the creation of the postgres database is provided (db_create.sql)
