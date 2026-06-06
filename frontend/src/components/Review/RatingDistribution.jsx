const RatingDistribution = () => {

    const distribution = [
        { stars: 5, count: 95 },
        { stars: 4, count: 20 },
        { stars: 3, count: 8 },
        { stars: 2, count: 3 },
        { stars: 1, count: 2 },
    ];

    const totalReviews = distribution.reduce((sum, item) => sum + item.count, 0);

    return (
        <div className="bg-gray-100 p-[24px] rounded flex flex-col gap-3 w-full md:w-[40%]">
            <h3 className="text-xl font-semibold">Rating Distribution</h3>
            <div className="flex flex-col gap-2">
                {
                    distribution.map((item) => {
                        const percentage = (item.count / totalReviews) * 100;
                        return (
                            <div key={item.stars} className="flex justify-between items-center gap-2">
                                <span>{item.stars} stars</span>
                                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-green-500 rounded-full"
                                        style={{
                                            width: `${percentage}%`,
                                        }}
                                    />
                                </div>
                                <span>{item.count}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default RatingDistribution;