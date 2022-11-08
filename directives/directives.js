import debounce from './debounce.js'
import copy from './copy.js'

const directives = {
	debounce,
	copy
}

export default {
	install(Vue){
		if(Object.keys(directives).length > 0){
			Object.keys(directives).forEach(key=>{
				Vue.directive(key,directives[key])
			})
		}
	}
}
