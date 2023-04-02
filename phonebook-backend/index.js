const express = require('express')
const app = express()
app.use(express.json())

persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    info = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`
    response.send(info)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        response.send(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

const generateId = () => (
    Math.floor(Math.random() * 10000)
)

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name) {
        return response.status(400).json({
            error: "Name of the person is missing"
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: "Number of the person is missing"
        })
    }

    if (persons.find(p => p.name === body.name)) {
        return response.status(400).json({
            error: `${body.name} already exists in the phonebook`
        })
    }
    
    persons = persons.concat({
        id: generateId(),
        name: body.name,
        number: body.number
    })
    response.status(201).json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} ...`)
})