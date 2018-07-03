import { FormApi, FormSubscription } from "final-form";
interface LocalStorageOptions {
    form: FormApi;
    key?: string;
    storage?: Storage;
    subscription?: FormSubscription;
}
declare const connectToLocalStorage: (options: LocalStorageOptions) => import("../../../../../../../../Users/pbalbier/Documents/Development/ff/packages/final-form-local-storage/node_modules/final-form").Unsubscribe;
export default connectToLocalStorage;
