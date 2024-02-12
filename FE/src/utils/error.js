import Swal from "sweetalert2";

const handleError = (error) => {
    Swal.fire({
        icon: "error",
        text: `${error.response.data.errorMessage}`,
    })
}

export default handleError;