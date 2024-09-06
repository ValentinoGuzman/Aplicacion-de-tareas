import app from "./app.js";
import { PORT } from "../config/dotenv.config.js";

app.listen(PORT, () => {
    console.log(`El server se abrio en el puerto http://localhost:${PORT}`)
}) 
