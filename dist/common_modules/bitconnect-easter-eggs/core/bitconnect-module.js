"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_service_1 = require("../../../services/event-service");
const easter_egg_events_1 = require("../events/easter-egg-events");
class BitconnectModule {
    static InjectEvents(eventService) {
        eventService.addEvent(event_service_1.default.EventTypes.message, /[bB]itconnect/, (message) => {
            var lotto = easter_egg_events_1.default.spinWheel();
            if (lotto != -1) {
                easter_egg_events_1.default.hatchEgg(lotto, message);
            }
        });
    }
}
exports.default = BitconnectModule;
//# sourceMappingURL=bitconnect-module.js.map