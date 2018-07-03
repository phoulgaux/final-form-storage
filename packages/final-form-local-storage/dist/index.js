"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var defaultOptions = function (options) {
    var form = options.form;
    var key = options.key || "form";
    var storage = options.storage || window.localStorage;
    var subscription = options.subscription || { values: true };
    return { storage: storage, key: key, form: form, subscription: subscription };
};
var connectToLocalStorage = function (options) {
    var _a = defaultOptions(options), storage = _a.storage, key = _a.key, form = _a.form, subscription = _a.subscription;
    var subscriber = function (state) {
        var values = storage.getItem(key);
        if (values && state.pristine) {
            form.batch(function () {
                var entries = mapValuesToEntries(values);
                entries.forEach(function (_a) {
                    var key = _a[0], value = _a[1];
                    var field = form.getFieldState(key);
                    if (field) {
                        field.change(value);
                    }
                });
            });
        }
        else {
            var serializedValues = JSON.stringify(state.values);
            storage.setItem(key, serializedValues);
        }
    };
    return form.subscribe(subscriber, subscription);
};
exports.default = connectToLocalStorage;
function mapValuesToEntries(values) {
    var parsedValues = JSON.parse(values);
    var entries = lodash_1.default.entries(parsedValues);
    return entries;
}
