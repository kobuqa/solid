/**
 * Single Responsibility
 * How: combine everything that has one reason to change and divide everything that has different reasons to change
 * It helps to split and decompose by one per module
 * It reduces amount of modules you need to change when business rules changes.
 * It reduces influence of changes that helps to control system complexity
*/


// BAD. Function perform 3 tasks - extract data, validation, network.

async function submitLoginForm(event) {
const form = event.target;
const data: Record<string, string> = {};
if (!form.email.value || !form.password.value) return;
data.email = form.email.value;
data.password = form.password.value;
const response = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(data),
});
return response.json();
}

/**
 * In code above we've 3 reasons to change:
 * 1. Extract data: Add new field to form - change that code(that consist of 3 tasks)
 * 2. Validation: Change rules or add new one - change that code(that consist of 3 tasks)
 * 3. Network: Change url - change that code(that consist of 3 tasks)
 */

// 1 Extract data
function extractLoginData(form) {
    const data: any = {};
    data.email = form.email.value;
    data.password = form.password.value;
    return data;
}

// 2 Validation
function isValidLogin({ email, password }) {
    return !!email && !!password;
}

// 3 Network
async function loginUser(data) {
    const method = "POST";
    const body = JSON.stringify(data);
    const response = await fetch("/api/login", { method, body });
    return await response.json();
}

/**
 * 
 * Now it only composes all 3 tasks in one. And changes in business of task will not affect that function code.
 */
async function submitLoginFormReworked(event) {
    const form = event.target;
    const data = extractLoginData(form);
    if (!isValidLogin(data)) return;
    return await loginUser(data);
}