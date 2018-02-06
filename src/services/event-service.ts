import EventModel from "../classes/event-model";

export default class EventService {
    private events: EventModel<any>[];
    public static EventTypes = {
        message: "message",
        newMember: "guildMemberAdd"
    }

    constructor() {
        this.events = [];
    }

    public getEvent<T>(type: string, trigger: string): EventModel<T> {
        var fEvent: EventModel<T> = null;
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

    public getEvents<T>(): EventModel<T>[] {
        return this.events;
    }

    public getEventsByType<T>(type: string): EventModel<T>[] {
        var events = [];
        this.events.forEach((event) => {
            if (event.type == type) {
                events.push(event);
            }
        });
        return events;
    }

    public addTrigger<T>(
        type: string, 
        name: string,
        trigger: string,
        description: string, 
        regexValidator: RegExp, 
        callback: any
    ) {
        var options = <App.IEventOptions>{
            type: type, 
            name: name, 
            trigger: trigger, 
            description: description, 
            regexValidator: regexValidator, 
            callback: callback
        };
        var event = new EventModel<T>(options);
        this.events.push(event);
    }

    public addEvent<T>(
        type: string,
        regexValidator: RegExp,
        callback: any
    ) {
        var options = <App.IEventOptions>{
            type: type,
            regexValidator: regexValidator, 
            callback: callback,
            showHelp: false
        };
        var event = new EventModel<T>(options);
        this.events.push(event);
    }

    public removeEvent(trigger: string) {
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