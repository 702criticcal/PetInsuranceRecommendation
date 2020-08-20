// 품종 = {
//     // 세계애견연맹 5 그룹. 뾰족한 주둥이와 선 귀를 가진 종 그룹.
//     '진돗개' : 50.0,
//     '포메라니안' : 51.0,
//     '시베리안 허스키' : 51.0,
//     // 세계애견연맹 6 그룹. 수렵견 그룹.
//     '비글' : 60.0,
//     '달마시안' : 61.0,
//     '바셋 하운드' : 62.0,
//     // 세계애견연맹 9 그룹. 가정견 그룹.
//     '몰티즈': 90.0,
//     '시추': 91.0,
//     '토이 푸들': 92.0,
//     '치와와': 93.0,
//     '빠삐용': 94.0
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

    sortable.sort(function(a,b){
        return b[1] - a[1];
    });
    return sortable[0][0];
}

console.log('추천하는 보험 : ', insuranceRecommendation(similar_user(basicDataSet, '신준수', 5, pearson_correlation), insuranceDataSet));