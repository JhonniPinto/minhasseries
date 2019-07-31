const labels = [
    {id: 'to-watch', name: 'Para assistir'},
    {id: 'watching', name: 'Assistindo'},
    {id: 'watched', name: 'Assistido'}
]
const index = async ({ Serie }, req, res) => {
    const docs = await Serie.find({})
    res.render('series', {series: docs})
}

const novaForm = (req, res) => {
    res.render('series/nova', {errors: false})
}
const novaProcess = async ({ Serie }, req, res) => {
    const serie = new Serie(req.body)
    try {
        await serie.save()
        res.redirect('/series')
    } catch(err) {
        res.render('series/nova', {
            errors: Object.keys(err.errors)
        })
    }
}

const excluir = async ({ Serie }, req, res) => {
    await Serie.deleteOne({_id: req.params.id})
    res.redirect('/series')
}

const editarForm = async ({ Serie }, req, res) => {
    const doc = await Serie.findOne({_id: req.params.id})
    res.render('series/editar', {serie: doc, labels, errors: false})
}
const editarProcess = async ({ Serie }, req, res) => {
    const doc = await Serie.findOne({_id: req.params.id})
    doc.name = req.body.name
    doc.status = req.body.status
    try{
        await doc.save()
        res.redirect('/series')
    } catch(err) {
        res.render('series/editar', {serie: doc, labels, errors: Object.keys(err.errors)})
    }
}

const info = async({ Serie }, req, res) => {
    const serie = await Serie.findOne({_id: req.params.id})
    res.render('series/info', {serie})
}

const addComentario = async({ Serie }, req, res) => {
    await Serie.updateOne({_id: req.params.id}, {$push: {comments: req.body.comentario}})
    res.redirect(`/series/info/${req.params.id}`)
}

module.exports = {
    index,
    novaForm,
    novaProcess,
    excluir,
    editarForm,
    editarProcess,
    info,
    addComentario
}