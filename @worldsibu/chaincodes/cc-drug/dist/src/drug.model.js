"use strict";
/** @module @worldsibu/convector-examples-token */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var yup = require("yup");
var convector_core_model_1 = require("@worldsibu/convector-core-model");
var report_model_1 = require("./report.model");
var Drug = /** @class */ (function (_super) {
    tslib_1.__extends(Drug, _super);
    function Drug() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'io.worldsibu.examples.drug';
        return _this;
    }
    tslib_1.__decorate([
        convector_core_model_1.ReadOnly()
    ], Drug.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.ReadOnly(),
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], Drug.prototype, "name", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.date())
        /** Current user owning the drug. */
    ], Drug.prototype, "holder", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.array(report_model_1.Report))
        /** Current user owning the drug. */
    ], Drug.prototype, "reports", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.date())
        /** Date in which it was modified. */
    ], Drug.prototype, "modified", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
        /** Last user that modified it. */
    ], Drug.prototype, "modifiedBy", void 0);
    tslib_1.__decorate([
        convector_core_model_1.ReadOnly(),
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.date()),
        convector_core_model_1.Default(function () { return Date.now; })
        /** Unmodifiable date of creation. Default will be the date when created the object. */
    ], Drug.prototype, "created", void 0);
    tslib_1.__decorate([
        convector_core_model_1.ReadOnly(),
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
        /** Unmodifiable creator in the network. Default will be the cert requesting the creation in the controller. */
    ], Drug.prototype, "createdBy", void 0);
    return Drug;
}(convector_core_model_1.ConvectorModel));
exports.Drug = Drug;
//# sourceMappingURL=drug.model.js.map