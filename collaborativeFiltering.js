const basicDataSet = require('./basicDataSet');
const insuranceDataSet = require('./insuranceDataSet');

var euclid = Math.sqrt(Math.pow(3.5 - 2.5, 2) + Math.pow(4.0 - 3.5, 2));

var reuclid = 1 / (1 + euclid);

//calculate the euclidean distance between two items
var euclidean_score = function (dataset, p1, p2) {

    var existp1p2 = {};//store item existing in both item
    //if dataset is in p1 and p2 
    //store it in as one
    for (var key in dataset[p1]) {
        if (key in dataset[p2]) {
            existp1p2[key] = 1
        }
        if (len(existp1p2) == 0) return 0;//check if it has a data
        var sum_of_euclidean_dist = [];//store the  euclidean distance

        //calculate the euclidean distance
        for (item in dataset[p1]) {
            if (item in dataset[p2]) {
                sum_of_euclidean_dist.push(Math.pow(dataset[p1][item] - dataset[p2][item], 2));
            }
        }
        var sum = 0;
        for (var i = 0; i < sum_of_euclidean_dist.length; i++) {
            sum += sum_of_euclidean_dist[i]; //calculate the sum of the euclidean
        }
        var sum_sqrt = 1 / (1 + Math.sqrt(sum));
        return sum_sqrt;
    }
}

var len = function (obj) {
    var len = 0;
    for (var i in obj) {
        len++
    }
    return len;
}

var pearson_correlation = function (dataset, p1, p2) {
    var existp1p2 = {};
    for (item in dataset[p1]) {
        if (item in dataset[p2]) {
            existp1p2[item] = 1
        }
    }
    var num_existence = len(existp1p2);
    if (num_existence == 0) return 0;
    //store the sum and the square sum of both p1 and p2
    //store the product of both
    var p1_sum = 0,
        p2_sum = 0,
        p1_sq_sum = 0,
        p2_sq_sum = 0,
        prod_p1p2 = 0;
    //calculate the sum and square sum of each data point
    //and also the product of both point
    for (var item in existp1p2) {
        p1_sum += dataset[p1][item];
        p2_sum += dataset[p2][item];
        p1_sq_sum += Math.pow(dataset[p1][item], 2);
        p2_sq_sum += Math.pow(dataset[p2][item], 2);
        prod_p1p2 += dataset[p1][item] * dataset[p2][item];
    }
    var numerator = prod_p1p2 - (p1_sum * p2_sum / num_existence);
    var st1 = p1_sq_sum - Math.pow(p1_sum, 2) / num_existence;
    var st2 = p2_sq_sum - Math.pow(p2_sum, 2) / num_existence;
    var denominator = Math.sqrt(st1 * st2);
    if (denominator == 0) return 0;
    else {
        var val = numerator / denominator;
        return val;
    }

}

var similar_user = function (dataset, person, num_user, distance) {
    var scores = [];
    for (var others in dataset) {
        if (others != person && typeof (dataset[others]) != "function") {
            var val = distance(dataset, person, others)
            var p = others
            scores.push({ val: val, p: p });
        }
    }
    scores.sort(function (a, b) {
        return b.val < a.val ? -1 : b.val > a.val ? 1 : b.val >= a.val ? 0 : NaN;
    });

    var score = [];
    for (var i = 0; i < num_user; i++) {
        score.push(scores[i]);
    }
    return score;
}

var insuranceRecommendation = function (similar_user_result, insuranceDataSet) {
    result = {};
    for (var index in similar_user_result) {
        user = similar_user_result[index];
        userInsurance = insuranceDataSet[user["p"]];
        var userIndex = user["p"];
        if (userIndex in insuranceDataSet) {
            userInsurance = insuranceDataSet[userIndex]["insurance"];
            if (user["val"] > 0.5) {
                if (userInsurance in result) {
                    result[userInsurance] += user["val"]
                }
                else {
                    result[userInsurance] = user["val"]
                }
            }
        }
    }
    var sortable = [];
    for (var insurance in result) {
        sortable.push([insurance, result[insurance]]);
    }
    sortable.sort(function (a, b) {
        return b[1] - a[1];
    });

    firstRecommendation = sortable[0][0];
    secondRecommendation = sortable[1][0];
    return [firstRecommendation, secondRecommendation];
}

var recommendationResult = insuranceRecommendation(similar_user(basicDataSet.basicDataSet, '신준수', 5, pearson_correlation),
    insuranceDataSet.insuranceDataSet);

for (var i in recommendationResult) {
    console.log('고객님과 유사한 고객님들의 ', recommendationResult.indexOf(recommendationResult[i]) + 1, '순위 보험 선택은 ',
        recommendationResult[i], '입니다.');
}