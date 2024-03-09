document.getElementById("post-button").addEventListener("click", async () => {
    const { value: formValues } = await Swal.fire({
        html:
            '<input id="swal-input1" class="swal2-input" placeholder="Title">' +
            '<textarea id="swal-input2" class="swal2-textarea" placeholder="tell us about your idea...."></textarea>',
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Pitch",
        preConfirm: async () => {
            const title = document.getElementById("swal-input1").value;
            const content = document.getElementById("swal-input2").value;
            return await handleVisionSubmit(title,content)
        },
    });
});