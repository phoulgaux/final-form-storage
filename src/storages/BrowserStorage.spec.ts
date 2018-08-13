import "jest";
import * as v from "jsverify";
import * as TypeMoq from "typemoq";

import { BrowserStorage } from "./BrowserStorage";

test("calls storage's getItem when loadData is called", () => {
  v.assertForall(v.asciinestring, v.dict(v.string), (key, newValues) => {
    const storageMock = TypeMoq.Mock.ofType<Storage>();
    storageMock
      .setup(storage => storage.getItem(TypeMoq.It.isValue(key)))
      .returns(() => JSON.stringify(newValues));

    const storage = BrowserStorage.useWith(storageMock.object);
    storage.loadData(key);

    storageMock.verify(
      storage => storage.getItem(TypeMoq.It.isValue(key)),
      TypeMoq.Times.once()
    );
    storageMock.verify(
      storage => storage.getItem(TypeMoq.It.isAnyString()),
      TypeMoq.Times.once()
    );

    return true;
  });
});

test("rebuilds returned data", () => {
  v.assertForall(v.asciinestring, v.dict(v.string), (key, newValues) => {
    const storageMock = TypeMoq.Mock.ofType<Storage>();
    storageMock
      .setup(storage => storage.getItem(TypeMoq.It.isValue(key)))
      .returns(() => JSON.stringify(newValues));

    const storage = BrowserStorage.useWith(storageMock.object);
    const retrievedValues = storage.loadData(key);

    expect(retrievedValues).toEqual(newValues);

    return true;
  });
});
