import { BatchType } from './batch'
import { Firestore, FieldValue, Base, property } from './base'
import { SubCollection } from './subCollection'
import { NestedCollection } from './nestedCollection'
import { ReferenceCollection } from './referenceCollection'
import { Query } from './query'
import { DataSource } from './dataSource'
import { File } from './file'

export { BatchType, Base, property, DataSource, Query, SubCollection, NestedCollection, ReferenceCollection, File }

export let firestore: Firestore

export let timestamp: FieldValue

export const initialize = (appFirestore: Firestore, serverTimestamp: FieldValue) => {
    firestore = appFirestore
    firestore.settings({timestampsInSnapshots: true})
    timestamp = serverTimestamp
}
