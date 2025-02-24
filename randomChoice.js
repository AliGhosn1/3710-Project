// Get the random choices
export const GetRandomChoices = () => {
    const randomChoiceList = new Array(10).fill(null).map(() => new Array(10));

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            // 0 = coop, 1 = def
            randomChoiceList[i][j] = Math.floor(Math.random() * 2);
        }
    }

    return randomChoiceList;
};

export const GetRandomChoice = () =>{
    const randomChoiceList = new Array(10);
    for (let j = 0; j < 10; j++) {
        // 0 = coop, 1 = def
        randomChoiceList[j] = Math.floor(Math.random() * 2);
    }

    return randomChoiceList;
}
