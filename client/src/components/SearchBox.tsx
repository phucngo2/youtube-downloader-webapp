import React from "react";

interface SearchBox {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => void;
    placeholder?: string;
    className?: string;
}

const SearchBox: React.FC<SearchBox> = ({
    value,
    onChange,
    handleSubmit,
    placeholder = "Search...",
    className = "",
}) => {
    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        handleSubmit();
    };

    return (
        <form onSubmit={onSubmit} className={className}>
            <div className="ui action input w-100">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
                <button type="submit" className="ui button blue">
                    Search
                </button>
            </div>
        </form>
    );
};

export default SearchBox;
