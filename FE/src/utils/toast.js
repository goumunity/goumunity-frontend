import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position : 'top-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    icon : "error",
})

const showErrorToast = (errorMessage) => {
    Toast.fire({
        title : errorMessage
    })
}

export {Toast, showErrorToast}