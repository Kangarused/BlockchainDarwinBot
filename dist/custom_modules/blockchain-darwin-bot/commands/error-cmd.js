"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorCmd {
    static announceError(channel, message) {
        var error = message != null ? message : "Whoops, something went wrong.";
        channel.sendMessage(error);
    }
}
exports.default = ErrorCmd;
//# sourceMappingURL=error-cmd.js.map