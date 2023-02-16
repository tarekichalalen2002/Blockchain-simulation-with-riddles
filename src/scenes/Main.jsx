import { useState , useEffect } from "react"
import sha256 from "sha256";
import * as yup from "yup";
import {Formik} from "formik"
import {AiOutlineDown , AiOutlineUp} from "react-icons/ai"
import Confetti from "react-confetti"


const Main = () => {

    const validationSchema = yup.object().shape({
        data: yup.string(),
    })
    const initialValues ={
        data:"",
    }

    const [height, setHeight] = useState(null);
    const [width, setWidth] = useState(null);

    useEffect(() => {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);
    }, []);


    const [userWon , setUserWon] = useState(false);

    const [answer1 , setAnswer1] = useState("");
    const [answer2 , setAnswer2] = useState("");
    const [answer3 , setAnswer3] = useState("");
    const [answer4 , setAnswer4] = useState("");
    const [answer5 , setAnswer5] = useState("");

    const [riddleToggled1 , setRiddleToggled1] = useState(false);
    const [riddleToggled2 , setRiddleToggled2] = useState(false);
    const [riddleToggled3 , setRiddleToggled3] = useState(false);
    const [riddleToggled4 , setRiddleToggled4] = useState(false);
    const [riddleToggled5 , setRiddleToggled5] = useState(false);

    const [seeRiddleHovered1 , setSeeRiddleHovered1] = useState(false);
    const [seeRiddleHovered2 , setSeeRiddleHovered2] = useState(false);
    const [seeRiddleHovered3 , setSeeRiddleHovered3] = useState(false);
    const [seeRiddleHovered4 , setSeeRiddleHovered4] = useState(false);
    const [seeRiddleHovered5 , setSeeRiddleHovered5] = useState(false);

    
    const [closeRiddleHovered1 , setCloseRiddleHovered1] = useState(false);
    const [closeRiddleHovered2 , setCloseRiddleHovered2] = useState(false);
    const [closeRiddleHovered3 , setCloseRiddleHovered3] = useState(false);
    const [closeRiddleHovered4 , setCloseRiddleHovered4] = useState(false);
    const [closeRiddleHovered5 , setCloseRiddleHovered5] = useState(false);


    const origin="0000000000000000000000000000000000000000000000000000000000000000";

    
    const [previousHash1 , setPreviousHash1] =useState(origin);
    const [previousHash2 , setPreviousHash2] =useState(sha256(1+"" +previousHash1));
    const [previousHash3 , setPreviousHash3] =useState(sha256(2+"" +previousHash2));
    const [previousHash4 , setPreviousHash4] =useState(sha256(3+"" +previousHash3));
    const [previousHash5 , setPreviousHash5] =useState(sha256(4+"" +previousHash4))


    const handleFormSubmit1 = (values , onSubmitProps) => {

        setAnswer1(values.data)

        setPreviousHash2(sha256("1"+values.data+origin))
        setPreviousHash3(sha256("2"+answer2+sha256("1"+values.data+origin)))
        setPreviousHash4(sha256("3"+answer3+sha256("2"+answer2+sha256("1"+values.data+origin))))
        setPreviousHash5(sha256("4"+answer4.answer+sha256("3"+answer3+sha256("2"+answer2+sha256("1"+values.data+origin)))))

    }

    const handleFormSubmit2 = (values , onSubmitProps) => {

        setAnswer2(values.data)

        setPreviousHash2(sha256("1"+answer1+origin))
        setPreviousHash3(sha256("2"+values.data+sha256("1"+answer1+origin)))
        setPreviousHash4(sha256("3"+answer3+sha256("2"+values.data+sha256("1"+answer1+origin))))
        setPreviousHash5(sha256("4"+answer4.answer+sha256("3"+answer3+sha256("2"+values.data+sha256("1"+answer1+origin)))))

    }

    const handleFormSubmit3 = (values , onSubmitProps) => {

        setAnswer3(values.data)

        setPreviousHash2(sha256("1"+answer1+origin))
        setPreviousHash3(sha256("2"+answer2+sha256("1"+answer1+origin)))
        setPreviousHash4(sha256("3"+values.data+sha256("2"+answer2+sha256("1"+answer1+origin))))
        setPreviousHash5(sha256("4"+answer4.answer+sha256("3"+values.data+sha256("2"+answer2+sha256("1"+answer1+origin)))))
    }

    const handleFormSubmit4 = (values , onSubmitProps) => {

        setAnswer4(values.data)

        setPreviousHash2(sha256("1"+answer1+origin))
        setPreviousHash3(sha256("2"+answer2+sha256("1"+answer1+origin)))
        setPreviousHash4(sha256("3"+answer3+sha256("2"+answer2+sha256("1"+answer1+origin))))
        setPreviousHash5(sha256("4"+values.data+sha256("3"+answer3+sha256("2"+answer2+sha256("1"+answer1+origin)))))

    }

    const handleFormSubmit5 = (values , onSubmitProps) => {
        setAnswer5(values.data)
        if (sha256(5+values.data+previousHash5 === correctHashes[4])) {
            setUserWon(true);
            console.log("user Won ! ");
        }
    }


    const riddles = [
        {riddle:"I am taken from a mine and shut up in a metal case, from which I am never released, and yet I am used by almost every person. What am I?" , answer:"coin"},
        {riddle:"What starts with an E, ends with an E, but only contains one letter?", answer:"envelope"},
        {riddle:"I am always hungry, I must always be fed. The finger I touch, will soon turn red. What am I?" , answer:"fire"},
        {riddle: "I am light as a feather, yet even the strongest man cannot hold me for much longer than a minute. What am I?" , answer:"breath"},
        {riddle: "I am an odd number. Take away a letter, and I become even. What number am I?" , answer:"seven"},
    ]


    const correctHashes = [
        sha256("1"+riddles[0].answer+origin),
        sha256("2"+riddles[1].answer+sha256("1"+riddles[0].answer+origin)),
        sha256("3"+riddles[2].answer+sha256("2"+riddles[1].answer+sha256("1"+riddles[0].answer+origin))),
        sha256("4"+riddles[3].answer+sha256("3"+riddles[2].answer+sha256("2"+riddles[1].answer+sha256("1"+riddles[0].answer+origin)))),
        sha256("5"+riddles[4].answer+sha256("4"+riddles[3].answer+sha256("3"+riddles[2].answer+sha256("2"+riddles[1].answer+sha256("1"+riddles[0].answer+origin))))),
    ]

    return (
        <section
        className="w-full h-full p-10 relative"
        >
            <header
            className="flex flex-col gap-8 p-6 items-center mb-10"
            >
                <h1
                className="text-3xl text-sky-900 font-medium text-center"
                >Visual Blockchain Game</h1>

                <p
                className="text-center text-xl"
                >You have to find the solutions for the riddels for every block and write the answer and test until you find all the chain</p>
            </header>

            <section
            className="flex flex-row gap-8 overflow-x-scroll"
            >

{/*-----------------------------------------------------------------  BLOCK 01   ----------------------------------------------------------------------------------------*/}

                <div
                className="flex flex-col gap-0 tablet:w-7/12 w-full sm:w-1/3"
                >

                    <div 
                    className={` min-h-[450px] w-full
                    ${sha256(1+answer1+previousHash1) === correctHashes[0] ? "bg-blue-200" :"bg-red-200"}
                    rounded-lg shadow-inner
                    p-5
                    text-gray-800 font-medium
                    `}
                    >
                        <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit1}
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
                                                value={1}
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
                                                <h1>{previousHash1}</h1>
                                            </div>
                                        </div>

                                        <div
                                        className="flex flex-col gap-3 laptop:flex-row laptop:items-center"
                                        >
                                            <label className="w-[100px]">Hash: </label>
                                            <div
                                            className="bg-white flex items-center w-full overflow-hidden p-2"
                                            >
                                                <h1>{sha256(1 + values.data + previousHash1)}</h1>
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
                    ${riddleToggled1 ? "h-[250px] bg-slate-200 opacity-100" : "h-0 bg-white opacity-0"}
                    ease-in-out duration-1000 w-full overflow-y-scroll 
                    `}
                    >
                        {riddleToggled1 && (
                            <div className="w-full flex flex-col items-center p-5">
                                <h1 className="text-xl font-semibold">Riddle {1} :</h1>
                                <p>{riddles[0].riddle}</p>
                            </div>
                        )}
                    </div>

                    {riddleToggled1 && (
                        <div
                        className="w-full h-[70px] flex items-center justify-center font-medium 
                        text-xl hover:bg-sky-200 ease-in-out duration-500 cursor-pointer
                        bg-sky-100
                        "
                        onClick={() => setRiddleToggled1(false)}
                        onMouseOver={() => setCloseRiddleHovered1(true)}
                        onMouseLeave={() => setCloseRiddleHovered1(false)}
                        >
                            <h1
                            className="text-sky-900 flex items-end gap-4"
                            >Close the riddle 
                                <span
                                className={`
                                ease-in-out duration-500
                                ${closeRiddleHovered1 ? "translate-y-[-0.5rem]" : ""}
                                `}
                                >
                                    <AiOutlineUp />
                                </span></h1>
                        </div>
                    )}

                    {!riddleToggled1 && (
                        <div
                        className="w-full h-[70px] flex items-center justify-center font-medium
                        text-xl hover:bg-sky-200 ease-in-out duration-500 cursor-pointer
                        bg-sky-100"
                        onClick={() => setRiddleToggled1(true)}
                        onMouseOver={() => setSeeRiddleHovered1(true)}
                        onMouseLeave={() => setSeeRiddleHovered1(false)}
                        >
                            <h1
                            className="text-sky-900 flex items-start gap-4"
                            >See the riddle <span
                            className={`
                            ease-in-out duration-500
                            ${seeRiddleHovered1 ? "translate-y-2" : ""}
                            `}
                            ><AiOutlineDown/></span> </h1>
                        </div>
                    )}

                </div>

{/*------------------------------------------------------------------ BLOCK 02  ---------------------------------------------------------------------------------------*/}


                <div
                className="flex flex-col gap-0 tablet:w-7/12 w-full sm:w-1/3"
                >

                    <div 
                    className={` min-h-[450px] w-full
                    ${sha256(2+answer2+previousHash2) === correctHashes[1] ? "bg-blue-200" :"bg-red-200"}
                    rounded-lg shadow-inner
                    p-5
                    text-gray-800 font-medium
                    `}
                    >
                        <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit2}
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
                                                value={2}
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
                                                <h1>{previousHash2}</h1>
                                            </div>
                                        </div>

                                        <div
                                        className="flex flex-col gap-3 laptop:flex-row laptop:items-center"
                                        >
                                            <label className="w-[100px]">Hash: </label>
                                            <div
                                            className="bg-white flex items-center w-full overflow-hidden p-2"
                                            >
                                                <h1>{sha256(2 + values.data + previousHash2)}</h1>
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
                    ${riddleToggled2 ? "h-[250px] bg-slate-200 opacity-100" : "h-0 bg-white opacity-0"}
                    ease-in-out duration-1000 w-full overflow-y-scroll 
                    `}
                    >
                        {riddleToggled2 && (
                            <div className="w-full flex flex-col items-center p-5">
                                <h1 className="text-xl font-semibold">Riddle {2} :</h1>
                                <p>{riddles[1].riddle}</p>
                            </div>
                        )}
                    </div>

                    {riddleToggled2 && (
                        <div
                        className="w-full h-[70px] flex items-center justify-center font-medium 
                        text-xl hover:bg-sky-200 ease-in-out duration-500 cursor-pointer
                        bg-sky-100
                        "
                        onClick={() => setRiddleToggled2(false)}
                        onMouseOver={() => setCloseRiddleHovered2(true)}
                        onMouseLeave={() => setCloseRiddleHovered2(false)}
                        >
                            <h1
                            className="text-sky-900 flex items-end gap-4"
                            >Close the riddle 
                                <span
                                className={`
                                ease-in-out duration-500
                                ${closeRiddleHovered2 ? "translate-y-[-0.5rem]" : ""}
                                `}
                                >
                                    <AiOutlineUp />
                                </span></h1>
                        </div>
                    )}

                    {!riddleToggled2 && (
                        <div
                        className="w-full h-[70px] flex items-center justify-center font-medium
                        text-xl hover:bg-sky-200 ease-in-out duration-500 cursor-pointer
                        bg-sky-100"
                        onClick={() => setRiddleToggled2(true)}
                        onMouseOver={() => setSeeRiddleHovered2(true)}
                        onMouseLeave={() => setSeeRiddleHovered2(false)}
                        >
                            <h1
                            className="text-sky-900 flex items-start gap-4"
                            >See the riddle <span
                            className={`
                            ease-in-out duration-500
                            ${seeRiddleHovered2 ? "translate-y-2" : ""}
                            `}
                            ><AiOutlineDown/></span> </h1>
                        </div>
                    )}

                </div>

{/*----------------------------------------------------------------  BLOCK 03  -----------------------------------------------------------------------------------------*/}

                <div
                className="flex flex-col gap-0 tablet:w-7/12 w-full sm:w-1/3"
                >

                    <div 
                    className={` min-h-[450px] w-full
                    ${sha256(3+answer3+previousHash3) === correctHashes[2] ? "bg-blue-200" :"bg-red-200"}
                    rounded-lg shadow-inner
                    p-5
                    text-gray-800 font-medium
                    `}
                    >
                        <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit3}
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
                                                value={3}
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
                                                <h1>{previousHash3}</h1>
                                            </div>
                                        </div>

                                        <div
                                        className="flex flex-col gap-3 laptop:flex-row laptop:items-center"
                                        >
                                            <label className="w-[100px]">Hash: </label>
                                            <div
                                            className="bg-white flex items-center w-full overflow-hidden p-2"
                                            >
                                                <h1>{sha256(3 + values.data + previousHash3)}</h1>
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
                    ${riddleToggled3 ? "h-[250px] bg-slate-200 opacity-100" : "h-0 bg-white opacity-0"}
                    ease-in-out duration-1000 w-full overflow-y-scroll 
                    `}
                    >
                        {riddleToggled3 && (
                            <div className="w-full flex flex-col items-center p-5">
                                <h1 className="text-xl font-semibold">Riddle {3} :</h1>
                                <p>{riddles[2].riddle}</p>
                            </div>
                        )}
                    </div>

                    {riddleToggled3 && (
                        <div
                        className="w-full h-[70px] flex items-center justify-center font-medium 
                        text-xl hover:bg-sky-200 ease-in-out duration-500 cursor-pointer
                        bg-sky-100
                        "
                        onClick={() => setRiddleToggled3(false)}
                        onMouseOver={() => setCloseRiddleHovered3(true)}
                        onMouseLeave={() => setCloseRiddleHovered3(false)}
                        >
                            <h1
                            className="text-sky-900 flex items-end gap-4"
                            >Close the riddle 
                                <span
                                className={`
                                ease-in-out duration-500
                                ${closeRiddleHovered3 ? "translate-y-[-0.5rem]" : ""}
                                `}
                                >
                                    <AiOutlineUp />
                                </span></h1>
                        </div>
                    )}

                    {!riddleToggled3 && (
                        <div
                        className="w-full h-[70px] flex items-center justify-center font-medium
                        text-xl hover:bg-sky-200 ease-in-out duration-500 cursor-pointer
                        bg-sky-100"
                        onClick={() => setRiddleToggled3(true)}
                        onMouseOver={() => setSeeRiddleHovered3(true)}
                        onMouseLeave={() => setSeeRiddleHovered3(false)}
                        >
                            <h1
                            className="text-sky-900 flex items-start gap-4"
                            >See the riddle <span
                            className={`
                            ease-in-out duration-500
                            ${seeRiddleHovered3 ? "translate-y-2" : ""}
                            `}
                            ><AiOutlineDown/></span> </h1>
                        </div>
                    )}

                </div>

{/*----------------------------------------------------------------- BLOCK 04   ----------------------------------------------------------------------------------------*/}

                <div
                className="flex flex-col gap-0 tablet:w-7/12 w-full sm:w-1/3"
                >

                    <div 
                    className={` min-h-[450px] w-full
                    ${sha256(4+answer4+previousHash4) === correctHashes[3] ? "bg-blue-200" :"bg-red-200"}
                    rounded-lg shadow-inner
                    p-5
                    text-gray-800 font-medium
                    `}
                    >
                        <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit4}
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
                                                value={4}
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
                                                <h1>{previousHash4}</h1>
                                            </div>
                                        </div>

                                        <div
                                        className="flex flex-col gap-3 laptop:flex-row laptop:items-center"
                                        >
                                            <label className="w-[100px]">Hash: </label>
                                            <div
                                            className="bg-white flex items-center w-full overflow-hidden p-2"
                                            >
                                                <h1>{sha256(4 + values.data + previousHash4)}</h1>
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
                    ${riddleToggled4 ? "h-[250px] bg-slate-200 opacity-100" : "h-0 bg-white opacity-0"}
                    ease-in-out duration-1000 w-full overflow-y-scroll 
                    `}
                    >
                        {riddleToggled4 && (
                            <div className="w-full flex flex-col items-center p-5">
                                <h1 className="text-xl font-semibold">Riddle {4} :</h1>
                                <p>{riddles[3].riddle}</p>
                            </div>
                        )}
                    </div>

                    {riddleToggled4 && (
                        <div
                        className="w-full h-[70px] flex items-center justify-center font-medium 
                        text-xl hover:bg-sky-200 ease-in-out duration-500 cursor-pointer
                        bg-sky-100
                        "
                        onClick={() => setRiddleToggled4(false)}
                        onMouseOver={() => setCloseRiddleHovered4(true)}
                        onMouseLeave={() => setCloseRiddleHovered4(false)}
                        >
                            <h1
                            className="text-sky-900 flex items-end gap-4"
                            >Close the riddle 
                                <span
                                className={`
                                ease-in-out duration-500
                                ${closeRiddleHovered4 ? "translate-y-[-0.5rem]" : ""}
                                `}
                                >
                                    <AiOutlineUp />
                                </span></h1>
                        </div>
                    )}

                    {!riddleToggled4 && (
                        <div
                        className="w-full h-[70px] flex items-center justify-center font-medium
                        text-xl hover:bg-sky-200 ease-in-out duration-500 cursor-pointer
                        bg-sky-100"
                        onClick={() => setRiddleToggled4(true)}
                        onMouseOver={() => setSeeRiddleHovered4(true)}
                        onMouseLeave={() => setSeeRiddleHovered4(false)}
                        >
                            <h1
                            className="text-sky-900 flex items-start gap-4"
                            >See the riddle <span
                            className={`
                            ease-in-out duration-500
                            ${seeRiddleHovered4 ? "translate-y-2" : ""}
                            `}
                            ><AiOutlineDown/></span> </h1>
                        </div>
                    )}

                </div>

{/*----------------------------------------------------------- BLOCK 05  ----------------------------------------------------------------------------------------------*/}

<div
                className="flex flex-col gap-0 tablet:w-7/12 w-full sm:w-1/3"
                >

                    <div 
                    className={` min-h-[450px] w-full
                    ${sha256(5+answer5+previousHash5) === correctHashes[4] ? "bg-blue-200" :"bg-red-200"}
                    rounded-lg shadow-inner
                    p-5
                    text-gray-800 font-medium
                    `}
                    >
                        <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit5}
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
                                                value={5}
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
                                                <h1>{previousHash5}</h1>
                                            </div>
                                        </div>

                                        <div
                                        className="flex flex-col gap-3 laptop:flex-row laptop:items-center"
                                        >
                                            <label className="w-[100px]">Hash: </label>
                                            <div
                                            className="bg-white flex items-center w-full overflow-hidden p-2"
                                            >
                                                <h1>{sha256(5 + values.data + previousHash5)}</h1>
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
                    ${riddleToggled5 ? "h-[250px] bg-slate-200 opacity-100" : "h-0 bg-white opacity-0"}
                    ease-in-out duration-1000 w-full overflow-y-scroll 
                    `}
                    >
                        {riddleToggled5 && (
                            <div className="w-full flex flex-col items-center p-5">
                                <h1 className="text-xl font-semibold">Riddle {5} :</h1>
                                <p>{riddles[4].riddle}</p>
                            </div>
                        )}
                    </div>

                    {riddleToggled5 && (
                        <div
                        className="w-full h-[70px] flex items-center justify-center font-medium 
                        text-xl hover:bg-sky-200 ease-in-out duration-500 cursor-pointer
                        bg-sky-100
                        "
                        onClick={() => setRiddleToggled5(false)}
                        onMouseOver={() => setCloseRiddleHovered5(true)}
                        onMouseLeave={() => setCloseRiddleHovered5(false)}
                        >
                            <h1
                            className="text-sky-900 flex items-end gap-4"
                            >Close the riddle 
                                <span
                                className={`
                                ease-in-out duration-500
                                ${closeRiddleHovered5 ? "translate-y-[-0.5rem]" : ""}
                                `}
                                >
                                    <AiOutlineUp />
                                </span></h1>
                        </div>
                    )}

                    {!riddleToggled5 && (
                        <div
                        className="w-full h-[70px] flex items-center justify-center font-medium
                        text-xl hover:bg-sky-200 ease-in-out duration-500 cursor-pointer
                        bg-sky-100"
                        onClick={() => setRiddleToggled5(true)}
                        onMouseOver={() => setSeeRiddleHovered5(true)}
                        onMouseLeave={() => setSeeRiddleHovered5(false)}
                        >
                            <h1
                            className="text-sky-900 flex items-start gap-4"
                            >See the riddle <span
                            className={`
                            ease-in-out duration-500
                            ${seeRiddleHovered5 ? "translate-y-2" : ""}
                            `}
                            ><AiOutlineDown/></span> </h1>
                        </div>
                    )}

                </div>

{/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/}

            </section>
            {userWon && (
                <Confetti numberOfPieces={150} width={width} height={height} duration={3000}/>
            )}

        </section>
    )
}

export default Main;