import {promises as fs} from "node:fs";
import http from "node:http"
import {join }from "node:path"

import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

// Recreate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function readUsers() {
   try{
      const filePath = join(__dirname, "..", "src/data", "mock-users.json");
      const data = await fs.readFile(filePath,"utf-8")
      console.log(data)
   }catch(error){
      console.log("problem happend",error)
   }
  
}

readUsers()
const server = http.createServer(async (req,res) =>{
   console.log("request received")
   if (req.url === "/projects" && req.method =="GET"){

      const filePath = join(__dirname, "..", "src/data", "mock-projects.json");
      const data = await fs.readFile(filePath, "utf-8");
      res.setHeader("Content-Type","application/json")

      res.end(data)
   }else {
      res.end("not found")
   }

})

server.listen(3000,() =>{
   console.log("server running on porst 3000")
})