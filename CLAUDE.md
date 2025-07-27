# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pring Admin is a Firebase Cloud Firestore model framework for TypeScript, designed for use with Firebase Admin SDK and Cloud Functions. It provides a type-safe ORM-like interface for managing Firestore documents with features like nested collections, reference collections, and batch operations.

## Development Commands

### Build
```bash
npm run build    # Compiles TypeScript to JavaScript with declaration files
```

### Linting
```bash
npm run lint     # Runs TSLint on the codebase
```

### Testing
```bash
jest            # Runs all tests (requires global jest installation)
```

### Development
```bash
npm run prepare  # Builds the project (runs automatically on npm install)
```

## Architecture

### Core Classes

1. **Base** (`src/base.ts`): The foundation class that all Firestore models extend. Provides CRUD operations, property decorators, and document lifecycle management.

2. **Collections**:
   - **SubCollection** (`src/subCollection.ts`): Base class for collections
   - **NestedCollection** (`src/nestedCollection.ts`): Documents stored as subcollections
   - **ReferenceCollection** (`src/referenceCollection.ts`): References to documents in other collections

3. **DataSource** (`src/dataSource.ts`): Manages real-time listeners and collection queries with change tracking

4. **Query** (`src/query.ts`): Chainable query builder for Firestore queries

5. **Batch** (`src/batch.ts`): Batch operations support

### Key Patterns

- **Property Decorator**: Use `@property` to mark model properties that should be synchronized with Firestore
- **Initialization**: Models require initialization with `Pring.initialize(app.firestore())` before use
- **Type Safety**: All models extend `Base` class and use TypeScript decorators for property definitions
- **Collection Management**: SubCollections are initialized in the parent class constructor

### Testing

Tests are located in `/test/` directory and use Jest. Each test file initializes its own Firestore instance with credentials from environment variables.

## Important Considerations

- This is a library meant to be used with Firebase Admin SDK, not client-side Firebase
- Document IDs can be auto-generated or manually specified
- Already saved documents cannot be saved again - use update() instead
- SubCollections must be initialized in the parent constructor
- All properties marked with @property decorator are automatically synchronized with Firestore