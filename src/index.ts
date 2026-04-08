import {promises as fs} from "node:fs";
async function readUsers() {
   try{
      const filePath = "./src/data/mock-users.json"
      const data = await fs.readFile(filePath,"utf-8")
      console.log(data)
   }catch(error){
      console.log("problem happend",error)
   }
  
}

readUsers()