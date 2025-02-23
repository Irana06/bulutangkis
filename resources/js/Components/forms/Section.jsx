export const Section = ({ children, title, actions }) => {
    return (
      <section className="px-4">
        <div className="p-4 bg-white rounded">
          <div className="flex flex-row items-center justify-between">
            <span className="text-lg font-bold tracking-wide">{title}</span>
            <div>{actions}</div>
          </div>
          <div className="mt-5">{children}</div>
        </div>
      </section>
    );
  };
