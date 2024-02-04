const Input = ( { label, placeholder} ) => {

    return (
        <>

    <div class="max-w-md w-full">
        <label for="customInput" class="block text-sm font-medium text-gray-600">{label}</label>
        <input
            type="text"
            id="customInput"
            name="customInput"
            class="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-faedcd focus:outline-none focus:ring focus:border-blue-300 transition-colors duration-300 ease-in-out focus:bg-yellow-300"
            placeholder={placeholder}
        />
    </div>

</>
    )
}

export default Input;