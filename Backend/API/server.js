import express from 'express'

const app = express()
app.use(express.json())

const tasks = []
let currentId = 1

app.get('/tasks', (req,res) => {
    res.status(200).json(tasks)
})

app.post('/tasks', (req, res) => {

    const newTask = {id: currentId++, ...req.body}
    
    tasks.push(newTask)

    res.status(201).send(newTask)
})

app.put('/tasks/:id', (req, res) => {

    const { id } = req.params
    const updatedTask = req.body

    const index = tasks.findIndex(task => task.id == id)

    if(index < 0) {
        return res.status(404).json({ message: 'Tarefa não encontrada' })
    }

    tasks[index] = { id: Number(id), ...updatedTask }

    res.status(200).json(tasks[index])

})

app.delete('/tasks/:id', (req, res) => {

    const { id } = req.params

    const index = tasks.findIndex(task => task.id == id)

    if(index < 0) {
        return res.status(404).json({ message: 'Tarefa não encontrada' })
    }

    tasks.splice(index, 1)

    res.status(200).json({ message: 'Tarefa removida com sucesso' })

})


app.listen(3001)

