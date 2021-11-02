//const { MongoClient } = require('mongodb');
require(['mongodb'], function(MongoClient) {

})

async function main() {

  const uri = "mongodb+srv://user:1234@cluster0.1uufx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  try {
    await client.connect();

    //await listDatabases(client);

    await createListing(client, {
      name: "Nice House",
      summary: "Three bed two bath house in Canada",
      bedrooms: 3,
      bathrooms: 2
    });

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }

}

main().catch(console.error);

async function displayListing(client, listingName) {
  const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({ name: listingName });

  if (result) {
    document.getElementById('demo').innerHTML = result;
    console.log(result);
  } else {
    document.getElementById('demo').innerHTML = "Listing not found.";
    console.log("Listing not found.");
  }
}

async function createListing(client, newListing) {
  const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);

  console.log(`New listing created with id: ${result.insertedId}`);
}

async function listDatabases(client) {
  const dbList = await client.db().admin().listDatabases();

  console.log("Databases:");
  dbList.databases.forEach(db => {
    console.log(`- ${db.name}`);
  });
}
