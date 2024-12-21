import React from 'react';

const DepartmentCard = ({ cardType, departmentKey }) => {
    const { Card, Header, Line } = cardType[departmentKey]; // Fallback to admin if key not found

    return (
        <div className="flex p-[10%] pb-0 w-full gap-10">
            <div className="flex flex-shrink-0 gap-5">
                <Card />
            </div>
            <div className="flex-shrink-0 relative ml-[4%]">
                <Header />
                <div className={`card-line-wrapper absolute h-[39%]`}>
                    <Line />
                </div>
            </div>
        </div>
    );
};

export default DepartmentCard;

