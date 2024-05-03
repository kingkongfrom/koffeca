const Spinner = () => {
    return (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center ">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-gray-800"></div>
        </div>
    );
};

export default Spinner;
