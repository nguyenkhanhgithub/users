import {Body, Controller, Get, Injectable, Post, Req, Res} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import hbs = require('nodemailer-express-handlebars');
import path = require('path');
import * as dotenv from 'dotenv';

@Injectable()
export class MailService {
    private static instance: MailService;
    private constructor() {}
    public static get Instance() {
        return this.instance || (this.instance = new this());
    }
    async sendMail(email: any, sub: any, contxt: any, templ: any) {
        dotenv.config();
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        });
        transporter.use('compile', hbs({
            viewEngine: {
                partialsDir: path.join(__dirname, 'templates'),
                layoutsDir: path.join(__dirname, 'templates'),
            },
            viewPath: path.join(__dirname, 'templates')
        }));
        const mailOptions = {
            from: '"Chozoi.com" ✔ <foo@blurdybloop.com>',
            to: email,
            subject: sub,
            template: templ,
            context: contxt
        };
        transporter.sendMail(mailOptions);
    }
}
