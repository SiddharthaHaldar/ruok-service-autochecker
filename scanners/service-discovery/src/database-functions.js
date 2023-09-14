
export async function formatPayloadForDatabase(payload) {
    pass
}

export async function upsertIntoDatabase(payload){
    pass
}

export async function insertIntoDatabase(payload, collectionName, db ) {
    try {
        const collection = db.collection(collectionName);
        const result = collection.save(payload)
        console.log('Document saved with key:', result._key);
        return result._key; // Return the inserted document's key
    } catch (err) {
        console.error('Failed to save document:', err.message);
        throw err; // Rethrow the error for handling elsewhere if needed
    }
}
      