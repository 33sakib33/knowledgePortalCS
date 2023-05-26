import { Op } from "sequelize";


export class Context {
    generateQueryString = (): any => {
        let baseQuery = {

        }

        baseQuery["where"] = {};
        baseQuery["raw"] = true;
        baseQuery["nest"] = true;
        baseQuery["offset"] = 0;
        baseQuery["limit"] = 10000;
        baseQuery["order"] = [];


        return baseQuery;
    }
    patternMatcher = new Array();
    constructor() {
        this.patternMatcher.push(new existStrategy());
        this.patternMatcher.push(new searchStrategy());
    }
    delegate(model1, model2): any {

        for (let matcher of this.patternMatcher) {
            if (matcher.patternMatch(model2)) {

                model1 = matcher.action(model1, model2);
            }
        }

        if (model2.pageSize) {
            model1["limit"] = model2.pageSize;
        }
        if (model2.currentPage && model2.currentPage) {
            model1["offset"] = (model2.currentPage - 1) * model2.currentPage
        }
        return model1;
    }
    emhphasisGenerator(model: any, model1: any): any {
        let keys = Object.keys(model);
        console.log("hello")
        console.log(model1)
        console.log(model)
        for (let i in model[keys[0]]) {

            if (!(model1.includes(i))) {
                delete model[keys[0]][i]
            }
        }

        console.log(model);
        return model;
    }
    preprocess(model: any, emphasisArray: any[], attrArray: any[], orderArray: any[], nestFlag, distinctFlag, joinFlag: any): any {
        let queryString = this.generateQueryString();

        let tempModel = JSON.parse(JSON.stringify(model));
        let model2 = this.emhphasisGenerator(tempModel,
            emphasisArray)
        console.log(model2)
        queryString = this.delegate(queryString, model2)
        if (attrArray.length > 0) {
            queryString["attributes"] = attrArray
        }
        if (orderArray.length > 0) {
            queryString["order"].push(orderArray)
        }
        if (joinFlag) {
            queryString["include"] = joinFlag;
            queryString["raw"] = false;
        }
        if (distinctFlag) {
            queryString["distinct"] = true;
        }



        queryString["nest"] = nestFlag;
        console.log(queryString)
        return queryString;

    }
}

interface strategy {
    patternMatch(model: any): boolean;
    action(model1: any, model2: any): any;
}



class existStrategy implements strategy {
    patternMatch(model: any): boolean {
        return (!model.searchString);
        // return (true);
    }
    action(model1: any, model2: any, emphasis = null) {
        let keys = Object.keys(model2);

        for (let i in model2[keys[0]]) {
            if (model2[keys[0]][i])
                model1["where"][i] = model2[keys[0]][i];
        }
        console.log("here343")
        console.log(model1);
        return model1;
    }
}

// class codeStrategy implements strategy {
//     patternMatch(model: any): boolean {
//         return ("code" in model);
//     }
//     action(model1: any, model2: any) {
//         model1["where"]["code"] = model2.code;
//         return model1;
//     }
// }

class searchStrategy implements strategy {
    patternMatch(model: any): boolean {
        return (model.searchString);
        // return false;
    }

    action(model1: any, model2: any) {
        // const eq = Symbol('[Op.eq]');
        // const or = Symbol('[Op.or]');
        // const iLike = Symbol('[Op.iLike]');
        let keys = Object.keys(model2);
        console.log("in search")
        console.log(model2[keys[0]]);
        let ls = new Array();
        for (let key in model2[keys[0]]) {

            if (!model2[keys[0]][key]) continue;


            if (1) {
                console.log("in 1")
                let obj2 = {

                }
                obj2[Op.iLike] = "%" + model2[keys[0]][key] + "%"

                let obj = {};
                obj[key] = obj2;
                ls.push(obj);
            }
            else {
                let obj2 = {

                }
                obj2[Op.eq] = model2[keys[0]][key]

                let obj = {};
                obj[key] = obj2
                ls.push(obj);
            }

        }

        model1["where"][Op.or] = ls;
        console.log(model1["where"]);

        console.log(model1);
        return model1;
    }
}

