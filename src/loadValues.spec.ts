import { MutableState, Tools } from "final-form";
import "jest";
import * as v from "jsverify";
import * as TypeMoq from "typemoq";

import { arbitraryMutableState } from "./arbitraries/mutableState";
import { DataStorage } from "./interfaces/DataStorage";
import { loadValues } from "./loadValues";

const toolsMock = TypeMoq.Mock.ofType<Tools>();

test("calls storage.getItem with proper data", () => {
  v.assertForall(
    v.record({
      key: v.asciinestring,
      mutableFormState: arbitraryMutableState
    }),
    ({ key, mutableFormState }) => {
      const storageMock = TypeMoq.Mock.ofType<DataStorage>();
      storageMock.setup(storage => storage.loadData(TypeMoq.It.isValue(key)));

      loadValues({ key, storage: storageMock.object })(
        [],
        mutableFormState as MutableState,
        toolsMock.object
      );

      storageMock.verify(
        storage => storage.loadData(TypeMoq.It.isAny()),
        TypeMoq.Times.once()
      );
      storageMock.verify(
        storage => storage.loadData(key),
        TypeMoq.Times.once()
      );

      return true;
    }
  );
});

test("loadValues mutates the form's state by replacing values", () => {
  v.assertForall(
    v.record({
      key: v.asciinestring,
      mutableFormState: arbitraryMutableState,
      newValues: v.dict(v.string)
    }),
    ({ key, mutableFormState, newValues }) => {
      const storageMock = TypeMoq.Mock.ofType<DataStorage>();
      storageMock
        .setup(storage => storage.loadData(TypeMoq.It.isValue(key)))
        .returns(() => JSON.stringify(newValues));

      loadValues({ key, storage: storageMock.object })(
        [],
        mutableFormState as MutableState,
        toolsMock.object
      );

      expect(mutableFormState.formState.values).toEqual(newValues);

      return true;
    }
  );
});
