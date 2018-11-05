import * as Pring from "../src/index"
import "reflect-metadata"
import * as admin from 'firebase-admin'

const property = Pring.property
const File = Pring.File

export class Document extends Pring.Base {
    @property array: string[]                         = ["array"]
    @property set: object                             = {"set": true}
    @property bool: boolean                           = true
    @property binary: Buffer                          = Buffer.from("data", 'utf8')
    @property file: Pring.File                        = new Pring.File("file.jpg", "https://file", "image/png")
    @property number: number                          = 9223372036854776000
    @property date: Date                              = new Date(100)
    @property geoPoint: admin.firestore.GeoPoint    = new admin.firestore.GeoPoint(0, 0)
    @property dictionary: object                      = {"key": "value"}  
    @property string: String                          = "string"
    @property referenceCollection: Pring.ReferenceCollection<Document> = new Pring.ReferenceCollection(this)
    @property nestedCollection: Pring.NestedCollection<Document> = new Pring.NestedCollection(this)
}

export class Item extends Pring.Base {
    @property name: string = "item"
}