import { BatchType } from './batch'
import * as admin from 'firebase-admin'
import { Firestore, Base, property, DocumentData, FieldValue, Timestamp, Transaction } from './base'
import { SubCollection } from './subCollection'
import { NestedCollection } from './nestedCollection'
import { ReferenceCollection } from './referenceCollection'
import { Query } from './query'
import { DataSource } from './dataSource'
import { File } from './file'

export { BatchType, Base, property, DataSource, Query, SubCollection, NestedCollection, ReferenceCollection, File, DocumentData, FieldValue, Timestamp, Transaction }

export let firestore: Firestore

export let timestamp: FieldValue

export const initialize = (appFirestore: Firestore) => {
    firestore = appFirestore
    firestore.settings({timestampsInSnapshots: true})
    timestamp = admin.firestore.FieldValue.serverTimestamp()
}
