import "jest";
import * as v from "jsverify";
import * as TypeMoq from "typemoq";

import { arbitraryFormState } from "./arbitraries/formState";
import { DataStorage } from "./interfaces/DataStorage";
import { saveValues } from "./saveValues";

test("saveValues calls storage.setItem with proper data", () => {
  v.assert(
    v.forall(
      v.record({
        formState: arbitraryFormState,
        key: v.asciinestring
      }),
      ({ formState, key }) => {
        const storageMock = TypeMoq.Mock.ofType<DataStorage>();
        storageMock.setup(storage =>
          storage.saveData(TypeMoq.It.isAny(), TypeMoq.It.isAny())
        );

        saveValues({ key, storage: storageMock.object })(formState);

        storageMock.verify(
          storage => storage.saveData(key, JSON.stringify(formState.values)),
          TypeMoq.Times.once()
        );

        return true;
      }
    )
  );
});
