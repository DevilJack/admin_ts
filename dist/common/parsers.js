"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseString = exports.parseNumber = void 0;
function parseNumber(object, column) {
    return parseInt(object[column]);
}
exports.parseNumber = parseNumber;
function parseString(object, column) {
    return object[column].toString();
}
exports.parseString = parseString;
