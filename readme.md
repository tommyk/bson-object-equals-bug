# overview

this just demonstrates an issue where if two `bson` packages are loaded and you use the `equals` method on an `ObjectId` object you will get back a very vague error like below.

```
TypeError: Cannot read properties of undefined (reading '11')
```

## run locally
run the following command to see the error.
```bash
cd dependency-package
yarn install
cd ../host-package
yarn install
node index.js
```

## cause
there is a symbol `kId` that is loaded at the root level of the `objectid.ts` file (https://github.dev/mongodb/js-bson/blob/44bec1900b53bac9938c3f0b9dcf0f75eadcd95e/src/objectid.ts#L24).

it is used as a reference key to a byte array.  when the `equals` method is called, its reference an `ObjectId` that was loaded up and the `kId` symbol doesn't point to anything on the other version loaded.  it ends up with the error above, which is very vague.

## things that could fix this
1. use the `id` property instead of `kId` to get the byte array from the `otherId` entity (https://github.dev/mongodb/js-bson/blob/44bec1900b53bac9938c3f0b9dcf0f75eadcd95e/src/objectid.ts#L243)

2. throw an error that states its another version of the `bson` package loaded and that is not supported.  this would be much better than `Cannot read properties of undefined (reading '11')` message currently.