import React from 'react';

export const premadeLists = [
    {
        name: 'Autumn Bucket List',
        tasks: [
            { name: 'Thrift a cozy sweater', completed: false },
            { name: 'Stop by the farmer’s market', completed: false },
            { name: 'Make a soup from scratch ', completed: false },
            { name: 'Bake a pie', completed: false },
            { name: 'Curl up with a book', completed: false },
            { name: 'Visit a pumpkin patch', completed: false },
            { name: 'Collect fall leaves', completed: false },
            { name: 'Decorate for fall', completed: false },
        ],
    },
    {
        name: 'Summer Bucket List',
        tasks: [
            { name: 'Make homemade lemonade', completed: false },
            { name: 'Try a new ice cream flavor', completed: false },
            { name: 'Spend an afternoon in the park', completed: false },
            { name: 'Go berry picking', completed: false },
            { name: 'Go to an outdoor concert', completed: false },
            { name: 'Plant a flower that blooms in autumn', completed: false },
            { name: 'Spend 24 hours away from screens', completed: false },
            { name: 'Wear your favorite color ', completed: false },
        ],
    },
    {
        name: 'Spring Bucket List',
        tasks: [
            { name: 'Learn a new recipe for spring', completed: false },
            { name: 'Explore parts of town you’ve never been to', completed: false },
            { name: 'Eat lunch outside in the sun', completed: false },
            { name: 'Buy new sunglasses for summer', completed: false },
            { name: 'Open the windows', completed: false },
            { name: 'Go for a walk in the rain', completed: false },
            { name: 'Spot the first butterfly of spring', completed: false },
            { name: 'Read a book under a tree', completed: false },
        ],
    },
];

const BucketList = () => {
    return (
        <div>
            <h2>Bucket Lists</h2>
            {premadeLists.map((list, index) => (
                <div key={index}>
                    <h3>{list.name}</h3>
                    <ul>
                        {list.tasks.map((task, taskIndex) => (
                            <li key={taskIndex}>{task.name}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default BucketList;