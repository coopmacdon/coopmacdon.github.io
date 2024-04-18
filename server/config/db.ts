let LOCAL = false;

let HostName, URI;

if (LOCAL){
    URI = "mongodb://localhost/contacts";
    HostName = "localhost";
}else{
    URI= "mongodb+srv://coopermacdonald:JbNrjFkBi4tfaxFZ@harmonyhub.a5qk01z.mongodb.net/?retryWrites=true&w=majority&appName=HarmonyHub";
    HostName = "MongoDB Atlas";
}


export {URI, HostName}

export const  SessionSecret = "INFT2202SessionSecret";

//