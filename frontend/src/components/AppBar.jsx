export function AppBar() {
    return (
        <div className="flex justify-between h-14 shadow bg-gray-800 text-white rounded-lg">
            <div className="flex felx-col justify-center ml-4 h-full mt-3 text-white text-xl font-bold">
                CashApp
            </div>
            <div className="flex items-center">
                <div className="h-full flex felx-col mr-4 justify-center mt-7 text-white">
                    Hello
                </div>

                <div className="rounded-full w-12 h-12 mr-2 bg-white flex justify-center items-center">
                    <div className="text-gray-700 text-xl font-semibold">U</div>
                </div>
            </div>
        </div>
    );
}
