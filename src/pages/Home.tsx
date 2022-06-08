import { FormEvent } from "react"

function Home(){
    function handleFormSubmit(e:FormEvent){

    }
    return (
        <div>
            <h2>Home</h2>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="custom-name">Custom name</label>
                <input type="text" name="custom-name" id="custom-name" />
                <label htmlFor="url">URL</label>
                <input type="text" name="url" id="url" />
            </form>
        </div>
    )
}

export {Home}