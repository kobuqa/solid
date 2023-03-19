/**
 * Liskov's Substitution
 * Conditions:
 1 - preconditions cannot be enforced in subtype.
 2 - postconditions cannot be weakened in subtype.
 */

interface User  {
    getSessionId(): void;
    updateProfile(data: string): void;
}

const user: User = {
    getSessionId() {
        console.log('Session id is #' + Math.random)
    },
    updateProfile(data) {
        console.log('Updated profile with ' + data);
    },
}


// Error - guests cant have profile and cant update it
const guest: User = {
    getSessionId() {
        console.log('Session id is #' + Math.random)
    },
}

/**
 * Solution
 */

interface UserLSP {
    getSessionId(): void;
}

interface UserWithProfile {
    updateProfile(data: string): void
}

const userLSP: UserLSP & UserWithProfile = {
    getSessionId() {
        console.log('Session id is #' + Math.random)
    },
    updateProfile(data) {
        console.log('Updated profile with ' + data);
    },
} 

const guestLSP: UserLSP = {
    getSessionId() {
        console.log('Session id is #' + Math.random)
    }, 
}

// clientCode
function getUserId(user: UserLSP) {
    console.log(user.getSessionId());
}

// Substitution: user can be replacable by its subtype guest
getUserId(userLSP);
getUserId(guestLSP);