function CardLoader() {
    const items = [1, 2, 3, 4, 5, 6, 7, 8]
    return (
        <>
            {/* <div class="card">
                <div class="card__image loading"></div>
                <div class="card__title loading"></div>
                <div class="card__description loading"></div>
            </div> */}
            <div className="p-5 py-10 sm:p-10 xl:px-20 min-w-full mx-auto text-white animate-pulse">
                <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 lg:grid-cols-3 gap-5 gap-y-8 place-items-center items-stretch question__group">
                    {
                        items.map(item => (
                            <div key={item} className="max-w-xs min-w-[80%] p-5 shadow-lg relative blur-black rounded-lg">
                                <div className="w-full h-48 rounded-lg bg-gray-500 bg-opacity-70"></div>
                                <div className="py-5 h-full">
                                    <h1 className="mb-4 h-[80px] bg-gray-600 bg-opacity-50"></h1>
                                    <div className="h-16 w-full bg-gray-700 bg-opacity-60">
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default CardLoader
