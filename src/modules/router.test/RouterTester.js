import {
  describe,
  test,
  expect,
} from '@jest/globals';

export default class RouterTester {
  constructor(Router, routes, swither) {
    this.Router = Router;
    this.routes = routes;
    this.swither = swither;
    this.testValues = [];
  }

  fillTestValues(
    inPath,
    Page,
  ) {
    this.testValues.push({
      input: {
        path: inPath,
      },
      output: {
        Page,
      },
    });
  }

  test(options) {
    describe('Router:', () => {
      this.testValues.forEach((testValue) => test(`test ${testValue.input.path} = ${testValue.output.Page}`, () => {
        const router = new this.Router(options);
        router.init();

        router.navigate(testValue.input.path);

        expect(router.switchComponent(this.swither, this.routes.mainScreen))
          .toEqual(testValue.output.Page);
      }));
    });
  }
}