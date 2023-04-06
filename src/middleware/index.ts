import {
    handleBodyRequestParsing,
    handleCors,
    handleJSONBodyLimit,
    handleRateLimit,
} from './security';
import { handleApiDocs } from './apiDocs';

export default [
    handleApiDocs,
    handleRateLimit,
    handleJSONBodyLimit,
    handleBodyRequestParsing,
    handleCors,
];
