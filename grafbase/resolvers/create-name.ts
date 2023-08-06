const baseUrl = process.env.MONGODB_DATA_API_URL
const apiKey = process.env.MONGODB_DATA_API_KEY
const dataSource = process.env.MONGODB_DATA_SOURCE
const database = process.env.MONGODB_DATABASE
const collection = process.env.MONGODB_COLLECTION

export default async function insertText(_, { input }) {
    const { name } = input;

    try {
        const response = await fetch(`${baseUrl}/action/insertOne`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'api-key': apiKey
            },
            body: JSON.stringify({
                dataSource,
                database,
                collection,
                document: {
                    name
                }
            })
        })
        const data = await response.json() // response of the request 

        console.log(data);
        return { // what is returned and queried apon in the body of the mutation
            id: data.insertedId,
            name: name
        }

    } catch (err) {
        console.log('error', err);
        return null;
    }
}