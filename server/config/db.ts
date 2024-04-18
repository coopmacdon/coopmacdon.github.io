let LOCAL = false;

let HostName, URI;

if (LOCAL){
    URI = "mongodb://localhost/contacts";
    HostName = "localhost";
}else{
    URI= "mongodb+srv://AjaySinghAhir:Ajay@2003@cluster0.mbalzwc.mongodb.net/contacts?" +
        "retryWrites=true&w=majority&appName=Cluster0"
    HostName = "MongoDB Atlas";
}


export {URI, HostName}

export const  SessionSecret = "INFT2202SessionSecret";

//