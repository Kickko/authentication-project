"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 48:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleAuthenticationController = void 0;
const common_1 = __webpack_require__(6);
const google_guard_1 = __webpack_require__(49);
let GoogleAuthenticationController = class GoogleAuthenticationController {
    constructor() { }
    async handleLogin() {
        return {
            msg: 'Google Authentication',
        };
    }
    async handleRedirect(req) {
        return req.user;
    }
    async user(req) {
        if (req.user) {
            console.log(req.user, "Authenticated User");
            return {
                msg: "Authenticated",
            };
        }
        else {
            console.log(req.user, "User cannot found");
            return {
                msg: "Not Authenticated",
            };
        }
    }
};
__decorate([
    (0, common_1.Get)('/login'),
    (0, common_1.UseGuards)(google_guard_1.GoogleAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GoogleAuthenticationController.prototype, "handleLogin", null);
__decorate([
    (0, common_1.Get)('/redirect'),
    (0, common_1.UseGuards)(google_guard_1.GoogleAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GoogleAuthenticationController.prototype, "handleRedirect", null);
__decorate([
    (0, common_1.Get)('/status'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GoogleAuthenticationController.prototype, "user", null);
GoogleAuthenticationController = __decorate([
    (0, common_1.Controller)('auth/google'),
    __metadata("design:paramtypes", [])
], GoogleAuthenticationController);
exports.GoogleAuthenticationController = GoogleAuthenticationController;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("c3c17956959c0d0dca59")
/******/ })();
/******/ 
/******/ }
;