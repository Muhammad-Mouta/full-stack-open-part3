// Configure the mongoose middleware
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)


// Create the Person collection
const personSchema = mongoose.Schema({
    name: String,
    number: String
})
const Person = mongoose.model('Person', personSchema)


const listPeople = (password, dbName) => {
    // Connect to the database
    const url = 
        `mongodb+srv://mouta:${password}@cluster0.cqvjjze.mongodb.net/${dbName}?retryWrites=true&w=majority`
    mongoose.connect(url)

    // Find all documents in the people collection and print them
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}


const newPerson = (password, dbName, personName, personNumber) => {
    // Connect to the database
    const url = 
        `mongodb+srv://mouta:${password}@cluster0.cqvjjze.mongodb.net/${dbName}?retryWrites=true&w=majority`
    mongoose.connect(url)

    // Add a new Person document to the people collection
    const person = new Person({
        name: personName,
        number: personNumber
    })
    person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })
}


const main = () => {
    const dbName = 'phonebookApp'

    // Get the input from the command line
    if (process.argv.length === 3) {
        listPeople(process.argv[2], dbName)
    } else if (process.argv.length === 5) {
        newPerson(process.argv[2], dbName, process.argv[3], process.argv[4])
    } else {
        console.log('Usage:\n - node mongo.js <password>\n - node mongo.js <password> <new personName> <new personNumber>')
        process.exit(1)
    }
}


if (require.main === module) {
    main()
}