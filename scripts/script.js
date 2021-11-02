const { MongoClient } = require('mongodb');
/*require(['mongodb'], function(MongoClient) {

})*/

async function main() {

  const uri = "mongodb+srv://user:1234@cluster0.1uufx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  try {
    await client.connect();

    await listDatabases(client);

    console.log("\n---\n");

    await listCollections(client, "sample_airbnb");

    console.log("\n---\n");

    //await listNamesInCollection(client, "sample_airbnb", "listingsAndReviews");

    //console.log("\n---\n");

    await createListing(client, {
      name: "Nice House",
      summary: "Three bed two bath house in Canada",
      bedrooms: 3,
      bathrooms: 2
    });

    //await deleteWithName(client, "sample_airbnb", "listingsAndReviews", "Nice House");

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
    //document.getElementById('demo').innerHTML = result;
    console.log(result);
  } else {
    //document.getElementById('demo').innerHTML = "Listing not found.";
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
  await dbList.databases.forEach(db => {
    console.log(`- ${db.name}`);
  });
}

async function listCollections(client, name) {
  const collList = await client.db(name).listCollections();

  console.log("Database Collections:");
  await collList.forEach(coll => {
    console.log(`- ${coll.name}`);
  })
}

async function listNamesInCollection(client, dbName, collName) {
  const list = await client.db(dbName).collection(collName).find({});

  console.log("Database Elements:");
  await list.forEach(listing => {
    console.log(`- ${listing.name}`);
  });
}

async function deleteWithName(client, dbName, collName, entryName) {
  const deleted = await client.db(dbName).collection(collName).deleteMany({name: entryName});

  console.log("Elements Deleted: ", deleted);
  /*await deleted.forEach(listing => {
    console.log(`- ${listing.name}`);
  });*/
}
