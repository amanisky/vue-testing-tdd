"use strict";(self["webpackChunkdemo"]=self["webpackChunkdemo"]||[]).push([[700],{7319:function(t,o,e){e.r(o),e.d(o,{default:function(){return L}});var s=function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("section",{staticClass:"todoapp"},[e("TodoHeader",{on:{"new-todo":t.addTodo}}),e("section",{staticClass:"main"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.toggleAll,expression:"toggleAll"}],staticClass:"toggle-all",attrs:{id:"toggle-all","data-testid":"toggle-all",type:"checkbox"},domProps:{checked:Array.isArray(t.toggleAll)?t._i(t.toggleAll,null)>-1:t.toggleAll},on:{change:function(o){var e=t.toggleAll,s=o.target,d=!!s.checked;if(Array.isArray(e)){var l=null,n=t._i(e,l);s.checked?n<0&&(t.toggleAll=e.concat([l])):n>-1&&(t.toggleAll=e.slice(0,n).concat(e.slice(n+1)))}else t.toggleAll=d}}}),e("label",{attrs:{for:"toggle-all"}},[t._v("Mark all as complete")]),e("ul",{staticClass:"todo-list"},t._l(t.filterTodos,(function(o){return e("TodoItem",{key:o.id,attrs:{todo:o},on:{"todo-delete":t.onTodoDelete,"todo-edit":t.onTodoEdit}})})),1)]),e("TodoFooter",{attrs:{todos:t.todos},on:{"clear-completed":t.onClearCompleted}})],1)},d=[],l=function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("header",{staticClass:"header"},[e("h1",[t._v("待办")]),e("input",{staticClass:"new-todo",attrs:{"data-testid":"new-todo",autofocus:"",placeholder:"需要做什么？"},on:{keyup:function(o){return!o.type.indexOf("key")&&t._k(o.keyCode,"enter",13,o.key,"Enter")?null:t.onEnter.apply(null,arguments)}}})])},n=[],i={name:"TodoHeader",methods:{onEnter(t){const o=t.target.value.trim();o.length&&(this.$emit("new-todo",o),t.target.value="")}}},a=i,r=e(1001),c=(0,r.Z)(a,l,n,!1,null,null,null),u=c.exports,h=function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("li",{class:{completed:t.todoLocal.done,editing:t.isEditing},attrs:{"data-testid":"todo-item"}},[e("div",{staticClass:"view"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.todoLocal.done,expression:"todoLocal.done"}],staticClass:"toggle",attrs:{type:"checkbox","data-testid":"todo-done"},domProps:{checked:Array.isArray(t.todoLocal.done)?t._i(t.todoLocal.done,null)>-1:t.todoLocal.done},on:{change:function(o){var e=t.todoLocal.done,s=o.target,d=!!s.checked;if(Array.isArray(e)){var l=null,n=t._i(e,l);s.checked?n<0&&t.$set(t.todoLocal,"done",e.concat([l])):n>-1&&t.$set(t.todoLocal,"done",e.slice(0,n).concat(e.slice(n+1)))}else t.$set(t.todoLocal,"done",d)}}}),e("label",{attrs:{"data-testid":"todo-text"},on:{dblclick:function(o){t.isEditing=!0}}},[t._v(t._s(t.todoLocal.text))]),e("button",{staticClass:"destroy",attrs:{"data-testid":"todo-delete"},on:{click:function(o){return t.$emit("todo-delete",t.todoLocal.id)}}})]),e("input",{directives:[{name:"focus",rawName:"v-focus",value:t.isEditing,expression:"isEditing"}],staticClass:"edit",attrs:{"data-testid":"todo-edit"},domProps:{value:t.todo.text},on:{blur:function(o){t.isEditing=!1},keyup:[function(o){return!o.type.indexOf("key")&&t._k(o.keyCode,"enter",13,o.key,"Enter")?null:t.onEditTodo.apply(null,arguments)},function(o){return!o.type.indexOf("key")&&t._k(o.keyCode,"esc",27,o.key,["Esc","Escape"])?null:t.onEscTodo.apply(null,arguments)}]}})])},p=[],g={name:"TodoItem",props:{todo:{type:Object,required:!0}},directives:{focus(t,o){o.value&&t.focus()}},data(){return{todoLocal:this.todo,isEditing:!1}},methods:{onEditTodo(t){this.$emit("todo-edit",{id:this.todo.id,text:t.target.value}),this.isEditing=!1},onEscTodo(){this.isEditing=!1}}},m=g,f=(0,r.Z)(m,h,p,!1,null,null,null),v=f.exports,k=function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("footer",{staticClass:"footer"},[e("span",{staticClass:"todo-count"},[e("strong",{attrs:{"data-testid":"done-todos-count"}},[t._v(t._s(t.count))]),t._v(" 未完成")]),e("ul",{staticClass:"filters"},[e("li",[e("router-link",{attrs:{to:"/todos"}},[t._v("全部的")])],1),e("li",[e("router-link",{attrs:{to:"/todos/active"}},[t._v("进行中")])],1),e("li",[e("router-link",{attrs:{to:"/todos/completed"}},[t._v("已完成")])],1)]),e("button",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"clear-completed",attrs:{"data-testid":"clear-completed"},on:{click:function(o){return t.$emit("clear-completed")}}},[t._v("清除已完成")])])},y=[],_={name:"TodoFooter",props:{todos:{type:Array,required:!0}},computed:{count(){return this.todos.filter((t=>!t.done)).length},show(){return this.todos.some((t=>!0===t.done))}}},E=_,C=(0,r.Z)(E,k,y,!1,null,null,null),T=C.exports,x={name:"TodoView",components:{TodoHeader:u,TodoItem:v,TodoFooter:T},data(){return{todos:[]}},computed:{toggleAll:{get(){return this.todos.length&&this.todos.every((t=>t.done))},set(t){this.todos.forEach((o=>{o.done=t}))}},filterTodos(){switch(this.$route.path){case"/todos/active":return this.todos.filter((t=>!t.done));case"/todos/completed":return this.todos.filter((t=>t.done));default:return this.todos}}},methods:{addTodo(t){const o=this.todos[this.todos.length-1];this.todos.push({id:o?o.id+1:1,text:t,done:!1})},onTodoDelete(t){this.todos=this.todos.filter((o=>o.id!==t))},onTodoEdit({id:t,text:o}){const e=this.todos.find((o=>o.id===t));e&&(o.trim().length||this.onTodoDelete(t),e.text=o)},onClearCompleted(){this.todos=this.todos.filter((t=>!t.done))}}},A=x,w=(0,r.Z)(A,s,d,!1,null,null,null),L=w.exports}}]);
//# sourceMappingURL=todos.cf728b7a.js.map