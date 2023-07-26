type Contents = {
    CategoryName: string,
    ContentsIcon: string,
    ContentsName: string,
    Location: string,
    MinItemLevel: number,
    RewardItems: Reward[],
    StartTimes: string[]
}

type Reward = {
    Grade: string,
    Icon: string,
    Name: string,
    StartTimes: string[]
} | null