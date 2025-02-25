import { GetRandomChoices } from "./randomChoice.js";
import { BaseGenericAlgorithim, GenericAlgorithimWithRandomBitSwap } from "./GenericAlgorithims.js";
import { GetDateForFileName } from "./general.js";
import xlsx from 'xlsx';

const iterations = 10000;
const wb = xlsx.utils.book_new();

const initialPopulation = GetRandomChoices();
const randomChoiceList = GetRandomChoices();

const data = [
    ['Name(countOfMembersToFormNextIteration)(eliteMemberCount)', 'Iterations', 'InitialScore', 'FinalScore', 'Time(ms)'],  
];

for(let i = 1; i <= 5; i++) {
    for(let j = 0; j <= i; j++) {
        data.push(BaseGenericAlgorithim(JSON.parse(JSON.stringify(initialPopulation)), randomChoiceList, iterations, i, j));
        data.push(GenericAlgorithimWithRandomBitSwap(JSON.parse(JSON.stringify(initialPopulation)), randomChoiceList, iterations, i, j));
        data.push(['']);
    }
}

const ws = xlsx.utils.aoa_to_sheet(data);  
xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');

xlsx.writeFile(wb, "out" + GetDateForFileName() + ".xlsb");
