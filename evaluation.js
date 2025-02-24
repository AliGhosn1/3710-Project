export const EvaluateAverageScoreOfSingleSelection = (randomChoices, selectionToTest) => {
    let score = 0;
    for (let i = 0; i < randomChoices.length; i++) {
        for(let j = 0; j < randomChoices[i].length; j++) {
            if (randomChoices[i][j] === selectionToTest[i]) {
                if(randomChoices[i][j] === 0) {
                    score -= 1;
                }
                else {
                    score -= 10;
                }
            }
            else {
                if(randomChoices[i][j] === 0) {
                    score -= 20;
                }
                // we defected and they cooperated
                else {
                    continue
                }
            }
        }
    }
    return score / randomChoices.length;
}

export const EvaluateAverageScoreOfPopulation = (randomChoices, population) => {
    let score = 0;
    for (let i = 0; i < population.length; i++) {
        score += EvaluateAverageScoreOfSingleSelection(randomChoices, population[i]);
    }
    return score / population.length;
}

