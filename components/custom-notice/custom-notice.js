
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
				 };
			 }
		 }
	}
}