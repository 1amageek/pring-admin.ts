import * as admin from 'firebase-admin'
import * as fs from 'fs'
import * as path from 'path'

export function initializeTestApp() {
    // Check if Firestore Emulator is running
    if (process.env.FIRESTORE_EMULATOR_HOST) {
        console.log(`Using Firestore Emulator at ${process.env.FIRESTORE_EMULATOR_HOST}`)
        return admin.initializeApp({
            projectId: 'demo-test-project'
        })
    }
    
    // Check for environment variable
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        return admin.initializeApp()
    }
    
    // Check for key.json file
    const keyPath = path.join(__dirname, '../key.json')
    if (fs.existsSync(keyPath)) {
        const key = require(keyPath)
        return admin.initializeApp({
            credential: admin.credential.cert(key)
        })
    }
    
    // Default to emulator mode
    console.log('No credentials found, using Firestore Emulator mode')
    console.log('Run: export FIRESTORE_EMULATOR_HOST=localhost:8080')
    process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080'
    return admin.initializeApp({
        projectId: 'demo-test-project'
    })
}