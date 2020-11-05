const fs = require('fs');
const csv = require('csv-parser');

const sms = require('../../utils/sms');
const { cleanMask } = require('../../utils/mask');

module.exports = {
    async disparo(req, res) {
        const hora = [];
        const nome = [];
        const telefone = [];
        // console.log(req.body)

        await fs.createReadStream(req.file.path)
            .pipe(csv({
                separator: ';;'
            }))
            .on('data', async (row) => {
                hora.push(row[0]);
                nome.push(row[3]);
                telefone.push(row[7]);
            })
            .on('end', async () => {
                for(let id in hora) {
                    if(hora[id]){
                        console.log(`hora: ${hora[id]}, nome: ${nome[id]}, telefone: ${cleanMask(telefone[id])}, medico: ${req.body.medico}, especialidae: ${req.body.especialidade}`);
                        await sms(hora[id], nome[id], cleanMask(telefone[id]), req.body.dia, req.body.medico, req.body.especialidade)
                    }
                }
            });

        return res.status(200).json({message : "Mensagens enviada com sucesso"})
    }
}