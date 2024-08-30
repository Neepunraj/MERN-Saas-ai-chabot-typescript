import app from "./app.js";
import { connecttoDatabase } from "./db/connections.js";
const port = process.env.PORT || 5000;
connecttoDatabase().then(() => {
    app.listen(port, () => console.log(`server Open and connected to database , port ${port}`));
}).catch((error) => console.log(error));
//# sourceMappingURL=index.js.map