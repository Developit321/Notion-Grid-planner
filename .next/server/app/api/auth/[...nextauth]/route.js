"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Fcookiemonster%2FDocuments%2FReact-app%2FCuddles-CMS%2FInsta_grid%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fcookiemonster%2FDocuments%2FReact-app%2FCuddles-CMS%2FInsta_grid&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Fcookiemonster%2FDocuments%2FReact-app%2FCuddles-CMS%2FInsta_grid%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fcookiemonster%2FDocuments%2FReact-app%2FCuddles-CMS%2FInsta_grid&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_cookiemonster_Documents_React_app_Cuddles_CMS_Insta_grid_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"/Users/cookiemonster/Documents/React-app/Cuddles-CMS/Insta_grid/app/api/auth/[...nextauth]/route.ts\",\n    nextConfigOutput,\n    userland: _Users_cookiemonster_Documents_React_app_Cuddles_CMS_Insta_grid_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmNvb2tpZW1vbnN0ZXIlMkZEb2N1bWVudHMlMkZSZWFjdC1hcHAlMkZDdWRkbGVzLUNNUyUyRkluc3RhX2dyaWQlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGY29va2llbW9uc3RlciUyRkRvY3VtZW50cyUyRlJlYWN0LWFwcCUyRkN1ZGRsZXMtQ01TJTJGSW5zdGFfZ3JpZCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDbUQ7QUFDaEk7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pbnN0YS1ncmlkLz9hODI3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9Vc2Vycy9jb29raWVtb25zdGVyL0RvY3VtZW50cy9SZWFjdC1hcHAvQ3VkZGxlcy1DTVMvSW5zdGFfZ3JpZC9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvY29va2llbW9uc3Rlci9Eb2N1bWVudHMvUmVhY3QtYXBwL0N1ZGRsZXMtQ01TL0luc3RhX2dyaWQvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Fcookiemonster%2FDocuments%2FReact-app%2FCuddles-CMS%2FInsta_grid%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fcookiemonster%2FDocuments%2FReact-app%2FCuddles-CMS%2FInsta_grid&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n\n\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(_lib_auth__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFpQztBQUNRO0FBRXpDLE1BQU1FLFVBQVVGLGdEQUFRQSxDQUFDQyxrREFBV0E7QUFFTyIsInNvdXJjZXMiOlsid2VicGFjazovL2luc3RhLWdyaWQvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cz9jOGE0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOZXh0QXV0aCBmcm9tIFwibmV4dC1hdXRoXCI7XG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XG5cbmNvbnN0IGhhbmRsZXIgPSBOZXh0QXV0aChhdXRoT3B0aW9ucyk7XG5cbmV4cG9ydCB7IGhhbmRsZXIgYXMgR0VULCBoYW5kbGVyIGFzIFBPU1QgfTtcbiJdLCJuYW1lcyI6WyJOZXh0QXV0aCIsImF1dGhPcHRpb25zIiwiaGFuZGxlciIsIkdFVCIsIlBPU1QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var _mongodb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mongodb */ \"(rsc)/./lib/mongodb.ts\");\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                console.log(\"[Login] authorize called\");\n                console.log(\"[Login] Credentials provided:\", {\n                    email: credentials?.email,\n                    hasPassword: !!credentials?.password\n                });\n                if (!credentials?.email || !credentials?.password) {\n                    console.log(\"[Login] Missing email or password\");\n                    throw new Error(\"Please enter email and password\");\n                }\n                console.log(\"[Login] Attempting to connect to MongoDB...\");\n                const db = await (0,_mongodb__WEBPACK_IMPORTED_MODULE_2__.getDb)();\n                console.log(\"[Login] MongoDB connected, looking up user...\");\n                const user = await db.collection(\"users\").findOne({\n                    email: credentials.email.toLowerCase()\n                });\n                if (!user) {\n                    console.log(\"[Login] User not found:\", credentials.email);\n                    throw new Error(\"No user found with this email\");\n                }\n                console.log(\"[Login] User found, verifying password...\");\n                const isValidPassword = await bcryptjs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].compare(credentials.password, user.passwordHash);\n                if (!isValidPassword) {\n                    console.log(\"[Login] Invalid password for:\", credentials.email);\n                    throw new Error(\"Invalid password\");\n                }\n                console.log(\"[Login] Authentication successful for:\", credentials.email);\n                return {\n                    id: user._id.toString(),\n                    email: user.email,\n                    name: user.name || user.email.split(\"@\")[0]\n                };\n            }\n        })\n    ],\n    session: {\n        strategy: \"jwt\",\n        maxAge: 30 * 24 * 60 * 60\n    },\n    pages: {\n        signIn: \"/login\",\n        error: \"/login\"\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.id = token.id;\n            }\n            return session;\n        }\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ2tFO0FBQ3BDO0FBQ0k7QUFFM0IsTUFBTUcsY0FBK0I7SUFDMUNDLFdBQVc7UUFDVEosMkVBQW1CQSxDQUFDO1lBQ2xCSyxNQUFNO1lBQ05DLGFBQWE7Z0JBQ1hDLE9BQU87b0JBQUVDLE9BQU87b0JBQVNDLE1BQU07Z0JBQVE7Z0JBQ3ZDQyxVQUFVO29CQUFFRixPQUFPO29CQUFZQyxNQUFNO2dCQUFXO1lBQ2xEO1lBQ0EsTUFBTUUsV0FBVUwsV0FBVztnQkFDekJNLFFBQVFDLEdBQUcsQ0FBQztnQkFDWkQsUUFBUUMsR0FBRyxDQUFDLGlDQUFpQztvQkFDM0NOLE9BQU9ELGFBQWFDO29CQUNwQk8sYUFBYSxDQUFDLENBQUNSLGFBQWFJO2dCQUM5QjtnQkFFQSxJQUFJLENBQUNKLGFBQWFDLFNBQVMsQ0FBQ0QsYUFBYUksVUFBVTtvQkFDakRFLFFBQVFDLEdBQUcsQ0FBQztvQkFDWixNQUFNLElBQUlFLE1BQU07Z0JBQ2xCO2dCQUVBSCxRQUFRQyxHQUFHLENBQUM7Z0JBQ1osTUFBTUcsS0FBSyxNQUFNZCwrQ0FBS0E7Z0JBQ3RCVSxRQUFRQyxHQUFHLENBQUM7Z0JBRVosTUFBTUksT0FBTyxNQUFNRCxHQUFHRSxVQUFVLENBQUMsU0FBU0MsT0FBTyxDQUFDO29CQUNoRFosT0FBT0QsWUFBWUMsS0FBSyxDQUFDYSxXQUFXO2dCQUN0QztnQkFFQSxJQUFJLENBQUNILE1BQU07b0JBQ1RMLFFBQVFDLEdBQUcsQ0FBQywyQkFBMkJQLFlBQVlDLEtBQUs7b0JBQ3hELE1BQU0sSUFBSVEsTUFBTTtnQkFDbEI7Z0JBRUFILFFBQVFDLEdBQUcsQ0FBQztnQkFDWixNQUFNUSxrQkFBa0IsTUFBTXBCLHdEQUFjLENBQzFDSyxZQUFZSSxRQUFRLEVBQ3BCTyxLQUFLTSxZQUFZO2dCQUduQixJQUFJLENBQUNGLGlCQUFpQjtvQkFDcEJULFFBQVFDLEdBQUcsQ0FBQyxpQ0FBaUNQLFlBQVlDLEtBQUs7b0JBQzlELE1BQU0sSUFBSVEsTUFBTTtnQkFDbEI7Z0JBRUFILFFBQVFDLEdBQUcsQ0FBQywwQ0FBMENQLFlBQVlDLEtBQUs7Z0JBQ3ZFLE9BQU87b0JBQ0xpQixJQUFJUCxLQUFLUSxHQUFHLENBQUNDLFFBQVE7b0JBQ3JCbkIsT0FBT1UsS0FBS1YsS0FBSztvQkFDakJGLE1BQU1ZLEtBQUtaLElBQUksSUFBSVksS0FBS1YsS0FBSyxDQUFDb0IsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM3QztZQUNGO1FBQ0Y7S0FDRDtJQUNEQyxTQUFTO1FBQ1BDLFVBQVU7UUFDVkMsUUFBUSxLQUFLLEtBQUssS0FBSztJQUN6QjtJQUNBQyxPQUFPO1FBQ0xDLFFBQVE7UUFDUkMsT0FBTztJQUNUO0lBQ0FDLFdBQVc7UUFDVCxNQUFNQyxLQUFJLEVBQUVDLEtBQUssRUFBRW5CLElBQUksRUFBRTtZQUN2QixJQUFJQSxNQUFNO2dCQUNSbUIsTUFBTVosRUFBRSxHQUFHUCxLQUFLTyxFQUFFO1lBQ3BCO1lBQ0EsT0FBT1k7UUFDVDtRQUNBLE1BQU1SLFNBQVEsRUFBRUEsT0FBTyxFQUFFUSxLQUFLLEVBQUU7WUFDOUIsSUFBSVIsUUFBUVgsSUFBSSxFQUFFO2dCQUNmVyxRQUFRWCxJQUFJLENBQVNPLEVBQUUsR0FBR1ksTUFBTVosRUFBRTtZQUNyQztZQUNBLE9BQU9JO1FBQ1Q7SUFDRjtJQUNBUyxRQUFRQyxRQUFRQyxHQUFHLENBQUNDLGVBQWU7QUFDckMsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL2luc3RhLWdyaWQvLi9saWIvYXV0aC50cz9iZjdlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRBdXRoT3B0aW9ucyB9IGZyb20gXCJuZXh0LWF1dGhcIjtcbmltcG9ydCBDcmVkZW50aWFsc1Byb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzXCI7XG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRqc1wiO1xuaW1wb3J0IHsgZ2V0RGIgfSBmcm9tIFwiLi9tb25nb2RiXCI7XG5cbmV4cG9ydCBjb25zdCBhdXRoT3B0aW9uczogTmV4dEF1dGhPcHRpb25zID0ge1xuICBwcm92aWRlcnM6IFtcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcbiAgICAgIG5hbWU6IFwiY3JlZGVudGlhbHNcIixcbiAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgIGVtYWlsOiB7IGxhYmVsOiBcIkVtYWlsXCIsIHR5cGU6IFwiZW1haWxcIiB9LFxuICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogXCJQYXNzd29yZFwiLCB0eXBlOiBcInBhc3N3b3JkXCIgfSxcbiAgICAgIH0sXG4gICAgICBhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJbTG9naW5dIGF1dGhvcml6ZSBjYWxsZWRcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiW0xvZ2luXSBDcmVkZW50aWFscyBwcm92aWRlZDpcIiwgeyBcbiAgICAgICAgICBlbWFpbDogY3JlZGVudGlhbHM/LmVtYWlsLCBcbiAgICAgICAgICBoYXNQYXNzd29yZDogISFjcmVkZW50aWFscz8ucGFzc3dvcmQgXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghY3JlZGVudGlhbHM/LmVtYWlsIHx8ICFjcmVkZW50aWFscz8ucGFzc3dvcmQpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIltMb2dpbl0gTWlzc2luZyBlbWFpbCBvciBwYXNzd29yZFwiKTtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZW50ZXIgZW1haWwgYW5kIHBhc3N3b3JkXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJbTG9naW5dIEF0dGVtcHRpbmcgdG8gY29ubmVjdCB0byBNb25nb0RCLi4uXCIpO1xuICAgICAgICBjb25zdCBkYiA9IGF3YWl0IGdldERiKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiW0xvZ2luXSBNb25nb0RCIGNvbm5lY3RlZCwgbG9va2luZyB1cCB1c2VyLi4uXCIpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJ1c2Vyc1wiKS5maW5kT25lKHsgXG4gICAgICAgICAgZW1haWw6IGNyZWRlbnRpYWxzLmVtYWlsLnRvTG93ZXJDYXNlKCkgXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiW0xvZ2luXSBVc2VyIG5vdCBmb3VuZDpcIiwgY3JlZGVudGlhbHMuZW1haWwpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHVzZXIgZm91bmQgd2l0aCB0aGlzIGVtYWlsXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJbTG9naW5dIFVzZXIgZm91bmQsIHZlcmlmeWluZyBwYXNzd29yZC4uLlwiKTtcbiAgICAgICAgY29uc3QgaXNWYWxpZFBhc3N3b3JkID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUoXG4gICAgICAgICAgY3JlZGVudGlhbHMucGFzc3dvcmQsXG4gICAgICAgICAgdXNlci5wYXNzd29yZEhhc2hcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoIWlzVmFsaWRQYXNzd29yZCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiW0xvZ2luXSBJbnZhbGlkIHBhc3N3b3JkIGZvcjpcIiwgY3JlZGVudGlhbHMuZW1haWwpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgcGFzc3dvcmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyhcIltMb2dpbl0gQXV0aGVudGljYXRpb24gc3VjY2Vzc2Z1bCBmb3I6XCIsIGNyZWRlbnRpYWxzLmVtYWlsKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpZDogdXNlci5faWQudG9TdHJpbmcoKSxcbiAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUgfHwgdXNlci5lbWFpbC5zcGxpdChcIkBcIilbMF0sXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBzZXNzaW9uOiB7XG4gICAgc3RyYXRlZ3k6IFwiand0XCIsXG4gICAgbWF4QWdlOiAzMCAqIDI0ICogNjAgKiA2MCwgLy8gMzAgZGF5c1xuICB9LFxuICBwYWdlczoge1xuICAgIHNpZ25JbjogXCIvbG9naW5cIixcbiAgICBlcnJvcjogXCIvbG9naW5cIixcbiAgfSxcbiAgY2FsbGJhY2tzOiB7XG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xuICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgdG9rZW4uaWQgPSB1c2VyLmlkO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH0sXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcbiAgICAgIGlmIChzZXNzaW9uLnVzZXIpIHtcbiAgICAgICAgKHNlc3Npb24udXNlciBhcyBhbnkpLmlkID0gdG9rZW4uaWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2Vzc2lvbjtcbiAgICB9LFxuICB9LFxuICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCxcbn07XG4iXSwibmFtZXMiOlsiQ3JlZGVudGlhbHNQcm92aWRlciIsImJjcnlwdCIsImdldERiIiwiYXV0aE9wdGlvbnMiLCJwcm92aWRlcnMiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJlbWFpbCIsImxhYmVsIiwidHlwZSIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwiY29uc29sZSIsImxvZyIsImhhc1Bhc3N3b3JkIiwiRXJyb3IiLCJkYiIsInVzZXIiLCJjb2xsZWN0aW9uIiwiZmluZE9uZSIsInRvTG93ZXJDYXNlIiwiaXNWYWxpZFBhc3N3b3JkIiwiY29tcGFyZSIsInBhc3N3b3JkSGFzaCIsImlkIiwiX2lkIiwidG9TdHJpbmciLCJzcGxpdCIsInNlc3Npb24iLCJzdHJhdGVneSIsIm1heEFnZSIsInBhZ2VzIiwic2lnbkluIiwiZXJyb3IiLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsInNlY3JldCIsInByb2Nlc3MiLCJlbnYiLCJORVhUQVVUSF9TRUNSRVQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/mongodb.ts":
/*!************************!*\
  !*** ./lib/mongodb.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   getDb: () => (/* binding */ getDb)\n/* harmony export */ });\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);\n\nconst options = {\n    serverApi: {\n        version: mongodb__WEBPACK_IMPORTED_MODULE_0__.ServerApiVersion.v1,\n        strict: true,\n        deprecationErrors: true\n    }\n};\nlet client = null;\nlet clientPromise = null;\n/** Build MongoDB URI from env. Supports full MONGODB_URI or separate user/password/cluster (password is URL-encoded for you). */ function getMongoUri() {\n    const fullUri = process.env.MONGODB_URI;\n    if (fullUri && fullUri.trim()) {\n        console.log(\"[MongoDB] Using MONGODB_URI (full connection string)\");\n        // Extract username and cluster from URI for logging (without password)\n        try {\n            const match = fullUri.match(/mongodb\\+srv:\\/\\/([^:]+):([^@]+)@([^/]+)/);\n            if (match) {\n                console.log(\"[MongoDB] Username:\", match[1]);\n                console.log(\"[MongoDB] Cluster:\", match[3]);\n            }\n        } catch (e) {\n        // Ignore parsing errors\n        }\n        return fullUri.trim();\n    }\n    const user = process.env.MONGODB_USER;\n    const password = process.env.MONGODB_PASSWORD;\n    const cluster = process.env.MONGODB_CLUSTER; // e.g. pedocluster.vyjvmsk.mongodb.net\n    const dbName = process.env.MONGODB_DB_NAME || \"instagram_grid_planner\";\n    if (user && password && cluster) {\n        console.log(\"[MongoDB] Using separate env vars (MONGODB_USER/PASSWORD/CLUSTER)\");\n        console.log(\"[MongoDB] Username:\", user);\n        console.log(\"[MongoDB] Cluster:\", cluster);\n        const encodedUser = encodeURIComponent(user);\n        const encodedPassword = encodeURIComponent(password);\n        return `mongodb+srv://${encodedUser}:${encodedPassword}@${cluster}/${dbName}?retryWrites=true&w=majority`;\n    }\n    return \"\";\n}\nfunction getClientPromise() {\n    const uri = getMongoUri();\n    console.log(\"[MongoDB] getClientPromise called\");\n    console.log(\"[MongoDB] NODE_ENV:\", \"development\");\n    console.log(\"[MongoDB] URI exists:\", !!uri);\n    console.log(\"[MongoDB] URI starts with:\", uri ? uri.substring(0, 25) + \"...\" : \"N/A\");\n    if (!uri) {\n        console.error(\"[MongoDB] ERROR: Set MONGODB_URI, or MONGODB_USER + MONGODB_PASSWORD + MONGODB_CLUSTER in .env.local\");\n        throw new Error(\"Please add your MongoDB URI (or user/password/cluster) to .env.local\");\n    }\n    if (true) {\n        // In development, use a global variable to preserve the connection across HMR\n        if (!global._mongoClientPromise) {\n            console.log(\"[MongoDB] Creating new client (development)\");\n            client = new mongodb__WEBPACK_IMPORTED_MODULE_0__.MongoClient(uri, options);\n            global._mongoClientPromise = client.connect().then((client)=>{\n                console.log(\"[MongoDB] Connected successfully (development)\");\n                return client;\n            }).catch((error)=>{\n                console.error(\"[MongoDB] Connection error (development):\", error);\n                throw error;\n            });\n        }\n        return global._mongoClientPromise;\n    } else {}\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getClientPromise);\nasync function getDb() {\n    console.log(\"[MongoDB] getDb called\");\n    try {\n        const client = await getClientPromise();\n        const db = client.db(\"instagram_grid_planner\");\n        console.log(\"[MongoDB] Database 'instagram_grid_planner' accessed\");\n        return db;\n    } catch (error) {\n        console.error(\"[MongoDB] getDb error:\", error);\n        throw error;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1FBQ1osT0FBTzRCO0lBQ1QsRUFBRSxPQUFPWCxPQUFPO1FBQ2RsQixRQUFRa0IsS0FBSyxDQUFDLDBCQUEwQkE7UUFDeEMsTUFBTUE7SUFDUjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaW5zdGEtZ3JpZC8uL2xpYi9tb25nb2RiLnRzPzA1YmQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9uZ29DbGllbnQsIERiLCBTZXJ2ZXJBcGlWZXJzaW9uIH0gZnJvbSBcIm1vbmdvZGJcIjtcblxuY29uc3Qgb3B0aW9ucyA9IHtcbiAgc2VydmVyQXBpOiB7XG4gICAgdmVyc2lvbjogU2VydmVyQXBpVmVyc2lvbi52MSxcbiAgICBzdHJpY3Q6IHRydWUsXG4gICAgZGVwcmVjYXRpb25FcnJvcnM6IHRydWUsXG4gIH0sXG59O1xuXG5sZXQgY2xpZW50OiBNb25nb0NsaWVudCB8IG51bGwgPSBudWxsO1xubGV0IGNsaWVudFByb21pc2U6IFByb21pc2U8TW9uZ29DbGllbnQ+IHwgbnVsbCA9IG51bGw7XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgdmFyIF9tb25nb0NsaWVudFByb21pc2U6IFByb21pc2U8TW9uZ29DbGllbnQ+IHwgdW5kZWZpbmVkO1xufVxuXG4vKiogQnVpbGQgTW9uZ29EQiBVUkkgZnJvbSBlbnYuIFN1cHBvcnRzIGZ1bGwgTU9OR09EQl9VUkkgb3Igc2VwYXJhdGUgdXNlci9wYXNzd29yZC9jbHVzdGVyIChwYXNzd29yZCBpcyBVUkwtZW5jb2RlZCBmb3IgeW91KS4gKi9cbmZ1bmN0aW9uIGdldE1vbmdvVXJpKCk6IHN0cmluZyB7XG4gIGNvbnN0IGZ1bGxVcmkgPSBwcm9jZXNzLmVudi5NT05HT0RCX1VSSTtcbiAgaWYgKGZ1bGxVcmkgJiYgZnVsbFVyaS50cmltKCkpIHtcbiAgICBjb25zb2xlLmxvZyhcIltNb25nb0RCXSBVc2luZyBNT05HT0RCX1VSSSAoZnVsbCBjb25uZWN0aW9uIHN0cmluZylcIik7XG4gICAgLy8gRXh0cmFjdCB1c2VybmFtZSBhbmQgY2x1c3RlciBmcm9tIFVSSSBmb3IgbG9nZ2luZyAod2l0aG91dCBwYXNzd29yZClcbiAgICB0cnkge1xuICAgICAgY29uc3QgbWF0Y2ggPSBmdWxsVXJpLm1hdGNoKC9tb25nb2RiXFwrc3J2OlxcL1xcLyhbXjpdKyk6KFteQF0rKUAoW14vXSspLyk7XG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJbTW9uZ29EQl0gVXNlcm5hbWU6XCIsIG1hdGNoWzFdKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJbTW9uZ29EQl0gQ2x1c3RlcjpcIiwgbWF0Y2hbM10pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIElnbm9yZSBwYXJzaW5nIGVycm9yc1xuICAgIH1cbiAgICByZXR1cm4gZnVsbFVyaS50cmltKCk7XG4gIH1cbiAgY29uc3QgdXNlciA9IHByb2Nlc3MuZW52Lk1PTkdPREJfVVNFUjtcbiAgY29uc3QgcGFzc3dvcmQgPSBwcm9jZXNzLmVudi5NT05HT0RCX1BBU1NXT1JEO1xuICBjb25zdCBjbHVzdGVyID0gcHJvY2Vzcy5lbnYuTU9OR09EQl9DTFVTVEVSOyAvLyBlLmcuIHBlZG9jbHVzdGVyLnZ5anZtc2subW9uZ29kYi5uZXRcbiAgY29uc3QgZGJOYW1lID0gcHJvY2Vzcy5lbnYuTU9OR09EQl9EQl9OQU1FIHx8IFwiaW5zdGFncmFtX2dyaWRfcGxhbm5lclwiO1xuICBpZiAodXNlciAmJiBwYXNzd29yZCAmJiBjbHVzdGVyKSB7XG4gICAgY29uc29sZS5sb2coXCJbTW9uZ29EQl0gVXNpbmcgc2VwYXJhdGUgZW52IHZhcnMgKE1PTkdPREJfVVNFUi9QQVNTV09SRC9DTFVTVEVSKVwiKTtcbiAgICBjb25zb2xlLmxvZyhcIltNb25nb0RCXSBVc2VybmFtZTpcIiwgdXNlcik7XG4gICAgY29uc29sZS5sb2coXCJbTW9uZ29EQl0gQ2x1c3RlcjpcIiwgY2x1c3Rlcik7XG4gICAgY29uc3QgZW5jb2RlZFVzZXIgPSBlbmNvZGVVUklDb21wb25lbnQodXNlcik7XG4gICAgY29uc3QgZW5jb2RlZFBhc3N3b3JkID0gZW5jb2RlVVJJQ29tcG9uZW50KHBhc3N3b3JkKTtcbiAgICByZXR1cm4gYG1vbmdvZGIrc3J2Oi8vJHtlbmNvZGVkVXNlcn06JHtlbmNvZGVkUGFzc3dvcmR9QCR7Y2x1c3Rlcn0vJHtkYk5hbWV9P3JldHJ5V3JpdGVzPXRydWUmdz1tYWpvcml0eWA7XG4gIH1cbiAgcmV0dXJuIFwiXCI7XG59XG5cbmZ1bmN0aW9uIGdldENsaWVudFByb21pc2UoKTogUHJvbWlzZTxNb25nb0NsaWVudD4ge1xuICBjb25zdCB1cmkgPSBnZXRNb25nb1VyaSgpO1xuICBjb25zb2xlLmxvZyhcIltNb25nb0RCXSBnZXRDbGllbnRQcm9taXNlIGNhbGxlZFwiKTtcbiAgY29uc29sZS5sb2coXCJbTW9uZ29EQl0gTk9ERV9FTlY6XCIsIHByb2Nlc3MuZW52Lk5PREVfRU5WKTtcbiAgY29uc29sZS5sb2coXCJbTW9uZ29EQl0gVVJJIGV4aXN0czpcIiwgISF1cmkpO1xuICBjb25zb2xlLmxvZyhcIltNb25nb0RCXSBVUkkgc3RhcnRzIHdpdGg6XCIsIHVyaSA/IHVyaS5zdWJzdHJpbmcoMCwgMjUpICsgXCIuLi5cIiA6IFwiTi9BXCIpO1xuXG4gIGlmICghdXJpKSB7XG4gICAgY29uc29sZS5lcnJvcihcIltNb25nb0RCXSBFUlJPUjogU2V0IE1PTkdPREJfVVJJLCBvciBNT05HT0RCX1VTRVIgKyBNT05HT0RCX1BBU1NXT1JEICsgTU9OR09EQl9DTFVTVEVSIGluIC5lbnYubG9jYWxcIik7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIGFkZCB5b3VyIE1vbmdvREIgVVJJIChvciB1c2VyL3Bhc3N3b3JkL2NsdXN0ZXIpIHRvIC5lbnYubG9jYWxcIik7XG4gIH1cblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwiZGV2ZWxvcG1lbnRcIikge1xuICAgIC8vIEluIGRldmVsb3BtZW50LCB1c2UgYSBnbG9iYWwgdmFyaWFibGUgdG8gcHJlc2VydmUgdGhlIGNvbm5lY3Rpb24gYWNyb3NzIEhNUlxuICAgIGlmICghZ2xvYmFsLl9tb25nb0NsaWVudFByb21pc2UpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiW01vbmdvREJdIENyZWF0aW5nIG5ldyBjbGllbnQgKGRldmVsb3BtZW50KVwiKTtcbiAgICAgIGNsaWVudCA9IG5ldyBNb25nb0NsaWVudCh1cmksIG9wdGlvbnMpO1xuICAgICAgZ2xvYmFsLl9tb25nb0NsaWVudFByb21pc2UgPSBjbGllbnQuY29ubmVjdCgpLnRoZW4oKGNsaWVudCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIltNb25nb0RCXSBDb25uZWN0ZWQgc3VjY2Vzc2Z1bGx5IChkZXZlbG9wbWVudClcIik7XG4gICAgICAgIHJldHVybiBjbGllbnQ7XG4gICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIltNb25nb0RCXSBDb25uZWN0aW9uIGVycm9yIChkZXZlbG9wbWVudCk6XCIsIGVycm9yKTtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGdsb2JhbC5fbW9uZ29DbGllbnRQcm9taXNlO1xuICB9IGVsc2Uge1xuICAgIC8vIEluIHByb2R1Y3Rpb24sIGNyZWF0ZSBhIG5ldyBjbGllbnQgZm9yIGVhY2ggcmVxdWVzdFxuICAgIGlmICghY2xpZW50UHJvbWlzZSkge1xuICAgICAgY29uc29sZS5sb2coXCJbTW9uZ29EQl0gQ3JlYXRpbmcgbmV3IGNsaWVudCAocHJvZHVjdGlvbilcIik7XG4gICAgICBjbGllbnQgPSBuZXcgTW9uZ29DbGllbnQodXJpLCBvcHRpb25zKTtcbiAgICAgIGNsaWVudFByb21pc2UgPSBjbGllbnQuY29ubmVjdCgpLnRoZW4oKGNsaWVudCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIltNb25nb0RCXSBDb25uZWN0ZWQgc3VjY2Vzc2Z1bGx5IChwcm9kdWN0aW9uKVwiKTtcbiAgICAgICAgcmV0dXJuIGNsaWVudDtcbiAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiW01vbmdvREJdIENvbm5lY3Rpb24gZXJyb3IgKHByb2R1Y3Rpb24pOlwiLCBlcnJvcik7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJbTW9uZ29EQl0gRXJyb3IgZGV0YWlsczpcIiwge1xuICAgICAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsXG4gICAgICAgICAgbmFtZTogZXJyb3IubmFtZSxcbiAgICAgICAgICBzdGFjazogZXJyb3Iuc3RhY2ssXG4gICAgICAgIH0pO1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gY2xpZW50UHJvbWlzZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRDbGllbnRQcm9taXNlO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0RGIoKTogUHJvbWlzZTxEYj4ge1xuICBjb25zb2xlLmxvZyhcIltNb25nb0RCXSBnZXREYiBjYWxsZWRcIik7XG4gIHRyeSB7XG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgZ2V0Q2xpZW50UHJvbWlzZSgpO1xuICAgIGNvbnN0IGRiID0gY2xpZW50LmRiKFwiaW5zdGFncmFtX2dyaWRfcGxhbm5lclwiKTtcbiAgICBjb25zb2xlLmxvZyhcIltNb25nb0RCXSBEYXRhYmFzZSAnaW5zdGFncmFtX2dyaWRfcGxhbm5lcicgYWNjZXNzZWRcIik7XG4gICAgcmV0dXJuIGRiO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJbTW9uZ29EQl0gZ2V0RGIgZXJyb3I6XCIsIGVycm9yKTtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk1vbmdvQ2xpZW50IiwiU2VydmVyQXBpVmVyc2lvbiIsIm9wdGlvbnMiLCJzZXJ2ZXJBcGkiLCJ2ZXJzaW9uIiwidjEiLCJzdHJpY3QiLCJkZXByZWNhdGlvbkVycm9ycyIsImNsaWVudCIsImNsaWVudFByb21pc2UiLCJnZXRNb25nb1VyaSIsImZ1bGxVcmkiLCJwcm9jZXNzIiwiZW52IiwiTU9OR09EQl9VUkkiLCJ0cmltIiwiY29uc29sZSIsImxvZyIsIm1hdGNoIiwiZSIsInVzZXIiLCJNT05HT0RCX1VTRVIiLCJwYXNzd29yZCIsIk1PTkdPREJfUEFTU1dPUkQiLCJjbHVzdGVyIiwiTU9OR09EQl9DTFVTVEVSIiwiZGJOYW1lIiwiTU9OR09EQl9EQl9OQU1FIiwiZW5jb2RlZFVzZXIiLCJlbmNvZGVVUklDb21wb25lbnQiLCJlbmNvZGVkUGFzc3dvcmQiLCJnZXRDbGllbnRQcm9taXNlIiwidXJpIiwic3Vic3RyaW5nIiwiZXJyb3IiLCJFcnJvciIsImdsb2JhbCIsIl9tb25nb0NsaWVudFByb21pc2UiLCJjb25uZWN0IiwidGhlbiIsImNhdGNoIiwibWVzc2FnZSIsIm5hbWUiLCJzdGFjayIsImdldERiIiwiZGIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/mongodb.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/uuid","vendor-chunks/oauth","vendor-chunks/@panva","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/bcryptjs","vendor-chunks/preact","vendor-chunks/oidc-token-hash","vendor-chunks/lru-cache","vendor-chunks/cookie"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Fcookiemonster%2FDocuments%2FReact-app%2FCuddles-CMS%2FInsta_grid%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fcookiemonster%2FDocuments%2FReact-app%2FCuddles-CMS%2FInsta_grid&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();