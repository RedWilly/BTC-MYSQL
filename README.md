# BTC-MYSQL

## Import Script for MySQL Database ( Import.js ) 
This is a Node.js script for importing data into a MySQL database. The script reads data from a text file, splits it into chunks, and imports each chunk into the database using the "INSERT INTO" SQL query.

### Prerequisites
- Node.js
- MySQL Server
- A database and table created in the MySQL Server

### Usage
1. Clone this repository to your local machine.
2. Install the required dependencies using npm install.
3. Update the MySQL connection information in the import.js file, including the host, user, password, and database name.
4. Update the file path in the import.js file to point to the text file that you want to import.
4. Run the script using node import.js.

### File Format
The text file should contain one line for each record to be imported. Each line should contain two values separated by a comma, which will be used as the values for the "address" and "private_key" columns in the database.

### Note
This script is designed to handle large text files, and imports the data in chunks to avoid exceeding the maximum memory limit. The chunk size can be adjusted in the CHUNK_SIZE constant in the import.js file.

'i will recommend you use LOAD DATA INFILE'

## Bitcoin Jackpot ( Index.js )
This script generates and checks Bitcoin addresses using Bitcore-lib and MySQL to see if they exist in a database. If an address exists in the database, the address and its private key are saved to a file named "Jackpot.txt". The script runs continuously for 11 hours and then pauses for 1 hour before resuming again.

### Configuration
To configure the database connection, modify the following section with your own database details:
```
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Password3@',
  database: 'btc500'
});
```

### Usage
1. Clone the repository to your local machine
2. Install the required dependencies by running npm install
3. Start the script by running node index.js

### Verbose Mode
By default, the script only displays the results of the jackpot addresses found in the database. If you would like to see all the logs, set the verbose option to *true*:
```
const verbose = false;
```
### Jackpot Addresses
The found jackpot addresses and their private keys are saved to a file named "Jackpot.txt". The format of each line in the file is:
```
Address: [Address], Private Key: [Private Key]
```
