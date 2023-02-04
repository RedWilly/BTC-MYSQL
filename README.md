# BTC-MYSQL

## Import Script for MySQL Database
This is a Node.js script for importing data into a MySQL database. The script reads data from a text file, splits it into chunks, and imports each chunk into the database using the "INSERT INTO" SQL query.

### Prerequisites
Node.js
MySQL Server
A database and table created in the MySQL Server
Usage
Clone this repository to your local machine.
Install the required dependencies using npm install.
Update the MySQL connection information in the import.js file, including the host, user, password, and database name.
Update the file path in the import.js file to point to the text file that you want to import.
Run the script using node import.js.
File Format
The text file should contain one line for each record to be imported. Each line should contain two values separated by a comma, which will be used as the values for the "address" and "private_key" columns in the database.

Note
This script is designed to handle large text files, and imports the data in chunks to avoid exceeding the maximum memory limit. The chunk size can be adjusted in the CHUNK_SIZE constant in the import.js file.
