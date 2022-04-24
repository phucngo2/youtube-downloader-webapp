import React from "react";

interface TableProps {
    headings: string[];
    data: any[];
    className?: string;
}

const Table: React.FC<TableProps> = ({ headings, data, className = "" }) => {
    const sampleItem = data[0];

    if (!data || data.length === 0 || Object.keys(sampleItem).length === 0)
        return <></>;

    const keys = Object.keys(sampleItem);

    return (
        <div className={`${className}`}>
            <table className="ui striped table celled">
                <thead className="">
                    <tr className="">
                        {headings.map((heading) => (
                            <th className="" key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="">
                    {data.map((item) => (
                        <tr key={`${item["key"] || item[keys[0]]}`}>
                            {keys.map((key) => {
                                if (key !== "key")
                                    return (
                                        <td key={`${item["key"]} ${key}`}>
                                            {item[key]}
                                        </td>
                                    );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
