"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_model_1 = require("../classes/event-model");
class EventService {
    constructor() {
        this.events = [];
    }
    getEvent(type, trigger) {
        var fEvent = null;
        this.events.some((event) => {
            if (event.regexValidator != null) {
                if (event.type == type && event.regexValidator.test(trigger)) {
                    fEvent = event;
                    return true;
                }
            }
        });
        return fEvent;
    }
    getEvents() {
        return this.events;
    }
    getEventsByType(type) {
        var events = [];
        this.events.forEach((event) => {
            if (event.type == type) {
                events.push(event);
            }
        });
        return events;
    }
    addTrigger(type, name, trigger, description, regexValidator, callback) {
        var options = {
            type: type,
            name: name,
            trigger: trigger,
            description: description,
            regexValidator: regexValidator,
            callback: callback
        };
        var event = new event_model_1.default(options);
        this.events.push(event);
    }
    addEvent(type, regexValidator, callback) {
        var options = {
            type: type,
            regexValidator: regexValidator,
            callback: callback,
            showHelp: false
        };
        var event = new event_model_1.default(options);
        this.events.push(event);
    }
    removeEvent(trigger) {
        var fIndex;
        this.events.some((event, index) => {
            if (event.trigger == trigger) {
                fIndex = index;
                return true;
            }
        });
        if (fIndex != -1) {
            this.events.splice(fIndex, 1);
        }
    }
}
EventService.EventTypes = {
    message: "message",
    newMember: "guildMemberAdd"
};
exports.default = EventService;
//# sourceMappingURL=event-service.js.map