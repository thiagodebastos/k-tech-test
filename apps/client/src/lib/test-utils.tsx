import React, { PropsWithChildren } from 'react'
import { prettyDOM, render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import rootReducer from '@/app/rootReducer'

import type { AppStore, RootState } from '../app/store'
import { listenerMiddleware } from '@/app/listenerMiddleware'
import { usersApi } from '@/features/users/usersApi'

const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .prepend(listenerMiddleware.middleware)
        .concat(usersApi.middleware),
    preloadedState
  })
}

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: AppStore
}

export function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {}
) {
  const {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  )

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  }
}

export function debugClean(
  element: HTMLElement = document.body,
  cleanSVGs: boolean = true,
  maxLength?: number,
) {
  const clonedNode = element.cloneNode(true)

  // Type assertion to HTMLElement since cloneNode can return any Node
  if (!(clonedNode instanceof HTMLElement)) {
    throw new Error('Cloned node is not an HTMLElement');
  }

  const clonedElement = clonedNode

  const elements = clonedNode.querySelectorAll("*")
  // remove class element from all nodes
  elements.forEach(el => el.removeAttribute('class'));

  if (cleanSVGs) {
    // remove all SVG attributes
    const svgs = clonedElement.querySelectorAll<SVGElement>('svg')
    svgs.forEach(svg => {
      Array.from(svg.attributes).forEach(attr => svg.removeAttribute(attr.name))
      svg.innerHTML = ''
    })

  }

  console.log(prettyDOM(clonedElement, maxLength))
}
