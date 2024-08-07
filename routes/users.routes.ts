
import { Request, Response } from 'express';
import Users from '../models/user.model';
import { router as app } from './router';
const XLSX = require('xlsx');
const { Buffer } = require('buffer');
const nodemailer = require('nodemailer');
const path = require('path');
const { Op } = require("sequelize");


app.post('/engagement', async (req: Request, res: Response) => {

    const engagement = req.body;
    console.log(engagement);

    try {

        // Crear una hoja de datos
        const data = [
            ["Nombre", "Email", "Ambiente"],
            [engagement.name, engagement.email, engagement.environment],
        ];
        
    
         // Crear un libro de trabajo y agregar la hoja
        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Datos');

    // Generar un buffer con el archivo Excel
    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

        // Configurar el transporte para el correo electrónico (usando Outlook)
        const transporter = nodemailer.createTransport({
            service: 'Outlook365', // o 'hotmail'
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    
        // Configurar el correo electrónico
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: engagement.email,
            subject: 'Aquí está tu archivo Excel',
            text: 'Adjunto encontrarás el archivo Excel que solicitaste.',
            attachments: [
                {
                    filename: 'archivo.xls',
                    content: buffer,
                    encoding: 'base64'
                }
            ]
        };
    
        // Enviar el correo
        await transporter.sendMail(mailOptions, (error:any, info:any) => {
            if (error) {
                console.log('Error al enviar el correo:', error);
                return res.status(500).json({ ok: false, err: error });
                
            }
            console.log('Correo enviado:', info.response);
            res.status(200).json({ ok: true, data: "Bien" });
        });
    
   
   

    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, err: error });
    }

});

export default app; // el export debe ir despues de las funciones