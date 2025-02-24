import { GetRandomChoices } from "./randomChoice.js";
import { BaseGenericAlgorithim } from "./GenericAlgorithims.js";
import { GetDateForFileName } from "./general.js";
import fs from 'fs';

const randomChoiceList = GetRandomChoices();
const BaseGenericAlgorithimResults = BaseGenericAlgorithim(randomChoiceList, 400);

const outputString = 
"BaseGenericAlgorithim\n" + 
"---------------------\n" +
BaseGenericAlgorithimResults;

fs.writeFile(`output-${GetDateForFileName()}.txt`, outputString, (err) => {
    if (err) throw err;
});