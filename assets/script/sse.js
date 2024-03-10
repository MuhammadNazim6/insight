const eventSource = new EventSource(`/make-connection`);
eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type == "notification") {
        toast("success",data.message)
    }

    if(data.type == "message"){
        handleMessages(data.messageDetails,"left")
        toast("success",data.message+" from chat")
    }
};

eventSource.onerror = (error) => {
    console.error("Error:", error);
    eventSource.close();
};
