"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_views_1 = __importDefault(require("koa-views"));
const path_1 = __importDefault(require("path"));
module.exports = koa_views_1.default(path_1.default.join(__dirname, '../../public/views'), { extension: 'html' });
