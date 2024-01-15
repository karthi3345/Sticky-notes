const containerElement = document.getElementById("container");
const btnAdd= document.getElementById("btn-add");




  
function getAppStorage() {
    return JSON.parse(localStorage.getItem("jose-app")) || "[]";
}

getAppStorage().forEach(element => {
 const textElement =createTextElement(element.id, element.content);
 containerElement.insertBefore(textElement, btnAdd);

    console.log(element);
    
});


function createTextElement(id,content){
    const textElement = document.createElement("textarea");
    textElement.classList.add("sticky");
    textElement.value = content;
    textElement.placeholder="Enter a note";
    
    textElement.addEventListener("change",()=>updateNote(id,textElement.value));
    textElement.addEventListener("dblclick",()=>{
    const warning=confirm("Are you sure?");
   if(warning){
    deleteNote(id,textElement);
   }
        
    }
    );
    return textElement;


   
}

function addSticky(){
    const note=getAppStorage();
    const noteObject={
        id:Math.floor(Math.random()*100000),
        content:""
    }
    const textElement=createTextElement(noteObject.id,noteObject.content);
    
     containerElement.insertBefore(textElement, btnAdd);
    note.push(noteObject);
    saveToStorage(note);
  
    

}

btnAdd.addEventListener("click",addSticky)

function saveToStorage(note){
    localStorage.setItem("jose-app",JSON.stringify(note));
}
function updateNote(id,content){
    const note=getAppStorage();
    const target=note.filter((note)=>note.id==id)[0];
    target.content=content;
    saveToStorage(note);
}
function deleteNote(id,textElement){
    const note=getAppStorage();
    const target=note.filter((note)=>note.id==id)[0];
    
    
    saveToStorage(note);
    containerElement.removeChild(textElement);
}