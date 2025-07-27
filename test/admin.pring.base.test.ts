process.env.NODE_ENV = 'test';
import * as admin from 'firebase-admin'
import * as Pring from "../src/index"
import * as FirebaseFirestore from '@google-cloud/firestore'
import { initializeTestApp } from './test-helper'

const app = initializeTestApp()

Pring.initialize(app.firestore())

import { Document } from './document'


describe("Document property", () => {

    const document = new Document()
    var doc: Document

    beforeAll(async () => {
        document.createdAt = admin.firestore.Timestamp.fromDate(new Date(100))
        document.updatedAt = admin.firestore.Timestamp.fromDate(new Date(100))
        await document.save()
        doc = await Document.get(document.id) as Document
    });

    describe("properties", () => {
        test("value", () => {
            const keys = Object.keys(doc.value())
            expect(keys.includes("createdAt")).toEqual(true)
            expect(keys.includes("updatedAt")).toEqual(true)
        })

        test("createdAt", () => {
            expect(doc.createdAt).toEqual(admin.firestore.Timestamp.fromDate(new Date(100)))
        })

        test("updatedAt", () => {
            expect(doc.updatedAt).toEqual(admin.firestore.Timestamp.fromDate(new Date(100)))
        })

        test("String type", () => {
            expect(doc.string).toEqual(document.string)
        })

        test("Number type", () => {
            expect(doc.number).toEqual(document.number)
        })

        test("Boolean type", () => {
            expect(doc.bool).toEqual(document.bool)
        })

        test("Date type", () => {
            expect(doc.date).toEqual(document.date)
        })

        test("GeoPoint type", () => {
            expect(doc.geoPoint).toEqual(document.geoPoint)
        })

        test("Dicionary type", () => {
            expect(doc.dictionary).toEqual(document.dictionary)
        })

        test("JSON type", () => {
            expect(doc.json).toEqual(document.json)
        })

        test("Array type", () => {
            expect(doc.array).toEqual(document.array)
        })

        test("Set type", () => {
            expect(doc.set).toEqual(document.set)
        })

        test("File type", () => {
            expect(doc.file.value()).toEqual({
                "name": "file.jpg",
                "url": "https://file",
                "path": "version/1/",
                "mimeType": "image/png",
              })
        })

        test("Files type", () => {
            expect(doc.files.length).toEqual(2)
            doc.files.forEach(file => {
                expect(file.value()).toEqual({
                    "name": "file.jpg",
                    "url": "https://file",
                    "path": "version/1/",
                    "mimeType": "image/png",
                  })
            })
        })
    })

    describe("Documents that do not exist", () => {
        test("not exist", async () => {
            const doc = await Document.get("not")
            expect(doc).toBeUndefined()
        })
    })

    describe("delete document", () => {
        test("delete", async () => {
            try {
                const document_id = doc.id
                await doc.delete()
                await Document.get(document_id)
            } catch (error) {
                expect(error).not.toBeNull()
            }
        })
    })
})
