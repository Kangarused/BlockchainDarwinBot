/*
    The event model class is a generic model for all events driven through the event service.

    ::type => specifies which discord event the event_model is allowed for
    ::name => specifies the name of the event used for the help command
    ::trigger => specifies how the event can be triggerd in discord
    ::description => provides a description for the help command
    ::regexValidator => used to validate messages against what is expected from the trigger
    ::callback => the action to perform if the event is triggered
*/

export default class EventModel<T> {
    public type: string;
    public name: string;
    public trigger: string;
    public description: string;
    public regexValidator: RegExp;
    public callback: (response: T) => void;
    public showHelp: boolean;

    constructor(options: App.IEventOptions) {
        this.type = options.type;
        this.name = options.name != null ? options.name : null;
        this.trigger = options.trigger != null ? options.trigger : null;
        this.description = options.description != null ? options.description : null;
        this.callback = options.callback;
        this.regexValidator = options.regexValidator;
        this.showHelp = options.showHelp != null ? options.showHelp : true;
    }
}