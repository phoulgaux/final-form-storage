# `final-form-storage`

[![Build Status](https://travis-ci.org/phoulgaux/final-form-storage.svg?branch=master)](https://travis-ci.org/phoulgaux/final-form-storage)
[![codebeat badge](https://codebeat.co/badges/6c460a92-0ba0-4e4a-a104-3c5209ee8ddc)](https://codebeat.co/projects/github-com-phoulgaux-final-form-storage-master)

A set of helpers helping persist the state of form based on Final Form

## Installation

Currently the only source for obtaining this library is to build it from source as it is available from no package registry yet.

```bash
$ npm install
$ npm test # check if everying is OK
$ npm run build
```

## Helper functions

### `loadValues: (options: StorageOptions) => Mutator`
A mutator loading raw form values from a storage:

```js
const form = createForm({
  mutators: {
    loadValues: loadValues(options)
    /* other mutators */
  }
  /* rest of the config */
});
```

### `saveValues: (options: StorageOptions) => FormSubscriber`
Subscriber that saves raw form values to a storage on each call.

```js
form.subscribe(saveValues(options), { /* subscription */ });
```

## Storages
Storages are objects implementing `DataStorage` interface that can be passed to the helpers through options. They are effectively drivers for persistence

### `BrowserStorage`
A thin wrapper over browser's `Storage` API, using `JSON.parse` and `JSON.stringify` for (de-)serialization.

#### `BrowserStorage.useWith: (storage: Storage) => BrowserStorage`
A static factory method that creates `BrowserStorage` object with the underlying storage passed as an argument. It accepts `window.localStorage`, `window.sessionStorage` or anything with compatible API.

```js
const storage = BrowserStorage.useWith(window.localStorage);
const storage = BrowserStorage.useWith(window.sessionStorage);
```

## Interfaces

### `DataStorage`

### `StorageOptions`

## Roadmap

There are persistence helpers (subscriber and mutator) planned for:

* field value
* form state
* field state

In addition:

* clearing stored data
* `define-form` compatibility
* support for React Native's `AsyncStorage` (as a separate package or through optional dependencies)

## Known issues

### `any` in `arbitraryMutableState`
There's an issue with nesting `arbitraryInternalFormState` within `arbitraryMutableState`. It's circumvented with explicit casting, though it's not completely typesafe. Low priority due to being present only in tests.

### Compatibility with `define-form`
* Not guaranteed work smoothly with `define-form`, which is an alternative, generics-based typings for `final-form`. `final-form-storage` does not support generic values object – it's type is `any`. On the roadmap.
