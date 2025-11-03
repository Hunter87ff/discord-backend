import 'dotenv/config';
require('module-alias/register'); // Ensure module aliases are registered for Node.js
import 'tsconfig-paths/register'; // Ensure module aliases and paths are registered for TypeScript

import DiscordBackendApp from "@/core/app";

const app = new DiscordBackendApp();
app.start();
