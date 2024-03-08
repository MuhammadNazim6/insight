const eventSource = new EventSource(`/make-connection`);
eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type == "notification") {
        //handle notification
    }
};

eventSource.onerror = (error) => {
    console.error("Error:", error);
    eventSource.close();
};
