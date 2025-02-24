export const Section = ({ children, title, actions }) => {
    return (
        <section className="px-4">
            <div className="p-4 bg-white rounded">
                <div className="flex flex-row items-center justify-between">
                    <span className="text-xl font-extrabold tracking-wide">
                        {title}
                    </span>
                    <div>{actions}</div>
                </div>
                <hr className="my-3" />
                <div className="mt-5">{children}</div>
            </div>
        </section>
    );
};
