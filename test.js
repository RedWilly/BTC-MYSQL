const mysql = require('mysql');

// Configuration for database connection
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Password3@',
    database: 'btc500'
});

// Function to run periodically and check for matches
const run = () => {
    console.log('Program is now running');
    let interval = setInterval(() => {
        connection.query(`SELECT * FROM btc500 WHERE address IS NULL`, (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                console.log(`Match found: ${results[0].address}`);
                clearInterval(interval);
                // Add code here to send the address and private key to a Telegram account
                process.exit();
            }
        });
    }, 10000);
};

// Test function to simulate a match found in the database
const simulateMatchFound = () => {
    connection.query(`INSERT INTO btc500 (address) VALUES ('1LPBetDzQ3cYwqQepg4teFwR7FnR1TkMCM')`, (error) => {
        if (error) throw error;
        console.log('Simulated match found in database');
    });
};

// Test the run function
run();

// Test the simulateMatchFound function
setTimeout(() => {
    simulateMatchFound();
}, 200);
