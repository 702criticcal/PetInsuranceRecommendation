var dataset = {
    'Lisa Rose': {
        'Lady in the Water': 2.5,
        'Snakes on a Plane': 3.5,
        'Just My Luck': 3.0,
        'Superman Returns': 3.5,
        'You, Me and Dupree': 2.5,
        'The Night Listener': 3.0
    },
    'Gene Seymour': {
        'Lady in the Water': 3.0,
        'Snakes on a Plane': 3.5,
        'Just My Luck': 1.5,
        'Superman Returns': 5.0,
        'The Night Listener': 3.0,
        'You, Me and Dupree': 3.5
    },

    'Michael Phillips': {
        'Lady in the Water': 2.5,
        'Snakes on a Plane': 3.0,
        'Superman Returns': 3.5,
        'The Night Listener': 4.0
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

    'Jack Matthews': {
        'Lady in the Water': 3.0,
        'Snakes on a Plane': 4.0,
        'The Night Listener': 3.0,
        'Superman Returns': 5.0,
        'You, Me and Dupree': 3.5
    },

    'Toby': {
        'Snakes on a Plane': 4.5,
        'You, Me and Dupree': 1.0,
        'Superman Returns': 4.0
    }
};

var len  = function(obj){
    var len=0;
    for(var i in obj){
        len++
    }
    return len;
}

var pearson_correlation = function(dataset,p1,p2){
    var existp1p2 = {};
    for(item in dataset[p1]){
                if(item in dataset[p2]){
                    existp1p2[item] = 1
                }
            }
            var num_existence = len(existp1p2);
    if(num_existence ==0) return 0;
    //store the sum and the square sum of both p1 and p2
            //store the product of both
            var p1_sum=0,
                p2_sum=0,
                p1_sq_sum=0,
                p2_sq_sum=0,
                prod_p1p2 = 0;
            //calculate the sum and square sum of each data point
            //and also the product of both point
            for(var item in existp1p2){
                p1_sum += dataset[p1][item];
                p2_sum += dataset[p2][item];
    p1_sq_sum += Math.pow(dataset[p1][item],2);
                p2_sq_sum += Math.pow(dataset[p2][item],2);
    prod_p1p2 += dataset[p1][item]*dataset[p2][item];
            }
            var numerator =prod_p1p2 - (p1_sum*p2_sum/num_existence);
    var st1 = p1_sq_sum - Math.pow(p1_sum,2)/num_existence;
            var st2 = p2_sq_sum -Math.pow(p2_sum,2)/num_existence;
    var denominator = Math.sqrt(st1*st2);
    if(denominator ==0) return 0;
            else {
                var val = numerator / denominator;
                return val;
            }
            
    }

console.log(pearson_correlation(dataset,'Lisa Rose','Jack Matthews'))

var similar_user = function(dataset,person,num_user,distance){
    var scores=[];
    for(var others in dataset){
            if(others != person && typeof(dataset[others])!="function"){
                var val = distance(dataset,person,others)
                var p = others
                scores.push({val:val,p:p});
            }
        }
        scores.sort(function(a,b){
            return b.val < a.val ? -1 : b.val > a.val ? 1 : b.val >= a.val ? 0 : NaN;
        });
        var score=[];
        for(var i =0;i<num_user;i++){
            score.push(scores[i]);
        }
    return score;
    }

console.log(similar_user(dataset, 'Jack Matthews', 3, pearson_correlation));

var recommendation_eng = function(dataset,person,distance){
 
    var totals = {
        setDefault:function(props,value){
            if(!this[props]){
                this[props] =0;
            }
this[props] += value;
        }
    },
        simsum = {
            setDefault:function(props,value){
                if(!this[props]){
                    this[props] =0;
                }
    
                this[props] += value;
            }
        },
        rank_lst =[];
for(var other in dataset){
if(other ===person) continue;
var similar = distance(dataset,person,other);
        
        if(similar <=0) continue;
for(var item in dataset[other]){
                if(!(item in dataset[person]) ||(dataset[person][item]==0)){
                 //the setter help to make this look nice.
                    totals.setDefault(item,dataset[other][item]*similar);
                    simsum.setDefault(item,similar);
                }
        }
    }
    
   for(var item in totals){
  //this what the setter function does
  //so we have to find a way to avoid the function in the object     
        if(typeof totals[item] !="function"){
           
            var val = totals[item] / simsum[item];
            rank_lst.push({val:val,items:item});
       }
    }
    rank_lst.sort(function(a,b){
        return b.val < a.val ? -1 : b.val > a.val ? 
        1 : b.val >= a.val ? 0 : NaN;
    });
    var recommend = []; 
      for(var i in rank_lst){
        recommend.push(rank_lst[i].items);
     }
   return [rank_lst,recommend];
    // return recommend;
}

console.log(recommendation_eng(dataset,'Lisa Rose',pearson_correlation))