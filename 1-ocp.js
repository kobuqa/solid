/**
 * Open Closed
 * Open to extend - functionality can be extended by other modules.
 * Closed to changes - extending the functionality of a module should not lead to changes in the modules that use it.
 */
var smsSender = {
    sendSms: function (msg) { return console.log("Sending sms: ".concat(msg)); }
};
var emailSender = {
    sendEmail: function (msg) { return console.log("Sending email: ".concat(msg)); }
};
// Type Guard for less checks in notifier
var isEmailSender = function (type) {
    if (type.sendEmail)
        return true;
    return false;
};
var notifier = {
    message: 'Lorem Ipsum',
    notify: function (notifier) {
        if (isEmailSender(notifier))
            notifier.sendEmail(this.message);
        else
            notifier.sendSms(this.message);
    }
};
notifier.notify(emailSender);
notifier.notify(smsSender);
