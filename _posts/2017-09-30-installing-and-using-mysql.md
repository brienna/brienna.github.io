---
layout: post
title: "Setting up and using MySQL on MacOS"
date: 2017-09-30
comments: true
---

*Notes from the first week of ISTE-608: Database Design and Implementation, during which I set up and began using MySQL on my MacBook for the first time.*

## Downloading and installing MySQL

Download the open source MySQL Community Server ([version 5.7.19](https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-5.7.19-macos10.12-x86_64.dmg)) as a DMG file, open it, and double-click on the package to launch the installer.

During installation, a dialog will pop up to inform you of the temporary root password. Save it. If you lose it, consult the section "How to Reset the Root Password" in the [MySQL 5.7 reference manual](https://dev.mysql.com/doc/refman/5.7/en/).

## Setting up MySQL

**Set server preferences:**

1. Open System Preferences. You should notice a MySQL icon.
2. Click the icon to enter the MySQL pane. 
3. Ensure that the checkbox to “Automatically Start MySQL Server on Startup” is checked.
4. Start the server by clicking the “Start MySQL Server” button. This should be the only time you need to start the server, because you have it set up to automatically start on startup. But if you stop the server yourself, you can start it back up this way.

  **Change the temporary root password:**

{:start="5"}
5. Open a Terminal window and start a MySQL session by executing `/usr/local/mysql/bin/mysql -u root -p`.
6. Enter the temporary root password at the prompt. You will see a message starting with "Welcome to the MySQL monitor."
7. Execute the following ALTER USER command: `ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';`. Substitute `new_password` with your new password. The single quotes need to be included. 

## Using MySQL

To use MySQL from now on, follow steps 5 and 6 above, but using the root password that you set. You can run multiple sessions at the same time, one session per Terminal window. To quit a session, type `quit` and enter.

### Useful commands

**`--tee` or `\T`:**

This command lets you log everything that is displayed on the screen during the session. All of this data is appended to the file you specify. You can use this command when starting a session by adding the following argument: `--tee [absolute_path_to_log_file]`. Or you can use it anytime during the session: `\T [absolute_path_to_log_file]`.

**`\G`:**

If a table has many attributes, it can appear as a disorganized mess when printed in Terminal. There are several [solutions](https://stackoverflow.com/questions/924729/mysql-select-many-fields-how-best-to-display-in-terminal) for this. I like the ego command, which tells the server to display the table vertically. Just add on the `\G` flag in place of the `;` at the end of a SQL statement, like `SELECT * FROM table \G`.

