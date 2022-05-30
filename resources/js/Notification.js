var notification_list;
var notifications = [];
var firstNotificationBottom = 2;
var marginBottomPerNotification = 4;

function uuid4() {
    var uuid = "",
        i, random;
    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if (i == 8 || i == 12 || i == 16 || i == 20) {
            uuid += "-"
        }
        uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
}

function initialize() {
    notification_list = document.getElementById("notification-list");
    if (notification_list == null || notification_list == undefined) {
        var notificationListObject = document.createElement("div");
        notificationListObject.id = "notification-list";
        notificationListObject.classList.add("notification-list");
        document.body.appendChild(notificationListObject);
        notification_list = notificationListObject;
    }
}

function notify(title, message, notificationDuration) {
    var marginBottom = calculateNotificationBottomMarign();
    var notificationId = uuid4();
    var newNotification = {
        "notification": `
        <div id="${notificationId}" class="notification-bar notification-bar-active" style="position: fixed; bottom: ${marginBottom}rem; left: 1rem; width: auto; padding: 1rem; margin: 0px; color: rgb(250, 250, 250); font: 1rem normal Roboto, sans-serif; border-radius: 5px; background: rgb(33, 33, 33) none repeat scroll 0% 0%; box-shadow: rgba(10, 10, 11, 0.125) 0px 0px 1px 1px; cursor: default; transition: all 0.5s cubic-bezier(0.89, 0.01, 0.5, 1.1) 0s; transform: translateZ(0px); z-index: 200;">
            <div class="notification-bar-wrapper"><span class="notification-bar-title" style="font-weight: 700; margin-right: 0.5rem;">${title}</span><span class="notification-bar-message">${message}</span></div>
        </div>
        `,
        "notification_id": notificationId,
        "bottom": marginBottom,
        "callback": getNotificationCallback(notificationDuration)
    };
    disableOtherTimeouts();
    notifications.push(newNotification);
    notification_list.innerHTML += newNotification["notification"];
}

function enableNextTimeout(notificationDuration) {
    if (notifications.length != 0) {
        notifications[0]["callback"] = getNotificationCallback(notificationDuration);
    }
}

function getNotificationCallback(notificationDuration) {
    return setTimeout(function() {
        if (notifications.length != 0) {
            document.getElementById(notifications[0]["notification_id"]).parentNode.removeChild(document.getElementById(notifications[0]["notification_id"]));
            notifications.splice(0, 1);
            chnageNotificationsBottomMargin();
            if (notifications.length != 0)
                enableNextTimeout(notificationDuration);
        }
    }, notificationDuration);
}

function chnageNotificationsBottomMargin() {
    for (var i = 0; i < notifications.length; i++) {
        document.getElementById(notifications[i]["notification_id"]).style.bottom = 2 + i * marginBottomPerNotification + "rem";
    }
}

function disableOtherTimeouts() {
    if (notifications.length != 0) {
        for (var i = 0; i < notifications.length; i++) {
            clearTimeout(notifications[i]["callback"]);
        }
    }
}

function calculateNotificationBottomMarign() {
    if (notifications.length == 0) {
        return firstNotificationBottom;
    } else {
        return notifications[notifications.length - 1]["bottom"] + marginBottomPerNotification;
    }
}

(function() {
    initialize();
})();