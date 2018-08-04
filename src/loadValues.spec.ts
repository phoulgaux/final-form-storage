import "jest";
import * as v from "jsverify";
import * as TypeMoq from "typemoq";

import { loadValues } from "./loadValues";

test("load calls storage.getItem with proper data", () => {
  v.assert(
    v.forall(
      v.record({
        key: v.asciinestring
      }),
      ({ key }) => {
        const storageMock = TypeMoq.Mock.ofType<Storage>();
        storageMock.setup(storage => storage.getItem(TypeMoq.It.isAny()));

        loadValues({ key, storage: storageMock.object })();

        storageMock.verify(
          storage => storage.getItem(key),
          TypeMoq.Times.once()
        );

        return true;
      }
    )
  );
});
