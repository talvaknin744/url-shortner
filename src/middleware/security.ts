import express, { Router } from "express";
import rateLimit from "express-rate-limit";
import cors from 'cors';
import bodyParser from 'body-parser';

export const handleRateLimit = (router: Router) => {
    const limit = rateLimit({
        max: 100,
        windowMs: 30*60*1000,
        message: "To many requests"
    });

    router.use(limit)
}

export const handleCors = (router: Router) => {
    router.use(cors())
}

export const handleBodyRequestParsing = (router: Router) => {
    router.use(bodyParser.urlencoded({ extended: true}));
    router.use(bodyParser.json());
}

export const handleJSONBodyLimit = (router: Router) => {
    router.use(express.json({ limit: '5mb'}));
}