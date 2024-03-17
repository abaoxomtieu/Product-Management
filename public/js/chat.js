// CLIENT SEND MESSAGE

const formSendData = document.querySelector(".inner-form")
if(formSendData){
    formSendData.addEventListener("submit",(e)=>{
        e.preventDefault();
        const content = e.target.content.value
        if(content){
            socket.emit("CLIENT_SEND_MESSAGE",content)
            e.target.content.value=""
        }
    })

}