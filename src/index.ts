import {promises as fs} from "node:fs";
import http from "node:http"
import {join }from "node:path"


import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { stringify } from "node:querystring";

// Recreate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function getJsonData(fileName:string){
   try{
      const filePath = join(__dirname, "..", "src/data", fileName);
      const data = await fs.readFile(filePath,"utf-8")
      return JSON.parse(data);

   }catch(error){
      throw new Error("FileSystem Error")
   }
}
async function readUsers() {
   try{
      const user = await getJsonData("mock-user.json")
      console.log(user)
   }catch(error){
      console.log("problem happend",error)
   }
  
}


const server = http.createServer(async (req,res) =>{
   res.setHeader("Content-Type","application/json")
   try{
      if (req.url === "/projects" && req.method =="GET"){
      const projects = await getJsonData("mock-projects.json")
      res.writeHead(200)
      res.end(JSON.stringify(projects))

   }
   else {
      res.writeHead(404)
      res.end(JSON.stringify({
         error:"Not found",
      }))
   }


   }catch(error) {
      res.writeHead(500);
      res.end(JSON.stringify({
         error:"Internal server error"
      }))
   }


})

server.listen(process.env.PORT,() =>{
   console.log("server running on porst 3000")
})