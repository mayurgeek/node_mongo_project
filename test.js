// var obj = {name:"mayur",last_name:"yadav"}

// console.log(obj["name"])
// try{
//     console.log(obj_1["age"])
// }catch(e){
//     console.log(e)
// }
// console.log(obj["last_name"])


var m =11
const promise_by_mayur = new Promise((resolve, reject) => {
    if(m ==="11"){
        resolve("success")
    }else{
        reject("faild")
    }
  });
  promise_by_mayur.then((rst)=>{console.log(rst)}).catch((e)=>{console.log(e)})

  