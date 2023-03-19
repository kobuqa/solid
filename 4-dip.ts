/**
 * Dependency Inversion - high level modules dont have to be dependent on low level modules. Both has to be dependent on abstractions.
 * Abstractions should not depend on details, details should depend on abstractions.
 * 
 * It helps to reduce coupling.
 * Coupling - degree of interdependence of different modules.
 * The higher the coupling, the more fragile the system becomes, and the more difficult it is to make changes.
 * 
 * Cohesion - degree to which the tasks of a module are related to each other.
 * The higher the cohesion, the more strictly the modules follow the SRP, the more the module is focused on a specific task.
 */

// BAD

interface DB {
    connect(): void; 
}
const mySQLConnection: DB = {
    connect() {
        // real connection
        console.log('[MySQL]: Connected.')
    }
}

const mongoDBConnection: DB = {
    connect() {
        // real connection
        console.log('[MongoDB]: Connected.')
    }
}

const auth = {
    authenticate() {
        // High coupling - Auth module depends on concrete module, not abstraction. It's fragile. If you want to change db. You have to rewrite code.
        mySQLConnection.connect()
    }
}

// GOOD
const authDIP = {
    authenticate(db: DB) {
        // Low coupling - Auth module depends on abstraction DB. It's solid.
       db.connect();
    }
}

authDIP.authenticate(mySQLConnection);
authDIP.authenticate(mongoDBConnection);

// When you will test auth module u can mock real db :)

const mockDB: DB = {
    connect() {
        console.log('[MockDB]: Mocked')
    },
}

authDIP.authenticate(mockDB)