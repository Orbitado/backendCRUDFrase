import express from 'express'

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`)
})

const frase = ['Frase', 'Inicial'];

// OBTENER LA FRASE
app.get('/api/frase', (req, res) => {
    res.json({ 
        frase: frase.join(' ') 
    })
})

// OBTENER LA PALABRA
app.get('/api/palabra/:pos', (req, res) => {
    const { pos } = req.params;
    
    if(isNaN(Number(pos)) || Number(pos) < 1 || Number(pos) > frase.length)
        {
            return res.status(404).json({
                error: 'Parametro invalido'
            })
        }

    res.json({
        buscada: frase[Number(pos) -1]
    })

})

// AGREGAR PALABRA
app.post('/api/palabra', (req, res) => {
    const { palabra } = req.body;

    if(!palabra) {
        return res.status(400).json({
            error: 'Debes ingresar una palabra'
        })
    }

    if(palabra.includes(" ")) {
        return res.status(400).json({
            error: 'Solo puedes ingresar una palabra por vez'
        })
    }

    res.json({
        agregada: frase.push(palabra),
        pos: frase.length,
    })
})

// ACTUALIZAR PALABRA
app.put('/api/palabra/:pos', (req, res) => {
    const { pos } = req.params;
    const { palabra } = req.body;
    
    if(isNaN(Number(pos)) || Number(pos) < 1 || Number(pos) > frase.length)
        {
            return res.status(404).json({
                error: 'Deberías revisar la posición ingresada'
            })
        }
        
        if(!palabra) {
            return res.status(400).json({
                error: 'Debes ingresar una palabra'
            })
        }
        
        if(palabra.includes(" ")) {
            return res.status(400).json({
                error: 'Solo puedes actualizar una palabra a la vez'
            })
        }
        
        const anterior = frase[Number(pos) -1];
        frase[Number(pos) -1] = palabra;
        
        res.json({
            actualizada: palabra,
            anterior: anterior,
            pos: Number(pos)
    })
})

// BORRAR PALABRA
app.delete('/api/palabra/:pos', (req, res) => {
    const { pos } = req.params;

    if(isNaN(Number(pos)) || Number(pos) < 1 || Number(pos) > frase.length || !Number(pos) || Number(pos) === " ")
    {
        return res.status(404).json({
            error: 'Parametro invalido'
        })
    }

    res.json({
        borrada: frase.splice(Number(pos) -1, 1),
    })
})