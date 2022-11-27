
import customNotice from '@/components/custom-notice/custom-notice.vue'

let timer = null;
export default {
	install(Vue,option){
		 const Notice = Vue.extend(customNotice)
		 const ins = new Notice()
		 ins.$mount(document.createElement('div'))
		 document.body.appendChild(ins.$el)
		 Vue.prototype.$notice = {
			 show(options){
				 if(options && Object.keys(options).length > 0){
					 ins.open();//提示弹出
					 ins.title = options.title || '';
					 ins.content = options.content || '';
					 timer = setTimeout(()=>{
					 	ins.close();
					 },options.duration || 3000)
					 
					//  let a = {}
					//  console.log(a.toString());
					//  console.log(String(a));
					//  const obj = {
					// 	 a:1,
					// 	 b:2
					//  }
					
					//  console.log( obj.hasOwnProperty('a'));
					 // const me = Object.create(ins)
					 // console.log(me);
					 // let obj1 = {
						//  a:1,
						//  b:2,
						//  c:{
						// 	 d:3
						//  }
					 // }
					 // let obj2 = Object.assign({},obj1) 
					 // obj2.c.d = 99
					 // console.log(obj1);
					 
					 // let arr = [1,2,3,[4,5,[6]]]
					 
					 // console.log(arr.flat(Infinity));
					 // var arr = ["a","b","c","d"];
					 // 	// for(let index of arr.keys()){
					 // 	// 	console.log(index);
					 // 	// }
					 // 	// for(let elem of arr.values()){
					 // 	// 	console.log(elem);
					 // 	// }
					 // 	for(let [index,elem] of arr.entries()){
					 // 		console.log(index,elem);
					 // 	}  
					    
						
				 //    function fn(callback){
					// 	callback(11)
					// }
					
					// fn(res=>{
					// 	console.log(res);
					// })
	
					// function a (x){
					// 	return function (y){
					// 		return x + y
					// 	}
					// }
     //                a(2)(4);
					// console.log(a(2)(4));
					// let a = []
					// a.isArray()		
					// console.log(a.isArray());
					
					let i = 1;
					setTimeout(()=>{
						i++
						console.log(i);
					},0);
					new Promise((resolve,reject)=>{
						console.log('first',1);
						resolve(2)
					}).then(res=>{
						setTimeout(()=>{
							console.log('ss',i);
						},10)
						i = 3;
						console.log(res);
						console.log(i);
					})
				 };
			 }
		 }
	}
}