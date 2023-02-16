import { useState } from "react"
import sha256 from "sha256";
import * as yup from "yup";
import {Formik} from "formik"
import {AiOutlineDown , AiOutlineUp} from "react-icons/ai"

// data will be like a quiz of somme fun questions so the user can unlock the blockchain //


const Block = (props) => {

    const validationSchema = yup.object().shape({
        blockNumber: yup.number(),
        data: yup.string(),
    })
    
    const initialValues ={
        data:props.data,
        blockNumber: props.blockNumber,
    }



    const [valid , setValid] = useState(false);
    const [riddleToggled , setRiddleToggled] = useState(false);
    const [seeRiddleHovered , setSeeRiddleHovered] = useState(false);
    const [closeRiddleHovered , setCloseRiddleHovered] = useState(false);
    const [hash , setHash] = useState(sha256(props.blockNumber+""+props.previous))

    const handleFormSubmit = (values , onSubmitProps) => {
        setHash(sha256(values.blockNumber + values.data + props.previous));
        if(sha256(values.blockNumber + values.data + props.previous) === sha256(props.blockNumber+props.answer+props.previous)){
            setValid(true);
        }
        else{
            setValid(false);
        }
    }
    
    return(
        <div
        className="flex flex-col gap-0 w-7/12 sm:w-1/3"
        >

            <div 
            className={` min-h-[450px] w-full
            ${valid ? "bg-blue-200" :"bg-red-200"}
            rounded-lg shadow-inner
            p-5
            text-gray-800 font-medium
            `}
            >
                <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
                >
                    {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            setFieldValue,
                            resetForm,
                        }) => (
                            <form 
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-5"
                            >
                                <div
                                className="flex flex-col gap-3 laptop:flex-row"
                                >
                                    <label
                                    className="w-[100px]"
                                    >Block n°:</label>
                                    <div
                                    className="flex flex-row gap-0 w-full"
                                    >
                                        <div
                                        className="w-[30px] h-[30px] bg-gray-300 flex items-center justify-center laptop:gap-6
                                        "
                                        >#</div>
                                        <input type="number" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.blockNumber}
                                        name="blockNumber"
                                        className={`w-full h-[30px] p-2 border-2 border-gray-300 rounded-r-lg
                                        `}
                                        />
                                    </div>
                                </div>

                                <div
                                className="flex flex-col gap-3 laptop:flex-row"
                                >
                                    <label
                                    className="w-[100px]"
                                    >Answer:</label>
                                    <textarea 
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.data}
                                    name="data"
                                    className={`w-full min-h-[100px] p-2 border-2 border-gray-300 rounded-r-lg
                                    `}
                                    />
                                </div>

                                <div
                                className="flex flex-col gap-3 laptop:flex-row laptop:items-center"
                                >
                                    <label className="w-[100px]">Previous: </label>
                                    <div
                                    className="bg-white flex items-center w-full overflow-hidden p-2"
                                    >
                                        <h1>{props.previous}</h1>
                                    </div>
                                </div>

                                <div
                                className="flex flex-col gap-3 laptop:flex-row laptop:items-center"
                                >
                                    <label className="w-[100px]">Hash: </label>
                                    <div
                                    className="bg-white flex items-center w-full overflow-hidden p-2"
                                    >
                                        <h1>{hash}</h1>
                                    </div>
                                </div>

                                <button
                                className="bg-sky-400 mt-8 text-gray-200 rounded-lg p-2 text-xl font-semibold w-1/2 self-center
                                shadow-lg"
                                type="submit"
                                >
                                    test
                                </button>

                            </form>
                        )}

                </Formik>

                

                
            </div>

            {/* THE RIDDEL */}

            <div
            className={`
            ${riddleToggled ? "h-[250px] bg-slate-200 opacity-100" : "h-0 bg-white opacity-0"}
            ease-in-out duration-1000 w-full 
            `}
            >
                {riddleToggled && (
                    <div className="w-full flex flex-col items-center p-5">
                        <h1 className="text-xl font-semibold">Riddle {props.blockNumber} :</h1>
                        <p>{props.riddle}</p>
                    </div>
                )}
            </div>

            {riddleToggled && (
                <div
                className="w-full h-[70px] flex items-center justify-center font-medium 
                text-xl hover:bg-sky-200 ease-in-out duration-500 cursor-pointer
                bg-sky-100
                "
                onClick={() => setRiddleToggled(false)}
                onMouseOver={() => setCloseRiddleHovered(true)}
                onMouseLeave={() => setCloseRiddleHovered(false)}
                 >
                    <h1
                     className="text-sky-900 flex items-end gap-4"
                     >Close the riddle 
                        <span
                        className={`
                        ease-in-out duration-500
                        ${closeRiddleHovered ? "translate-y-[-0.5rem]" : ""}
                        `}
                        >
                            <AiOutlineUp />
                        </span></h1>
                </div>
            )}

            {!riddleToggled && (
                <div
                className="w-full h-[70px] flex items-center justify-center font-medium
                text-xl hover:bg-sky-200 ease-in-out duration-500 cursor-pointer
                bg-sky-100"
                onClick={() => setRiddleToggled(true)}
                onMouseOver={() => setSeeRiddleHovered(true)}
                onMouseLeave={() => setSeeRiddleHovered(false)}
                >
                    <h1
                    className="text-sky-900 flex items-start gap-4"
                    >See the riddle <span
                    className={`
                    ease-in-out duration-500
                    ${seeRiddleHovered ? "translate-y-2" : ""}
                    `}
                    ><AiOutlineDown/></span> </h1>
                </div>
            )}

        </div>
    )
}


export default Block