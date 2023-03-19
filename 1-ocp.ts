/**
 * Open Closed
 * Open to extend - functionality can be extended by other modules.
 * Closed to changes - extending the functionality of a module should not lead to changes in the modules that use it.
 * How: make dependency on abstraction, not realisation.
 */


// Violation of OCP example
interface SmsSender {
    sendSms(msg: string): void;
}
interface EmailSender {
    sendEmail(msg: string): void;
}

const smsSender: SmsSender = {
    sendSms: (msg) => console.log(`Sending sms: ${msg}`)
}

const emailSender: EmailSender = {
    sendEmail: (msg) => console.log(`Sending email: ${msg}`)
}

type NotifierType = SmsSender | EmailSender

// Type Guard for less checks in notifier
const isEmailSender = (type: NotifierType): type is EmailSender =>  {
    if((type as EmailSender).sendEmail) return true;
    return false;
}

const notifier = {
    message: 'Lorem Ipsum',
    // Fragile and open to changes method. If u need to add one more way of notification - u've to change a code below.
    notify(notifier: NotifierType) {
        if(isEmailSender(notifier)) notifier.sendEmail(this.message)
        else notifier.sendSms(this.message)
    }
}

notifier.notify(emailSender);
notifier.notify(smsSender);

// Same example but with OCP

interface SenderOCP {
    send(msg: string): void
}

interface NotifierOCP {
    message: string;
    notify(sender: SenderOCP): void;
}

const smsSenderOCP: SenderOCP = {
    send: msg => console.log(`Sending sms: ${msg}`)
}

const emailSenderOCP: SenderOCP = {
    send: msg => console.log(`Sending email: ${msg}`)
}

const notifierOCP: NotifierOCP = {
    message: 'Lorem Ipsum',
    // Solid and closed to changes(Closed to changes). Extendable functionality since u can pass different sender with interface SenderOCP and will works fine.
    notify(sender: SenderOCP) {
        sender.send(this.message)
    }
}

// Works as before
notifierOCP.notify(smsSenderOCP);
notifierOCP.notify(emailSenderOCP);

// Let's extend functionality(Open to extend)
const pushSender: SenderOCP = {
    send: msg => console.log(`Sending push: ${msg}`)
}

// Extended functionality works fine.
notifierOCP.notify(pushSender);