function Loader() {
    return (
        <>
            {/* <div className="fixed inset-0 w-full h-screen z-50 blur-black flex items-center justify-center max_w_3xl"> */}
            {/* <div className="w-96 h-96 mx-auto relative blur-white rounded-full">
                <div id="loader"></div>
            </div> */}
            {/* </div> */}
            <div className="loader blur-black">
                <div className="face face1"><div className="circle"></div></div>
                <div className="face face2"><div className="circle"></div></div>
                <div className="face face3"><div className="circle"></div></div>
            </div>
        </>
    )
}

export default Loader
