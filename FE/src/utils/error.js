import Swal from "sweetalert2";

const handleError = (error) => {
    console.error(error)
    if (error.response) {
        Swal.fire({
            icon: "error",
            text: `${error.response.data.errorMessage}`,
        });
    }

}

export default handleError;