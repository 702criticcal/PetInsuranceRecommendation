// 품종 = {
//     // 세계애견연맹 5 그룹. 뾰족한 주둥이와 선 귀를 가진 종 그룹.
//     '진돗개' : 50.0,
//     '포메라니안' : 50.1,
//     '시베리안 허스키' : 50.2,
//     // 세계애견연맹 6 그룹. 수렵견 그룹.
//     '비글' : 60.0,
//     '달마시안' : 60.1,
//     '바셋 하운드' : 60.2,
//     // 세계애견연맹 9 그룹. 가정견 그룹.
//     '몰티즈': 90.0,
//     '시추': 90.1,
//     '토이 푸들': 90.2,
//     '치와와': 90.3,
//     '빠삐용': 90.4
// }

// 강아지/고양이 = {
//     강아지 : 1,
//     고양이 : 10000000000
// }

// 성별 = {
//     암 : 1,
//     수 : 10000
// }

// 동물 등록 여부 = {
//     유 : 1,
//     무 : 100
// }

// 중성화 여부 = {
//     유 : 1,
//     무 : 100
// }

var yyyyMMdd = '2019/02/02' // 마이 페이지에서 입력받는 값 가져오는 걸로 수정하면 됨.
function getAgeFromBirthDay(birth_day) {
    var birthday = new Date(birth_day);
    var today = new Date();
    var age = today.getFullYear() - birthday.getFullYear();
    // if (age < 1) {
    //     var age = today.getMonth() - birthday.getMonth();
    //     console.log('생후 ', age, '개월');
    // }
    return age
}
// console.log('강아지 나이 : ', getAgeFromBirthDay('2017/03/04'));

// set a dataset
// 마이 페이지에서 입력받는 값 가져오는 걸로 수정하면 됨.
var basicDataSet = {
    '신준수': {
        '강아지/고양이': 1,
        '품종': 90.0,
        '나이': (getAgeFromBirthDay(yyyyMMdd) / 10),
        '성별': 1,
        '동물 등록 여부': 1,
        '중성화 여부': 100
    },
    '김철수': {
        '강아지/고양이': 1,
        '품종': 91.0,
        '나이': (getAgeFromBirthDay('2015/03/04') / 10),
        '성별': 1
    },
    '박보검': {
        '강아지/고양이': 1,
        '품종': 90.0,
        '나이': (getAgeFromBirthDay('2017/03/04') / 10),
        '성별': 1
    },
    '김미영': {
        '강아지/고양이': 10000000000,
        '품종': 11000000001.0,
        '나이': (getAgeFromBirthDay('2018/03/04') / 10),
        '성별': 1,
        '동물 등록 여부': 1,
        '중성화 여부': 100,
    },
    '홍길동': {
        '강아지/고양이': 1,
        '품종': 60.0,
        '나이': (getAgeFromBirthDay('2018/03/04') / 10),
        '성별': 10000,
        '동물 등록 여부': 100,
        '중성화 여부': 1,
    },
    '김밥밥': {
        '강아지/고양이': 1,
        '품종': 90.0,
        '나이': (getAgeFromBirthDay('2017/03/04') / 10),
        '성별': 10000
    }
};

var insuranceDataSet = {
    '신준수': { insurance: '삼성화재 애니펫' },
    '김철수': { insurance: '삼성화재 애니펫' },
    '박보검': { insurance: '삼성화재 애니펫' },
    '김미영': { insurance: 'DB손해보험 아이러브펫보험' },
    '홍길동': { insurance: 'DB손해보험 프로미 반려동물 보험' },
    '김밥밥': { insurance: 'KB손해보험 KB펫코노미' },
};

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

console.log('유클리드 거리 : ', euclidean_score(basicDataSet, "신준수", "김철수"));

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

console.log('피어슨 상관 관계 점수 : ', pearson_correlation(basicDataSet, '신준수', '김철수'))

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

console.log('유사한 사용자 : ', similar_user(basicDataSet, '신준수', 5, pearson_correlation));

var recommendation_eng = function (dataset, person, distance) {

    var totals = {
        setDefault: function (props, value) {
            if (!this[props]) {
                this[props] = 0;
            }
            this[props] += value;
        }
    },
        simsum = {
            setDefault: function (props, value) {
                if (!this[props]) {
                    this[props] = 0;
                }

                this[props] += value;
            }
        },
        rank_lst = [];
    for (var other in dataset) {
        if (other === person) continue;
        var similar = distance(dataset, person, other);
        if (similar <= 0) continue;
        for (var item in dataset[other]) {
            // if (!(item in dataset[person]) || (dataset[person][item] == 0)) {
            if (item in dataset[person]) {
                //the setter help to make this look nice.
                totals.setDefault(item, dataset[other][item] * similar);
                simsum.setDefault(item, similar);
            }
        }
    }

    for (var item in totals) {
        //this what the setter function does
        //so we have to find a way to avoid the function in the object     
        if (typeof totals[item] != "function") {

            var val = totals[item] / simsum[item];
            rank_lst.push({ val: val, items: item });
        }
    }
    rank_lst.sort(function (a, b) {
        return b.val < a.val ? -1 : b.val > a.val ?
            1 : b.val >= a.val ? 0 : NaN;
    });
    var recommend = [];
    for (var i in rank_lst) {
        recommend.push(rank_lst[i].items);
    }
    return [rank_lst, recommend];
    // return recommend;
}

var insuranceRecommendation = function (similar_user_result, insuranceDataSet) {
    result = {};
    for (var index in similar_user_result) {
        user = similar_user_result[index];
        console.log(Object.keys(insuranceDataSet)); // [ '신준수', '김철수', '박보검', '김미영', '홍길동', '김밥밥' ]
        console.log(insuranceDataSet);
        console.log(user["p"]); // 박보검
        userInsurance = insuranceDataSet[user["p"]];
        console.log('가입 중인 보험 : ', userInsurance["insurance"]);
        // console.log(user["p"] in Object.keys(insuranceDataSet));
        // console.log('asdasdasd', user["p"] in insuranceDataSet);
        // console.log(insuranceDataSet[user["p"]["가입 중인 보험"]] in Object.keys(result));
        // console.log('가입 중인 보험 : ',insuranceDataSet["가입 중인 보험"]);
        var userIndex = user["p"];
        if (userIndex in insuranceDataSet) {
            console.log('userIndex : ',userIndex);
            userInsurance = insuranceDataSet[userIndex]["insurance"];
            console.log('userInsurance : ',userInsurance);
            if (userInsurance in result) {
                result[userInsurance] += user["val"]
            }
            else {
                result[userInsurance] = user["val"]
            }
        }
    }
    // 합해진 val 기준으로 key sort 하기
    console.log('result : ', result);

    var sortable = [];
    for (var insurance in result) {
        sortable.push([insurance, result[insurance]]);
    }

    sortable.sort(function(a,b){
        return b[1] - a[1];
    });
    console.log('sortable : ',sortable);
    console.log('추천하는 보험 : ', sortable[0][0]);
    return result;
}

// console.log(recommendation_eng(basicDataSet, '신준수', pearson_correlation))
insuranceRecommendation(similar_user(basicDataSet, '신준수', 3, pearson_correlation), insuranceDataSet);