// s3 aws - lambda - qeues(sqs - rabbit mq - kafka - bullmq +redis) - azure - google cloud platform(GCP) - aws - https://floci.io/
import fs from "fs"
import path from "path"
import multer from "multer"


function ensureFolder(dir){
    fs.mkdirSync(dir, { recursive: true})
}
//dni.pdf
function buildStorage(folder){
    ensureFolder(folder)
    return multer.diskStorage({
        destination: (_req, _file, cb) => cb(null, folder),
        filename: (_req, file, cb)=> {
            const extension = path.extname(file.originalname)
            const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`
            cb(null, fileName)
        }
    })
}

/**
 * declaramos filtros function reutilizable de filtros y limite de tamaño
 */


export const uploadDocument = multer({
    storage: buildStorage("uploads/documents") //--> bucket distinto de s3
    /**
     * filtros por tipo archivo
     * filtro por limites del archivo
     */
})

export const uploadReceipt = multer({
    storage: buildStorage("uploads/receipts") //--> bucket distinto de s3
    /**
     * filtros especificos x tipo de documento
     */
})


export const uploadProof = multer({
    storage: buildStorage("uploads/proofs") //--> bucket distinto de s3
    /**
     * 
     */
})

