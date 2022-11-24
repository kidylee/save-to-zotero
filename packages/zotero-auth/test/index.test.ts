import { getZoteroAccessToken } from "../src/getZoteroAccessToken";
import { getZoteroTemporaryCode } from "../src/getZoteroTemporaryCode";

describe("scheduled", () => {
  it("should run", async () => {
    const result = await getZoteroTemporaryCode();
    console.log(result);
  });

  it("test code", async () => {
    const result = await getZoteroAccessToken(
      "890fb95370a1536b7eda",
      "fcb56341a12df52fd7a1",
      "503a5efc739e48e53ed6"
    );
    console.log(result);
  });
});
