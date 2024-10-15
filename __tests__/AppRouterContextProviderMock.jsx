// app-router-context-provider-mock.tsx

import {
  AppRouterContext,
} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import React from 'react';


export const AppRouterContextProviderMock = ({
  router,
  children,
}) => {
  const mockedRouter= {
    back: jest.fn(),
    forward: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
    ...router,
  };
  return (
    <AppRouterContext.Provider value={mockedRouter}>
      {children}
    </AppRouterContext.Provider>
  );
};
