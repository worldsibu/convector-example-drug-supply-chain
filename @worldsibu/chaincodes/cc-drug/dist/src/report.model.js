"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yup = require("yup");
exports.Report = yup.object().shape({
    hash: yup.string().required(),
    url: yup.string().required()
});
//# sourceMappingURL=report.model.js.map