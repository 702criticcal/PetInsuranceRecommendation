// 품종 = {
//     '토이 푸들': 1,
//     '시바 이누': 2,
//     '포메라니안': 3,
//     '치와와': 4,
//     '말티즈': 5
// }

// 강아지/고양이 = {
//     강아지 : 1,
//     고양이 : 2
// }

// 성별 = {
//     암 : 1,
//     수 : 2
// }

// 동물 등록 여부 = {
//     유 : 1,
//     무 : 2
// }

// 중성화 여부 = {
//     유 : 1,
//     무 : 2
// }



// 마이 페이지에서 입력받는 값 가져오는 걸로 수정하면 됨.
var yyyyMMdd = '2019/02/02'
function getAgeFromBirthDay(birth_day) {
    var birthday = new Date(yyyyMMdd);
    var today = new Date();
    var age = today.getFullYear() - birthday.getFullYear();
    // if (age < 1) {
    //     var age = today.getMonth() - birthday.getMonth();
    //     console.log('생후 ', age, '개월');
    // }
    return age
}
getAgeFromBirthDay(yyyyMMdd);


// set a dataset
var dataset = {
    '신준수': {
        '강아지/고양이' : 1,
        '품종': 5,
        '나이': getAgeFromBirthDay(yyyyMMdd),
        '성별': 1,
        '동물 등록 여부': 2,
        '중성화 여부': 1,
    },
    'Claudia Puig': {
        'Snakes on a Plane': 3.5,
        'Just My Luck': 3.0,
        'The Night Listener': 4.5,
        'Superman Returns': 4.0,
        'You, Me and Dupree': 2.5
    },
    'Mick LaSalle': {
        'Lady in the Water': 3.0,
        'Snakes on a Plane': 4.0,
        'Just My Luck': 2.0,
        'Superman Returns': 3.0,
        'The Night Listener': 3.0,
        'You, Me and Dupree': 2.0
    },
    '홍길동': {
        '강아지/고양이' : 1,
        '품종': 5,
        '나이': getAgeFromBirthDay('2019/03/04'),
        '성별': 1,
        '동물 등록 여부': 2,
        '중성화 여부': 1,
    },
    'Toby': {
        'Snakes on a Plane': 4.5,
        'You, Me and Dupree': 1.0,
        'Superman Returns': 4.0
    }
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

console.log(euclidean_score(dataset,"신준수","홍길동"));

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

console.log(pearson_correlation(dataset, '신준수', '홍길동'))

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

console.log('유사한 사용자 : ', similar_user(dataset, '신준수', 3, pearson_correlation));

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
            if (!(item in dataset[person]) || (dataset[person][item] == 0)) {
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

console.log(recommendation_eng(dataset, '신준수', pearson_correlation))