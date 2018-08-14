import "jest";
import * as v from "jsverify";
import * as TypeMoq from "typemoq";

import { BrowserStorage } from "./BrowserStorage";

describe("loadData", () => {
  test("calls storage's getItem", () => {
    v.assertForall(v.asciinestring, v.dict(v.string), (key, newValues) => {
      const storageMock = TypeMoq.Mock.ofType<Storage>();
      storageMock
        .setup(s => s.getItem(TypeMoq.It.isValue(key)))
        .returns(() => JSON.stringify(newValues));

      const storage = BrowserStorage.useWith(storageMock.object);
      storage.loadData(key);

      storageMock.verify(
        s => s.getItem(TypeMoq.It.isValue(key)),
        TypeMoq.Times.once()
      );
      storageMock.verify(
        s => s.getItem(TypeMoq.It.isAnyString()),
        TypeMoq.Times.once()
      );

      return true;
    });
  });

  test("rebuilds returned data", () => {
    v.assertForall(v.asciinestring, v.dict(v.string), (key, newValues) => {
      const storageMock = TypeMoq.Mock.ofType<Storage>();
      storageMock
        .setup(s => s.getItem(TypeMoq.It.isValue(key)))
        .returns(() => JSON.stringify(newValues));

      const storage = BrowserStorage.useWith(storageMock.object);
      const retrievedValues = storage.loadData(key);

      expect(retrievedValues).toEqual(newValues);

      return true;
    });
  });

  test("returns null when retrieved data is null", () => {
    v.assertForall(v.asciinestring, key => {
      const storageMock = TypeMoq.Mock.ofType<Storage>();
      storageMock
        .setup(s => s.getItem(TypeMoq.It.isValue(key)))
        .returns(() => null);

      const storage = BrowserStorage.useWith(storageMock.object);
      const retrievedValues = storage.loadData(key);

      expect(retrievedValues).toBeNull();

      return true;
    });
  });

  test("returns null when storage is null", () => {
    v.assertForall(v.asciinestring, key => {
      const storage = BrowserStorage.useWith(null);
      const retrievedValues = storage.loadData(key);

      expect(retrievedValues).toBeNull();

      return true;
    });
  });
});

describe("saveData", () => {
  test("calls storage's setItem", () => {
    v.assertForall(v.asciinestring, v.dict(v.string), (key, newValues) => {
      const storageMock = TypeMoq.Mock.ofType<Storage>();
      storageMock.setup(s =>
        s.setItem(TypeMoq.It.isAnyString(), TypeMoq.It.isAny())
      );

      const storage = BrowserStorage.useWith(storageMock.object);
      storage.saveData(key, newValues);

      storageMock.verify(
        s => s.setItem(TypeMoq.It.isValue(key), TypeMoq.It.isAnyString()),
        TypeMoq.Times.once()
      );
      storageMock.verify(
        s => s.setItem(TypeMoq.It.isAnyString(), TypeMoq.It.isAny()),
        TypeMoq.Times.once()
      );

      return true;
    });
  });
});
