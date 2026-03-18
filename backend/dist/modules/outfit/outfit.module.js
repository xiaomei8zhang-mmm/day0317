"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutfitModule = void 0;
const common_1 = require("@nestjs/common");
const outfit_controller_1 = require("./outfit.controller");
const outfit_service_1 = require("./outfit.service");
let OutfitModule = class OutfitModule {
};
exports.OutfitModule = OutfitModule;
exports.OutfitModule = OutfitModule = __decorate([
    (0, common_1.Module)({
        controllers: [outfit_controller_1.OutfitController],
        providers: [outfit_service_1.OutfitService],
        exports: [outfit_service_1.OutfitService],
    })
], OutfitModule);
//# sourceMappingURL=outfit.module.js.map