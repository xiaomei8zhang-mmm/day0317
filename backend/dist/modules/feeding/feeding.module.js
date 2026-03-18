"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedingModule = void 0;
const common_1 = require("@nestjs/common");
const feeding_controller_1 = require("./feeding.controller");
const feeding_service_1 = require("./feeding.service");
let FeedingModule = class FeedingModule {
};
exports.FeedingModule = FeedingModule;
exports.FeedingModule = FeedingModule = __decorate([
    (0, common_1.Module)({
        controllers: [feeding_controller_1.FeedingController],
        providers: [feeding_service_1.FeedingService],
        exports: [feeding_service_1.FeedingService],
    })
], FeedingModule);
//# sourceMappingURL=feeding.module.js.map