import { server } from "@/mocks/node";

import "@testing-library/jest-dom";

/**
  * NOTE: Set up MSW node server for tests
  *
  */
beforeAll(() => {
  // Start the interception.
  server.listen()
})

afterEach(() => {
  // Remove any handlers you may have added
  // in individual tests (runtime handlers).
  server.resetHandlers()
})

afterAll(() => {
  // Disable request interception and clean up.
  server.close()
})
