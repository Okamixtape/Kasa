try {
    require('./server.js');
} catch (e) {
    console.error('Caught an error during server startup:');
    console.error(e);
    process.exit(1);
}