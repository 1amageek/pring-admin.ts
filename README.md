# Pring Admin

Firebase Cloud Firestore model framework for TypeScript.

- [Pring for iOS](https://github.com/1amageek/Pring)
- [Pring for Web](https://github.com/1amageek/pring.ts)
- [Pring for CloudFunctions](https://github.com/1amageek/pring-admin.ts)

## Installation ⚙

`npm add pring-admin`

## Usage

### TypeScript

required 

```JSON
  "devDependencies": {
    "@types/node": "^10.9.2",
    "typescript": "^3.0.3"
  },
```

### tsconfig.json

#### For Firebase CloudFunctions

```JSON
{
  "compilerOptions": {
    "lib": ["es2018", "dom"],
    "module": "commonjs",
    "noImplicitReturns": true,
    "outDir": "lib",
    "experimentalDecorators": true,
    "sourceMap": true,
    "target": "es2018"
  },
  "compileOnSave": true,
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

#### For Admin

``` typescript
import * as admin from 'firebase-admin'
import * as Pring from 'pring'

const app = admin.initializeApp()

Pring.initialize(app.firestore())
```

### Scheme

- Use `@property` annotation for property declaration.

> SubCollection can not be optional. Initialise it as show below:


``` typescript
import * as Pring from "pring"
const property = Pring.property

class Group extends Pring.Base {
    @property name: string
    @property users: NestedCollection<User> = NestedCollection(this)
}

class User extends Pring.Base {
    @property name: string
    @property groups: ReferenceCollection<Group> = ReferenceCollection(this)
}
```

### Manage data
#### Initialize
``` typescript

// auto generate ID
let user = new User()

// any ID
let user = new User("YOUR_ID")

// any ID, Handle already saved users
let user = new User("YOUR_ID", {})
```
__memo__

The developer is responsible for managing the Document being saved. 
In Pring it is prohibited to save the already saved Document again.

Please use explicitly by the initialization method.
`new User("YOUR_ID", {})` `let user = new User("YOUR_ID")`

#### Save
``` typescript
let user = new User()
user.name = "hoge"
await user.save()
```

#### Get
``` typescript
let user: User = await User.get("USER_ID", User)
```

#### Update
``` typescript
let user: User = await User.get("USER_ID", User)
user.name = "UPDATE NAME"
await user.update()
```

``` typescript
let user: User = new User("USER_ID", {})
user.name = "UPDATE NAME"
await user.update()
```

#### Delete
``` typescript
let user: User = await User.get("USER_ID", User)
await user.delete()
```

### SubCollection
You can use ReferenceCollection and NestedCollection.
The inserted Object is saved simultaneously with the save of the parent.


``` typescript
let user = new User()
let group = new Group()
user.groups.insert(group)
await user.save()
```

If you insert the parent after it is saved, you need to use `await` to guarantee the count of SubCollection.
``` typescript
let user = new User()
await user.save()

let group0 = new Group()
let group1 = new Group()
try {
  await user.groups.insert(group0)
  await user.groups.insert(group1)
} catch(error) {
  console.log(error)
}
```

### DataSource
DataSource is a class that controls Collection of Firestore.

``` typescript
export default class Home extends Vue {

  public async addUser() {
    const user: User = new User()
    user.name = "@1amageek"
    await user.save()
  }

  public created() {
    const dataSource = User.query().dataSource(User)
    dataSource.on((snapshot, changes) => {

      switch (changes.type) {
        case "initial": {
          console.log(dataSource.documents)
          break
        }
        case "update": {
          console.log("insert", changes.insertions)
          console.log("change", changes.modifications)
          console.log("delete", changes.deletions)
          break
        }
        case "error": {
          break
        }
      }
    }).listen()
  }
}
```

## Test

https://facebook.github.io/jest/

```shell
npm install -g jest 
```

```shell
jest
```
