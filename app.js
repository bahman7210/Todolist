$(document).ready()
{
    const textbox= document.querySelector('.todo-input');
    const button= document.getElementById('btn');
    const ul = document.getElementById('ul_todocontainer');
    const filter = document.getElementById('filter');
  
    filter.addEventListener('change', (e) =>{
        ShowAlltodos();
    });

    let todolist =[];
    let item = 0;


    loadfromstorage();

    function saveintostorage(){
        localStorage.setItem ( "todolist" , JSON.stringify(todolist));
    }

    function loadfromstorage(){
       const retrive = localStorage.getItem("todolist")
       todolist = JSON.parse(retrive);
       ShowAlltodos();

    }

    function create_newtodoitem(id,name,isdone)
    {
        this.id = id;
        this.name=name;
        this.isdone= isdone;
    }

    function Isduplicted(name)
    {
        var res= todolist.find((x) =>x.name == name);
        if(res==null )
            return false;
        return true;   
        
    }

    button.addEventListener("click",(event)=>{
        event.preventDefault(); 
        name =textbox.value;
    
        if (Isduplicted(name))
        {
            console.log('duplicated');
            return;
        }

        item=item+1;
        const newtodo =new create_newtodoitem(item,name,false);
        todolist.push(newtodo);
        textbox.value="";

        ShowAlltodos();
        
    })


    function ShowAlltodos(){
        saveintostorage();
        //get filter
        
        const todolist_show =  todolist.filter((x)=>{
            switch ( filter.value.toLowerCase() )
            {
                case "all": 
                    return true;
                    break;
                case "completed":
                    if (x.isdone === true)
                    return true;
                    break;
                case "uncompleted":
                    if (x.isdone === false)
                    return true;
                    break;
                default:
                    return true;
            }
        });
        console.log(todolist_show);

        ul_todocontainer.innerHTML= ""

        todolist_show.forEach( (x)=> {
            const div = document.createElement('div');
            div.setAttribute('class' , 'todo');
            div.setAttribute("id",x.id);

            const li = document.createElement('li');
            if(x.isdone )
                li.setAttribute('class','todo-item completed');
            else
                li.setAttribute('class','todo-item');
            li.innerHTML= x.name;

            const delbtn= document.createElement('button');
            delbtn.setAttribute('class','trash-btn');
            delbtn.innerHTML ='<i class="fas fa-trash"></i>';
            
            const combtn= document.createElement('button');
            combtn.setAttribute('class','complete-btn');
            combtn.innerHTML ='<i class="fas fa-check"></i>';
            
            div.appendChild(li);
            div.appendChild(delbtn);
            div.appendChild(combtn);
            ul_todocontainer.appendChild(div);
        })
        
    }

    function findindex(id)
    {
        let index = -1;
        for (let i=0 ; i< todolist.length; i++)
             if (todolist[i].id == id)
             {
                 index = i;
                 break;
             }
        return index;
    }

    function delete_todo(id )
    {
       const index = findindex(id);
        todolist.splice(index,1);
        ShowAlltodos();
        return;
    }

    $('body').on('click','.trash-btn', function(e) {
        let  div = e.target.parentElement;
        if  (div.id  === "")
            div = div.parentElement;
        delete_todo(div.id);
        ShowAlltodos();
    });

    $('body').on('click','.complete-btn', function(e) {
        let  div = e.target.parentElement;
        if  (div.id  === "")
            div = div.parentElement;
        const index = findindex(div.id);
        todolist[index].isdone = !todolist[index].isdone;
           ShowAlltodos();
    });
   
}