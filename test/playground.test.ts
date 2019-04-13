process.env.NODE_ENV = 'test';
import * as admin from 'firebase-admin'
import * as Pring from "../src/index"

var key = require("../key.json")
const app = admin.initializeApp({
    credential: admin.credential.cert(key)
})


Pring.initialize(admin.firestore())

import { Document } from './document'
import { request } from "http";

const main = async () => {

	// const document: Document = new Document()
	// document.string = "aaa"
	// await document.save()

	// const doc: Document = await new Document(document.id, {}).fetch()
	// console.log(doc.updateValue())

	await admin.firestore().doc("a/a").set(
		{
			"a": "sss",
			"b": null
		}
	)
}

// Playground
describe("Playground", async () => {
    test("main", async () => {
        await main()
    })
})