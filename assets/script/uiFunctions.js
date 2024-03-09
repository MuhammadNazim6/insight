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



// For profile editing
function previewImage() {

    var fileInput = document.getElementById('swal-profile');
    var imagePreview = document.getElementById('image-preview');

    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            imagePreview.src = e.target.result;
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
}
async function openEditProfileModal(name, mobile , profile , bio ) {
    Swal.fire({
        html:
        '<img id="image-preview" src="' + profile + '" alt="Image" class="rounded-circle avatar-lg img-thumbnail" style="cursor:pointer;" onClick>'+ 
            '<input id="swal-profile" type="file" class="swal2-input" onchange="previewImage()" style="display:none;">' +
            '<input id="swal-name" class="swal2-input" placeholder="Name" value="' + name + '" >' +
            '<input id="swal-mobile" class="swal2-input" placeholder="Mobile" value="' + mobile + '"  >' +
            '<textarea id="swal-bio" class="swal2-textarea" placeholder="Add a bio...">"' + bio + '"</textarea>',
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Update",
        preConfirm: async () => {
            const image = document.getElementById("swal-profile").files[0];
            const name = document.getElementById("swal-name").value;
            const mobile = document.getElementById("swal-mobile").value;
            const bio = document.getElementById("swal-bio").value;
            return await handleProfileEdit(image,name,mobile,bio)
        },
    });
    document.getElementById("image-preview").addEventListener("click", function() {
        const fileInput = document.getElementById("swal-profile");
        fileInput.click();
    });


}



